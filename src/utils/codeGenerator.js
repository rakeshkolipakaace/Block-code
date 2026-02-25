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
      case "relay": {
        const relayPin = data.pin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${relayPin}, OUTPUT);`);
        const relayNo = mapConstant(data.no);
        addLine(
          `${indent}digitalWrite(${relayPin}, ${relayNo}); // NO: ${data.no}, NC: ${data.nc}`,
        );
        break;
      }
      case "oled13":
        usedHeaders.add("#include <Wire.h>");
        usedHeaders.add("#include <Adafruit_GFX.h>");
        usedHeaders.add("#include <Adafruit_SSD1306.h>");

        const sckPin = data.sckPin || "22";
        const sdaPin = data.sdaPin || "21";
        const oledWidth = 128;
        const oledHeight = 64;
        const oledReset = -1;
        const screenAddress = 0x3C;

        const oledName = `oled_${sckPin}_${sdaPin}`;
        globals.add(`Adafruit_SSD1306 ${oledName}(${oledWidth}, ${oledHeight}, &Wire, ${oledReset});`);

        setupLines.add(`Wire.begin();`);
        setupLines.add(`${oledName}.begin(0x${screenAddress.toString(16)}, false);`);
        setupLines.add(`${oledName}.clearDisplay();`);

        if (data.rotate && data.rotate !== "0") {
          setupLines.add(`${oledName}.setRotation(2);`);
        }

        setupLines.add(`${oledName}.display();`);

        const xPos = parseInt(data.left) || 0;
        const yPos = parseInt(data.top) || 0;
        const displayText = data.text || "Hello world";

        addLine(`${indent}${oledName}.clearDisplay();`);
        addLine(`${indent}${oledName}.setCursor(${xPos}, ${yPos});`);
        addLine(`${indent}${oledName}.println("${displayText}");`);
        addLine(`${indent}${oledName}.display();`);
        break;
      case "lcd16x2": {
        usedHeaders.add("#include <Wire.h>");
        usedHeaders.add("#include <LiquidCrystal_I2C.h>");
        const addr = data.address;
        const lcdName = `lcd_${addr.replace(".", "_")}`;
        globals.add(`LiquidCrystal_I2C ${lcdName}(${addr}, 16, 2);`);
        setupLines.add(`${lcdName}.init();`);

        if (data.backlight === "HIGH") {
          setupLines.add(`${lcdName}.backlight();`);
        } else {
          setupLines.add(`${lcdName}.noBacklight();`);
        }

        addLine(
          `${indent}${lcdName}.setCursor(${data.column}, ${data.row});`,
        );
        addLine(
          `${indent}${lcdName}.print("${data.printText}");`,
        );
        break;
      }
      case "ultrasonic":
        usedHeaders.add("#include <NewPing.h>");
        const trig = data.triggerPin.replace(/^[DA]/, "");
        const echo = data.echoPin.replace(/^[DA]/, "");
        const sonarName = `sonar_${trig}_${echo}`;
        globals.add(`NewPing ${sonarName}(${trig}, ${echo}, 200);`);

        addLine(
          `${indent}int distance = ${sonarName}.ping_cm();`,
        );
        break;
      case "pushButton": {
        const pin = data.pin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${pin}, INPUT);`);
        const buttonExpected = mapConstant(data.value);
        addLine(
          `${indent}int button_state = digitalRead(${pin}); // Expected: ${buttonExpected}`,
        );
        break;
      }
      case "ir": {
        const pin = data.outPin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${pin}, INPUT);`);
        const irExpected = mapConstant(data.irValue);
        addLine(
          `${indent}int ir_val = digitalRead(${pin}); // Expected: ${irExpected}`,
        );
        break;
      }
      case "waterLevel": {
        const pin = data.outPin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${pin}, INPUT);`);
        const waterThreshold = mapConstant(data.irValue);
        addLine(
          `${indent}int water_level = digitalRead(${pin}); // Threshold: ${waterThreshold}`,
        );
        break;
      }
      case "soilMoisture": {
        const pin = data.analogPin.replace(/^[DA]/, "");
        addLine(
          `${indent}int soil_moisture = analogRead(${pin}); ${data.moisture ? `// Threshold: ${data.moisture}` : ""}`,
        );
        break;
      }
      case "ldr": {
        const pin = data.analogPin.replace(/^[DA]/, "");
        addLine(
          `${indent}int ldr_val = analogRead(${pin}); ${data.intensity ? `// Intensity: ${data.intensity}` : ""}`,
        );
        break;
      }
      case "ifCond":
      case "ifElse": {
        const left = mapConstant(data.left);
        const right = mapConstant(data.right);
        addLine(`${indent}if (${left} ${data.operator} ${right}) {`);

        if (trueFlow.length > 0) {
          trueFlow.forEach((conn) => {
            items = items.concat(processBlock(conn.target, indentLevel + 1));
          });
        }
        addLine(`${indent}}`);

        if (block.type === "ifElse") {
          addLine(`${indent}else {`);
          if (falseFlow.length > 0) {
            falseFlow.forEach((conn) => {
              items = items.concat(processBlock(conn.target, indentLevel + 1));
            });
          }
          addLine(`${indent}}`);
        }
        break;
      }

      case "forever":
        addLine(`${indent}while (true) {`);
        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });
        addLine(`${indent}}`);
        return items;

      case "repeat":
        addLine(`${indent}for (int i = 0; i < ${data.times}; i++) {`);
        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });
        addLine(`${indent}}`);
        break;

      case "break":
        addLine(`${indent}break;`);
        break;

      case "whileLoop": {
        const condition = mapConstant(data.condition);
        addLine(`${indent}while (${condition}) {`);
        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });
        addLine(`${indent}}`);
        break;
      }

      case "forLoop":
        addLine(
          `${indent}for (int ${data.variable} = 0; ${data.variable} < ${data.limit}; ${data.variable}++) {`,
        );
        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });
        addLine(`${indent}}`);
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
