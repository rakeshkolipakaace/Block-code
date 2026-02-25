// // Helper to map block types to Python implementation
// const PIN_MAP = {
//     // Add pin mappings if needed, though they are usually direct values
// };

// export const generateCode = (blocks, edges) => {
//     if (!blocks || blocks.length === 0) return "";

//     // 1. Python Helper Functions Definition
//     const helperFunctions = `
// from machine import Pin, PWM, ADC, I2C
// import time
// import ssd1306
// from i2c_lcd import I2cLcd
// import dht
// from hcsr04 import HCSR04

// # --- Helper Functions ---

// servos = {}
// def rotate_servo(pin_num, angle):
//     global servos
//     if pin_num not in servos:
//         pwm = PWM(Pin(pin_num))
//         pwm.freq(50)
//         servos[pin_num] = pwm
//     pwm = servos[pin_num]
//     angle = int(angle)
//     # Map 0-180 to duty 26-123 (approx)
//     duty = int((angle / 180) * 97 + 26)
//     pwm.duty(duty)

// dist_sensors = {}
// def measure_distance(trig_pin, echo_pin):
//     global dist_sensors
//     key = (trig_pin, echo_pin)
//     if key not in dist_sensors:
//         dist_sensors[key] = HCSR04(trigger_pin=trig_pin, echo_pin=echo_pin)
//     return dist_sensors[key].distance_cm()

// dht_sensors = {}
// def read_dht11(pin):
//     global dht_sensors
//     if pin not in dht_sensors:
//         dht_sensors[pin] = dht.DHT11(Pin(pin))

//     sensor = dht_sensors[pin]
//     try:
//         sensor.measure()
//         return sensor.temperature(), sensor.humidity()
//     except Exception as e:
//         print('DHT11 read error:', e)
//         return 0, 0

// oleds = {}
// def update_oled(sck, sda, text, x=0, y=0, rotate=0):
//     global oleds
//     key = (sck, sda)
//     if key not in oleds:
//         i2c = I2C(0, scl=Pin(sck), sda=Pin(sda))
//         oleds[key] = ssd1306.SSD1306_I2C(128, 64, i2c)

//     oled = oleds[key]
//     # Rotate 180 if requested (assuming 90 means 180 based on UI label)
//     if int(rotate) > 0:
//         oled.rotate(True)
//     else:
//         oled.rotate(False) # Or standard

//     oled.fill(0) # Clear
//     oled.text(str(text), int(x), int(y))
//     oled.show()

// lcds = {}
// def update_lcd(scl, sda, addr, text, row=0, col=0):
//     global lcds
//     key = (scl, sda, addr)
//     if key not in lcds:
//         i2c = I2C(0, scl=Pin(scl), sda=Pin(sda), freq=400000)
//         lcds[key] = I2cLcd(i2c, int(addr), 2, 16)

//     lcd = lcds[key]
//     lcd.move_to(int(col), int(row))
//     lcd.putstr(str(text))

// def write_digital(pin, value):
//     Pin(pin, Pin.OUT).value(1 if value == 'HIGH' or value == 1 else 0)

// pwm_objs = {}
// def set_pwm(pin, value):
//     global pwm_objs
//     if pin not in pwm_objs:
//         pwm_objs[pin] = PWM(Pin(pin))
//         pwm_objs[pin].freq(1000)

//     # Map logic HIGH/LOW or 0-1023
//     duty = 0
//     if value == 'HIGH': duty = 1023
//     elif value == 'LOW': duty = 0
//     else: duty = int(value)

//     pwm_objs[pin].duty(duty)

// def set_rgb(r_pin, g_pin, b_pin, color):
//     # Simple implementation - parsing hex or names is complex
//     # For now just turn on based on simple logic or assume PWM
//     set_pwm(r_pin, 1023) # Placeholder
//     pass

// adc_objs = {}
// def read_analog(pin):
//     global adc_objs
//     if pin not in adc_objs:
//         adc = ADC(Pin(pin))
//         adc.atten(ADC.ATTN_11DB)
//         adc_objs[pin] = adc
//     return adc_objs[pin].read()

// def read_digital(pin):
//     return Pin(pin, Pin.IN).value()

// # --- Main Logic ---
// `;

//     let loopCode = [];

//     // Helper to find block by ID
//     const getBlock = (id) => blocks.find((b) => b.id.toString() === id.toString());

//     // Helper to find children (connected via source handles)
//     // We assume 'output', 'true', 'false', 'next' etc. are source handles
//     const getConnections = (blockId) => {
//         return edges
//             .filter((e) => e.source === blockId.toString())
//             .map((e) => ({
//                 targetId: e.target,
//                 sourceHandle: e.sourceHandle,
//                 targetHandle: e.targetHandle
//             }));
//     };

//     // Convert block to code
//     const visited = new Set();

//     const processBlock = (blockId, indentLevel = 0) => {
//         const block = getBlock(blockId);
//         if (!block) return [];

//         // Avoid infinite loops in non-loop structures (though loops are allowed)
//         // For simple linear flow, we might need to be careful.
//         // In this simple version, we'll try to follow flow.

//         const indent = "    ".repeat(indentLevel);
//         let lines = [];
//         const data = block.data || {};

//         switch (block.type) {
//             case 'variable':
//                 lines.push(`${indent}${data.variable || 'var'} = ${data.value || 0}`);
//                 break;
//             case 'print':
//                 lines.push(`${indent}print(${data.text ? `"${data.text}"` : '""'})`);
//                 break;
//             case 'sleep':
//                 lines.push(`${indent}time.sleep(${data.seconds || 1})`);
//                 break;
//             case 'buzzer':
//                 lines.push(`${indent}write_digital(${data.pin}, '${data.output || 'LOW'}')`);
//                 break;
//             case 'gpioPin':
//                 {
//                     const pin = data.pin || '2';
//                     const mode = data.mode || 'OUT';
//                     const pVar = String(pin).replace(/['"]/g, '');
//                     // Map 'PWM' to something else? Or just OUT/IN. User asked for Pin.OUT
//                     // If mode is PWM, usually we use PWM class. But if they selected PWM in this block,
//                     // maybe they want Pin(p, Pin.OUT) then PWM?
//                     // For now, I'll map OUT/IN directly. If PWM, I'll default to OUT or just use the string if they know what they are doing.
//                     // Actually, MicroPython Pin doesn't have Pin.PWM constant usually. It's constructed via PWM().
//                     // But if the dropdown has PWM, I should handle it.
//                     // The user's request is specific: "pin_2 = Pin(2, Pin.OUT)".
//                     // I will generate exactly that pattern.
//                     lines.push(`${indent}pin_${pVar} = Pin(${pin}, Pin.${mode})`);
//                 }
//                 break;
//             case 'gpioPinWrite':
//                 {
//                     const pin = data.pin || '4';
//                     const val = data.value !== undefined ? data.value : 1;
//                     const pVar = String(pin).replace(/['"]/g, '');
//                     lines.push(`${indent}GPIO_pin_${pVar} = Pin(${pin}, Pin.OUT)`);
//                     lines.push(`${indent}GPIO_pin_${pVar}.value(${val})`);
//                 }
//                 break;
//             case 'gpioPinRead':
//                 {
//                     const pin = data.pin || '4';
//                     const storeVar = data.store || 'value';
//                     const pVar = String(pin).replace(/['"]/g, '');
//                     lines.push(`${indent}GPIO_pin_${pVar} = Pin(${pin}, Pin.IN)`);
//                     lines.push(`${indent}${storeVar} = GPIO_pin_${pVar}.value()`);
//                 }
//                 break;
//             case 'adc':
//                 {
//                     const pin = data.pin || '34';
//                     const storeVar = data.store || 'value';
//                     const pVar = String(pin).replace(/['"]/g, '');
//                     lines.push(`${indent}adc_${pVar} = ADC(Pin(${pin}))`);
//                     lines.push(`${indent}${storeVar} = adc_${pVar}.read_u16()`);
//                 }
//                 break;
//             case 'dht11':
//                 const isValidVar = (name) => /^[a-zA-Z_][a-zA-Z0-9_]*$/.test(name);

//                 const tempInput = data.temperature;
//                 const tempVar = (tempInput && isValidVar(tempInput)) ? tempInput : 'temp';
//                 const tempComment = (tempInput && !isValidVar(tempInput)) ? ` # threshold: ${tempInput}` : '';

//                 const humInput = data.humidity;
//                 const humVar = (humInput && isValidVar(humInput)) ? humInput : 'hum';
//                 const humComment = (humInput && !isValidVar(humInput)) ? ` # threshold: ${humInput}` : '';

//                 lines.push(`${indent}${tempVar}, ${humVar} = read_dht11(${data.dataPin})${tempComment}${humComment}`);
//                 break;
//             case 'relay':
//                 {
//                     const pin = data.pin;
//                     const val = data.no || 'LOW'; // Default to NO value
//                     const ncVal = data.nc || (val === 'HIGH' ? 'LOW' : 'HIGH');
//                     lines.push(`${indent}write_digital(${pin}, '${val}') # NO: ${val}, NC: ${ncVal}`);
//                 }
//                 break;
//             case 'servoMotor':
//                 lines.push(`${indent}rotate_servo(${data.servoPin}, ${data.angle || 0})`);
//                 break;
//             case 'pwmLed':
//                 const pwmPin = data.pin;
//                 const pwmVal = data.value;
//                 let duty = 0;
//                 if (pwmVal === 'HIGH') duty = 1023;
//                 else if (pwmVal === 'LOW') duty = 0;
//                 else duty = parseInt(pwmVal) || 0;

//                 // Sanitize pin for variable name (remove quotes if present, though usually it's just D2 or 2)
//                 const pinVar = String(pwmPin).replace(/['"]/g, '');
//                 lines.push(`${indent}pwm_${pinVar} = PWM(Pin(${pwmPin}), freq=1000, duty=${duty})`);
//                 break;
//             case 'gpioPwm':
//                 {
//                     const pin = data.pin || '2';
//                     const freq = data.frequency || '1000';
//                     const dutyVal = data.duty || '512';
//                     const pVar = String(pin).replace(/['"]/g, '');
//                     lines.push(`${indent}pwm_${pVar} = PWM(Pin(${pin}), freq=${freq}, duty=${dutyVal})`);
//                 }
//                 break;
//             case 'ultrasonic':
//                 lines.push(`${indent}distance = measure_distance(${data.triggerPin}, ${data.echoPin})`);
//                 break;
//             case 'oled13':
//                 lines.push(`${indent}update_oled(${data.sckPin}, ${data.sdaPin}, "${data.text}", ${data.left}, ${data.top}, ${data.rotate || 0})`);
//                 break;
//             case 'lcd16x2':
//                 lines.push(`${indent}update_lcd(${data.sclPin}, ${data.sdaPin}, ${data.address}, "${data.printText}", ${data.row}, ${data.column})`);
//                 break;

//             case 'pushButton':
//                 {
//                     const pin = data.pin;
//                     const val = data.value || 'HIGH';
//                     lines.push(`${indent}button_state = read_digital(${pin}) # Expected: ${val}`);
//                 }
//                 break;
//             case 'ir':
//                 {
//                     const pin = data.outPin;
//                     const val = data.irValue || 'HIGH';
//                     lines.push(`${indent}ir_val = read_digital(${pin}) # Expected: ${val}`);
//                 }
//                 break;
//             case 'waterLevel':
//                 {
//                     const pin = data.outPin;
//                     const val = data.irValue || 'HIGH';
//                     lines.push(`${indent}water_level = read_digital(${pin}) # Threshold: ${val}`);
//                 }
//                 break;

//             case 'soilMoisture':
//                 {
//                     const pin = data.analogPin;
//                     const val = data.moisture || '';
//                     lines.push(`${indent}soil_moisture = read_analog(${pin}) ${val ? `# Threshold: ${val}` : ''}`);
//                 }
//                 break;
//             case 'ldr':
//                 {
//                     const pin = data.analogPin;
//                     const val = data.intensity || '';
//                     lines.push(`${indent}ldr_val = read_analog(${pin}) ${val ? `# Threshold: ${val}` : ''}`);
//                 }
//                 break;

//             case 'rgbLed':
//                 // The helper function set_rgb is a placeholder for now
//                 lines.push(`${indent}set_rgb(${data.redPin}, ${data.greenPin}, ${data.bluePin}, "${data.color}")`);
//                 break;

//             case 'ifCond':
//             case 'ifElse':
//                 lines.push(`${indent}if ${data.left || 0} ${data.operator || '=='} ${data.right || 0}:`);

//                 // Process True branch
//                 const trueConns = getConnections(blockId).filter(c => c.sourceHandle === 'true');
//                 if (trueConns.length > 0) {
//                     // Sort by some logic if multiple? usually one.
//                     // We need to traverse the chain.
//                     trueConns.forEach(conn => {
//                         lines = lines.concat(processBlock(conn.targetId, indentLevel + 1));
//                     });
//                 } else {
//                     lines.push(`${indent}    pass`);
//                 }

//                 // Process False branch (only for ifElse/ifCond handles)
//                 const falseConns = getConnections(blockId).filter(c => c.sourceHandle === 'false');
//                 if (falseConns.length > 0) {
//                     lines.push(`${indent}else:`);
//                     falseConns.forEach(conn => {
//                         lines = lines.concat(processBlock(conn.targetId, indentLevel + 1));
//                     });
//                 }
//                 break;

//             case 'forever':
//                 lines.push(`${indent}while True:`);
//                 // Find what's connected to 'DO' or default source
//                 const doConns = getConnections(blockId);
//                 if (doConns.length > 0) {
//                     doConns.forEach(conn => {
//                         lines = lines.concat(processBlock(conn.targetId, indentLevel + 1));
//                     });
//                 } else {
//                     lines.push(`${indent}    pass`);
//                 }
//                 return lines; // Stop here for forever loop as it traps flow?
//             // Or continue if there's a 'next' (usually not for forever)

//             case 'repeat':
//                 lines.push(`${indent}for _ in range(${data.times || 1}):`);
//                 const repeatConns = getConnections(blockId);
//                 if (repeatConns.length > 0) {
//                     repeatConns.forEach(conn => {
//                         lines = lines.concat(processBlock(conn.targetId, indentLevel + 1));
//                     });
//                 } else {
//                     lines.push(`${indent}    pass`);
//                 }
//                 break;

//             case 'break':
//                 lines.push(`${indent}break`);
//                 break;

//             case 'whileLoop':
//                 lines.push(`${indent}while ${data.condition || 'True'}:`);
//                 const whileConns = getConnections(blockId);
//                 if (whileConns.length > 0) {
//                     whileConns.forEach(conn => {
//                         lines = lines.concat(processBlock(conn.targetId, indentLevel + 1));
//                     });
//                 } else {
//                     lines.push(`${indent}    pass`);
//                 }
//                 break;

//             case 'forLoop':
//                 lines.push(`${indent}for ${data.variable || 'i'} in ${data.range || 'range(10)'}:`);
//                 const forConns = getConnections(blockId);
//                 if (forConns.length > 0) {
//                     forConns.forEach(conn => {
//                         lines = lines.concat(processBlock(conn.targetId, indentLevel + 1));
//                     });
//                 } else {
//                     lines.push(`${indent}    pass`);
//                 }
//                 break;

//             // Add more cases here
//             default:
//                 if (!['default'].includes(block.type)) {
//                     // lines.push(`${indent}# Block: ${block.type} (implementation pending)`);
//                 }
//         }

//         // Continue to next block in main flow (e.g. bottom handle or output if flow)
//         // For flow blocks, usually 'bottom' or 'output' is the next step.
//         const nextConns = getConnections(blockId).filter(c => c.sourceHandle === 'output' || c.sourceHandle === 'bottom');
//         nextConns.forEach(conn => {
//             // We only process if it hasn't been processed in the current chain?
//             // This is tricky with recursion.
//             // For the simple MVP, let's assume one main flow.
//             lines = lines.concat(processBlock(conn.targetId, indentLevel));
//         });

//         return lines;
//     };

//     // Find start nodes (nodes with no incoming connections to their input handle?)
//     // Or just find Setup/Forever blocks.
//     // For now, let's try to find blocks that are not targets of other blocks (roots)
//     // But strictly, roots for FLOW are blocks whose target handles (top/input) are not connected.
//     const targets = new Set(edges.map(e => e.target));
//     const roots = blocks.filter(b => !targets.has(b.id.toString()));

//     // In a real scenario, we might have multiple roots (orphaned blocks).
//     // We usually only want to generate code for the main flow or specific event blocks.
//     // For this MVP, we process all roots.

//     let startBlocks = roots.length > 0 ? roots : (blocks.length > 0 ? [blocks[0]] : []);

//     // Sort roots top-to-bottom
//     startBlocks.sort((a, b) => a.position.y - b.position.y);

//     startBlocks.forEach(b => {
//         loopCode = loopCode.concat(processBlock(b.id));
//     });

//     return {
//         helpers: helperFunctions,
//         main: loopCode.join("\n")
//     };
// };

//c++ code
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

      case "dht11":
        usedHeaders.add("#include <DHT.h>");
        const dhtPin = data.dataPin.replace(/^[DA]/, "");
        const dhtName = `dht_${dhtPin}`;
        globals.add(`DHT ${dhtName}(${dhtPin}, DHT11);`);
        setupLines.add(`${dhtName}.begin();`);

        addLine(
          `${indent}float ${data.temperature} = ${dhtName}.readTemperature();`,
        );
        addLine(
          `${indent}float ${data.humidity} = ${dhtName}.readHumidity();`,
        );
        break;

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

      case "oled13":
        // OLED (SSD1306) usually requires complex setup. 
        // We'll keep it as a Serial placeholder for now as requested or use a standard pattern.
        usedHeaders.add("#include <Wire.h>");
        addLine(
          `${indent}Serial.println("${data.text}"); // OLED Placeholder`,
        );
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

      case "rgbLed": {
        const rPin = data.redPin.replace(/^[DA]/, "");
        const gPin = data.greenPin.replace(/^[DA]/, "");
        const bPin = data.bluePin.replace(/^[DA]/, "");
        setupLines.add(`pinMode(${rPin}, OUTPUT);`);
        setupLines.add(`pinMode(${gPin}, OUTPUT);`);
        setupLines.add(`pinMode(${bPin}, OUTPUT);`);

        let brightness = 128;
        if (data.brightness === "LOW") brightness = 64;
        else if (data.brightness === "MEDIUM") brightness = 128;
        else if (data.brightness === "HIGH") brightness = 192;
        else if (data.brightness === "FULL") brightness = 255;
        else {
          brightness = parseInt(data.brightness);
          if (brightness < 0 || brightness > 255) {
            addLine(`#error "RGB brightness (${brightness}) out of range (0-255)"`);
          }
        }

        const color = data.color || "OFF";
        let rv = 0, gv = 0, bv = 0;
        if (color === "RED") rv = brightness;
        else if (color === "GREEN") gv = brightness;
        else if (color === "BLUE") bv = brightness;
        // Simplified mapping for standard C++

        addLine(`${indent}analogWrite(${rPin}, ${rv});`);
        addLine(`${indent}analogWrite(${gPin}, ${gv});`);
        addLine(`${indent}analogWrite(${bPin}, ${bv});`);
        break;
      }

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
          `${indent}int soil_moisture = analogRead(${pin});${data.moisture ? ` // Threshold: ${data.moisture}` : ""}`,
        );
        break;
      }

      case "ldr": {
        const pin = data.analogPin.replace(/^[DA]/, "");
        addLine(
          `${indent}int ldr_val = analogRead(${pin});${data.intensity ? ` // Threshold: ${data.intensity}` : ""}`,
        );
        break;
      }

      case "if":
      case "ifCond": {
        addLine(`${indent}if (${mapConstant(data.left)} ${data.operator} ${mapConstant(data.right)}) {`);

        if (trueFlow.length > 0) {
          trueFlow.forEach((conn) => {
            items = items.concat(processBlock(conn.target, indentLevel + 1));
          });
        } else {
          addLine(`${indent}    // Empty if block`);
        }

        addLine(`${indent}}`);
        break;
      }

      case "ifElse": {
        addLine(`${indent}if (${mapConstant(data.left)} ${data.operator} ${mapConstant(data.right)}) {`);

        if (trueFlow.length > 0) {
          trueFlow.forEach((conn) => {
            items = items.concat(processBlock(conn.target, indentLevel + 1));
          });
        } else {
          addLine(`${indent}    // Empty if block`);
        }

        addLine(`${indent}} else {`);

        if (falseFlow.length > 0) {
          falseFlow.forEach((conn) => {
            items = items.concat(processBlock(conn.target, indentLevel + 1));
          });
        } else {
          addLine(`${indent}    // Empty else block`);
        }

        addLine(`${indent}}`);

        break;
      }

      case "forever":
      case "foreverloop": {
        addLine(`${indent}while (true) {`);

        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });

        addLine(`${indent}}`);
        return items;
      }
      case "repeat": {
        addLine(`${indent}for (int i = 0; i < ${data.times}; i++) {`);

        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });

        addLine(`${indent}}`);
        return items;
      }

      case "whileLoop": {
        addLine(`${indent}while (${mapConstant(data.condition)}) {`);

        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });

        addLine(`${indent}}`);
        return items;
      }

      case "forLoop": {
        const forVar = data.variable;
        const forRange = data.range;

        addLine(`${indent}for (int ${forVar} = 0; ${forVar} < ${forRange}; ${forVar}++) {`);

        normalFlow.forEach((conn) => {
          items = items.concat(processBlock(conn.target, indentLevel + 1));
        });

        addLine(`${indent}}`);
        return items;
      }

      case "break":
        addLine(`${indent}break;`);
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

  // Calculate offsets for lineMap
  // lineMap links loop code lines to block IDs.
  // We need to know how many lines are BEFORE the loop.
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

  // Map loop items
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

