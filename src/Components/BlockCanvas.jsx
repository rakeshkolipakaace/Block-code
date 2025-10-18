import React, { useCallback, useEffect } from "react";
import {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  ReactFlowProvider,
  useReactFlow,
  ReactFlow,
} from "@xyflow/react";

// Import all sensor nodes
import UltrasonicSensorNode from "./Sensors/UltrasonicBlock";
import DHT11SensorNode from "./Sensors/DHT";
import LDRSensorNode from "./Sensors/LDR";
import IRSensorNode from "./Sensors/IR";
import SoilMoistureSensorNode from "./Sensors/Soil";
import WaterLevelSensorNode from "./Sensors/waterlevel";
import BuzzerBlock from "./Actuators/Buzzer";
import PWMLEDBlock from "./Actuators/pwm";
import RGBLEDBlock from "./Actuators/RGB";
import RelayBlock from "./Actuators/Relay";
import LCD16x2Block from "./Actuators/16LCD";
import ServoMotorBlock from "./Motors/Servomotor";
import PushButtonNode from "./Motors/pushbutton";
// Import looping nodes
import BreakBlock from "./Looping/Break";
import RepeatBlock from "./Looping/Repeat";
import ForeverLoopBlock from "./Looping/foreverloop";
import WhileLoopBlock from "./Looping/Whileloop";
import ForLoopBlock from "./Looping/Forloop";
// Import condition nodes
import IfBlock from "./Condition/if";
import IfElseBlock from "./Condition/ifelse";
// Import GPIO nodes
import GPIOPinBlock from "./GPIo/GPIO";
import PinWriteBlock from "./GPIo/pinwrite";
import PinReadBlock from "./GPIo/pinread";
import ADCBlock from "./GPIo/ADC";
import PWMBlockGpio from "./GPIo/pwm";
// Import Display nodes
import OledDisplayNode from "./Display/1.3oled";
import Lcd16x2Node from "./Display/lcd16";
// Import General nodes
import SleepNode from "./General/Delay";
import PrintNode from "./General/print";
import VariableNode from "./General/variable";

import "@xyflow/react/dist/style.css";

const ALL_PINS = [
  "D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","D10","D11","D12","D13",
  "A0","A1","A2","A3","A4","A5"
];

const PWM_PINS = new Set(["D3","D5","D6","D9","D10","D11"]);

const normalizePin = (value) => {
  if (value === null || value === undefined) return "";
  const s = String(value).trim().toUpperCase();
  if (s === "") return "";
  if (/^\d+$/.test(s)) return `D${s}`;
  if (/^D\d+$/.test(s)) return s;
  if (/^A[0-5]$/.test(s)) return s;
  return s;
};

const PIN_KEYS = [
  "pin",
  "dataPin",
  "outPin",
  "triggerPin",
  "echoPin",
  "redPin",
  "greenPin",
  "bluePin",
  "servoPin",
  "analogPin",
  "sda",
  "scl",
];

const extractPinsFromData = (data) => {
  const pins = [];
  for (const key of PIN_KEYS) {
    if (data && data[key] !== undefined && data[key] !== null && String(data[key]).trim() !== "") {
      pins.push(normalizePin(data[key]));
    }
  }
  return pins.filter(Boolean);
};

// Map node types
const nodeTypes = {
  ultrasonicSensor: UltrasonicSensorNode,
  dht11Sensor: DHT11SensorNode,
  ldrSensor: LDRSensorNode,
  irSensor: IRSensorNode,
  soilMoistureSensor: SoilMoistureSensorNode,
  waterLevelSensor: WaterLevelSensorNode,
  buzzer: BuzzerBlock,
  pwmLed: PWMLEDBlock,
  rgbLed: RGBLEDBlock,
  relay: RelayBlock,
  lcd: LCD16x2Block,
  servoMotor: ServoMotorBlock,
  pushButton: PushButtonNode,
  // looping
  break: BreakBlock,
  repeat: RepeatBlock,
  forever: ForeverLoopBlock,
  whileLoop: WhileLoopBlock,
  forLoop: ForLoopBlock,
  // condition
  ifCond: IfBlock,
  ifElse: IfElseBlock,
  // gpio
  gpioPin: GPIOPinBlock,
  gpioPinWrite: PinWriteBlock,
  gpioPinRead: PinReadBlock,
  adc: ADCBlock,
  gpioPwm: PWMBlockGpio,
  // display
  oled13: OledDisplayNode,
  lcd16x2: Lcd16x2Node,
  // general
  sleep: SleepNode,
  print: PrintNode,
  variable: VariableNode,
};

const FlowComponent = ({
  blocks,
  selectedBlock,
  onUpdateBlockData,
  onSelectBlock,
  onDeleteBlock,
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const reactFlowInstance = useReactFlow();

  // Convert blocks to ReactFlow nodes
  useEffect(() => {
    const usedPinsGlobal = new Set();
    blocks.forEach((blk) => {
      extractPinsFromData(blk.data).forEach((p) => usedPinsGlobal.add(p));
    });

    const reactFlowNodes = blocks.map((block) => {
      let type = "default";

      switch (block.type) {
        case "ultrasonic":
          type = "ultrasonicSensor";
          break;
        case "dht11":
          type = "dht11Sensor";
          break;
        case "ldr":
          type = "ldrSensor";
          break;
        case "ir":
          type = "irSensor";
          break;
        case "soilMoisture":
          type = "soilMoistureSensor";
          break;
        case "waterLevel":
          type = "waterLevelSensor";
          break;
        case "buzzer":
          type = "buzzer";
          break;
        case "pwmLed":
          type = "pwmLed";
          break;
        case "rgbLed":
          type = "rgbLed";
          break;
        case "relay":
          type = "relay";
          break;
        case "lcd":
          type = "lcd";
          break;
        case "servoMotor":
          type = "servoMotor";
          break;
        case "pushButton":
          type = "pushButton";
          break;
        // looping
        case "break":
          type = "break";
          break;
        case "repeat":
          type = "repeat";
          break;
        case "forever":
          type = "forever";
          break;
        case "whileLoop":
          type = "whileLoop";
          break;
        case "forLoop":
          type = "forLoop";
          break;
        // condition
        case "ifCond":
          type = "ifCond";
          break;
        case "ifElse":
          type = "ifElse";
          break;
        // gpio
        case "gpioPin":
          type = "gpioPin";
          break;
        case "gpioPinWrite":
          type = "gpioPinWrite";
          break;
        case "gpioPinRead":
          type = "gpioPinRead";
          break;
        case "adc":
          type = "adc";
          break;
        case "gpioPwm":
          type = "gpioPwm";
          break;
        // display
        case "oled13":
          type = "oled13";
          break;
        case "lcd16x2":
          type = "lcd16x2";
          break;
        // general
        case "sleep":
          type = "sleep";
          break;
        case "print":
          type = "print";
          break;
        case "variable":
          type = "variable";
          break;

        default:
          type = "default";
      }

      // compute available pins for this node: allow its own selected pins plus others not used
      const thisPins = new Set(extractPinsFromData(block.data));
      const availablePins = ALL_PINS.filter(
        (p) => !usedPinsGlobal.has(p) || thisPins.has(p)
      );

      return {
        id: block.id.toString(),
        type,
        position: block.position,
        data: {
          ...block.data,
          availablePins,
          pwmPins: PWM_PINS,
          onChange: (key, value) => {
            onUpdateBlockData(block.id, { [key]: value });
          },
          onDelete: (nodeId) => {
            onDeleteBlock(nodeId);
          },
        },
        selected: selectedBlock === block.id,
        draggable: true,
      };
    });

    setNodes(reactFlowNodes);
  }, [blocks, selectedBlock, onUpdateBlockData, onDeleteBlock]);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback(
    (event, node) => onSelectBlock(parseFloat(node.id)),
    [onSelectBlock]
  );

  const onPaneClick = useCallback(() => onSelectBlock(null), [onSelectBlock]);

  const onNodeDragStop = useCallback(
    (event, node) => {
      onUpdateBlockData(parseFloat(node.id), { position: node.position });
    },
    [onUpdateBlockData]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onNodeClick={onNodeClick}
      onPaneClick={onPaneClick}
      onNodeDragStop={onNodeDragStop}
      fitView
      minZoom={0.1}
      maxZoom={4}
      defaultZoom={1}
      zoomOnScroll
      zoomOnPinch
      selectNodesOnDrag={false}
      nodesDraggable
      nodesConnectable
      elementsSelectable
      deleteKeyCode={null}
      multiSelectionKeyCode={null}
    >
      <Background />
      <Controls showZoom showFitView showInteractive position="top-left" />
    </ReactFlow>
  );
};

const BlockCanvas = ({
  blocks,
  selectedBlock,
  onUpdateBlockData,
  onSelectBlock,
  onDeleteBlock,
}) => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlowProvider>
        <FlowComponent
          blocks={blocks}
          selectedBlock={selectedBlock}
          onUpdateBlockData={onUpdateBlockData}
          onSelectBlock={onSelectBlock}
          onDeleteBlock={onDeleteBlock}
        />
      </ReactFlowProvider>
    </div>
  );
};

export default BlockCanvas;
