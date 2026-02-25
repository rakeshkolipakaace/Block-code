
# Block-code

Block-code is a visual block-based coding platform designed for hardware programming. It enables users to create logic for devices like ESP32 and Arduino using a drag-and-drop interface, similar to Scratch or Blockly, but tailored for embedded systems.

## Features

- **Visual Interface**: Drag-and-drop blocks to build logic without syntax errors.
- **Code Generation**: Automatically generates Python/MicroPython (or C++) code from your blocks.
- **Hardware Support**: Dedicated blocks for common sensors and actuators including:
    - **Displays**: OLED 1.3", LCD 16x2
    - **Sensors**: DHT (Temp/Humidity), Ultrasonic, Soil Moisture, LDR, IR
    - **Actuators**: Servo Motors, Relays, Buzzers, RGB LEDs
    - **GPIO**: Digital Read/Write, PWM, ADC
- **Control Structures**: If/Else, Loops (For, While, Repeat), and Variables.

## Tech Stack

- **Frontend Framework**: [React](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [TailwindCSS](https://tailwindcss.com/)
- **Flow/Diagramming**: [@xyflow/react](https://reactflow.dev/) (React Flow)
- **UI Components**: [HeroUI](https://www.heroui.com/)

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/rakeshkolipakaace/Block-code.git
    cd Block-code/Block-code
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Project

#### Option 1: Single Command (Recommended)
Start both frontend and backend simultaneously:

```bash
npm run start      # Runs both frontend + backend
# or
npm run start:all  # Alternative name, same functionality
```

This will start:
- **Frontend**: http://localhost:5174 (or next available port)
- **Backend**: http://localhost:5000 (compiler server)

#### Option 2: Manual Setup
Start servers separately in different terminals:

```bash
# Terminal 1 - Frontend
npm run dev

# Terminal 2 - Backend  
cd backend && npm start
```

Open your browser and navigate to the frontend URL (shown in terminal) to view the application.

## Building for Production

To build the project for production deployment:

```bash
npm run build
```