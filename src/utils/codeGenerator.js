// Helper to map block types to pin values (optional)
const PIN_MAP = {};

export const generateCode = (blocks, edges) => {
  if (!blocks || blocks.length === 0) return "";

  /* =====================================================
       ARDUINO HELPER FUNCTIONS (FIXED & COMPLETE)
    ===================================================== */
  // Standard Arduino C++ Refactor: No more custom helpers.
  // We now use global declarations and setup() initialization.

  /* =====================================================
   BLOCK → CODE CONVERSION (FULLY FIXED VERSION)
===================================================== */

  const mapConstant = (val) => {
    if (typeof val !== "string") return val;
    const v = val.trim().toUpperCase();
    if (v === "IN") return "INPUT";
    if (v === "OUT") return "OUTPUT";
    if (v === "HIGH") return "HIGH";
    if (v === "LOW") return "LOW";
    return val;
  };

  let loopItems = [];
  let lineMap = {};
  const globals = new Set();
  const setupLines = new Set();
  const usedHeaders = new Set(["#include <Arduino.h>"]);

  const getBlock = (id) =>
    blocks.find((b) => b.id.toString() === id.toString());

  const getConnections = (blockId) =>
    edges.filter((e) => e.source === blockId.toString());

  const processBlock = (blockId, indentLevel = 0) => {
    const block = getBlock(blockId);
    if (!block) return [];

    const indent = "    ".repeat(indentLevel);
    let items = [];
    const data = block.data || {};

    const connections = getConnections(blockId);

    const normalFlow = connections.filter(
      (c) =>
        !c.sourceHandle ||
        (c.sourceHandle !== "true" && c.sourceHandle !== "false"),
    );

    const trueFlow = connections.filter((c) => c.sourceHandle === "true");
    const falseFlow = connections.filter((c) => c.sourceHandle === "false");

    const addLine = (code) => {
      items.push({ code: code, blockId: block.id });
    };

    switch (block.type) {
      case "variable":
        addLine(`${indent}int ${data.variable} = ${data.value};`);
        break;
      case "print":
        addLine(`${indent}Serial.print("${data.text}");`);
        break;
      case "sleep":
        addLine(`${indent}delay(${(data.seconds) * 1000});`);
        break;
      case "buzzer": {
        const buzzerPin = data.pin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${buzzerPin}, OUTPUT);`);
        const buzzerOutput = mapConstant(data.output);
        addLine(
          `${indent}digitalWrite(${buzzerPin}, ${buzzerOutput});`,
        );
        break;
      }
      case "gpioPin": {
        const pin_gpio = data.pin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${pin_gpio}, ${mapConstant(data.mode)});`);
        break;
      }
      case "gpioPinWrite": {
        const pin_write = data.pin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${pin_write}, OUTPUT);`);
        addLine(
          `${indent}digitalWrite(${pin_write}, ${mapConstant(data.value)});`,
        );
        break;
      }
      case "gpioPinRead":
        const pin_read = data.pin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${pin_read}, INPUT);`);
        addLine(
          `${indent}int ${data.store} = digitalRead(${pin_read});`,
        );
        break;
      case "adc": {
        const pin = data.pin.replace(/^[DA]/, "");
        addLine(
          `${indent}int ${data.store} = analogRead(${pin});`,
        );
        break;
      }
      case "pwm":
      case "gpioPwm": {
        const pin = data.pin.replace(/^[DA]/, "");
        const frequency = data.frequency;
        const duty = parseInt(data.duty);
        if (duty < 0 || duty > 255) {
          addLine(`#error "PWM duty cycle (${duty}) out of range (0-255)"`);
        }
        setupLines.add(`pinMode(${pin}, OUTPUT);`);
        addLine(
          `${indent}analogWrite(${pin}, ${data.duty}); // Frequency: ${frequency}Hz`,
        );
        break;
      }
      case "pwmLed": {
        const pin = data.pin.replace(/^[DA]/, "");
        let duty = 0;
        if (data.value === "HIGH") duty = 255;
        else if (data.value === "LOW") duty = 0;
        else {
          duty = parseInt(data.value);
          if (duty < 0 || duty > 255) {
            addLine(`#error "LED brightness (${duty}) out of range (0-255)"`);
          }
        }
        setupLines.add(`pinMode(${pin}, OUTPUT);`);
        addLine(
          `${indent}analogWrite(${pin}, ${duty});`,
        );
        break;
      }
      case "servoMotor":
        usedHeaders.add("#include <Servo.h>");
        const servoPin = data.servoPin.replace(/^[DA]/, "");
        const servoName = `servo_${servoPin}`;
        globals.add(`Servo ${servoName};`);
        setupLines.add(`${servoName}.attach(${servoPin});`);

        const angle = parseInt(data.angle);
        if (angle < 0 || angle > 180) {
          addLine(`#error "Servo angle (${angle}) out of range (0-180)"`);
        }
        addLine(
          `${indent}${servoName}.write(${data.angle});`,
        );
        break;
      default:
        break;
    }

    normalFlow.forEach((conn) => {
      items = items.concat(processBlock(conn.target, indentLevel));
    });

    return items;
  };

  /* ================= ROOT DETECTION ================= */

  const targets = new Set(edges.map((e) => e.target));
  const roots = blocks.filter((b) => !targets.has(b.id.toString()));

  roots.forEach((b) => {
    loopItems = loopItems.concat(processBlock(b.id));
  });

  // Assemble components
  const headerParts = Array.from(usedHeaders);
  const globalParts = Array.from(globals);
  const setupCodeLines = [
    "void setup() {",
    "    Serial.begin(9600);",
    ...Array.from(setupLines).map(line => `    ${line}`),
    "}"
  ];

  const finalHeaders = headerParts.join("\n");
  const finalGlobals = globalParts.join("\n");
  const loopCodeStart = "void loop() {";
  const loopCodeEnd = "}";

  let currentLine = 1;

  if (finalHeaders) {
    currentLine += finalHeaders.split("\n").length;
    currentLine++; // spacer
  }

  if (finalGlobals) {
    currentLine += finalGlobals.split("\n").length;
    currentLine++; // spacer
  }

  currentLine += setupCodeLines.length;
  currentLine++; // spacer
  currentLine++; // void loop() {

  loopItems.forEach(item => {
    lineMap[currentLine] = item.blockId;
    currentLine++;
  });

  const finalMainCode = [
    ...setupCodeLines,
    "",
    loopCodeStart,
    ...loopItems.map(item => item.code),
    loopCodeEnd
  ].join("\n");

  return {
    headers: finalHeaders,
    globals: finalGlobals,
    main: finalMainCode,
    lineMap: lineMap
  };
};
