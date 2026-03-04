# Block-Code - Visual Block-Based Hardware Programming Platform

Block-Code is a powerful visual block-based coding platform designed for hardware programming. It enables users to create logic for embedded systems like Arduino and ESP32 using an intuitive drag-and-drop interface, similar to Scratch or Blockly, but specifically tailored for IoT and embedded systems development.

## 🚀 Features

- **🎨 Visual Interface**: Intuitive drag-and-drop blocks to build hardware logic without syntax errors
- **⚙️ Code Generation**: Automatically generates Arduino C++ code from visual blocks
- **🔌 Arduino Compilation**: Built-in Arduino CLI integration for direct sketch compilation to .hex files
- **📡 Comprehensive Hardware Support**: 
  - **Displays**: OLED 1.3", LCD 16x2
  - **Sensors**: DHT (Temperature/Humidity), Ultrasonic Distance, Soil Moisture, LDR (Light), IR Receiver
  - **Actuators**: Servo Motors, Relays, Buzzers, RGB LEDs
  - **GPIO**: Digital Read/Write, PWM Control, ADC Reading
- **🔄 Control Structures**: If/Else conditions, Loops (For, While, Repeat), Variables, and Functions
- **📊 Visual Flow Editor**: React Flow-based canvas for organizing and connecting blocks
- **🎯 Real-time Compilation**: Compile and generate .hex files directly from the platform

## 🛠️ Tech Stack

### Frontend
- **Framework**: [React](https://reactjs.org/) 18.3.1
- **Build Tool**: [Vite](https://vitejs.dev/) 7.1.7
- **Styling**: [TailwindCSS](https://tailwindcss.com/) 4.1.16
- **Flow Diagramming**: [@xyflow/react](https://reactflow.dev/) 12.8.6 (React Flow)
- **UI Components**: [HeroUI](https://www.heroui.com/) 2.8.5
- **Code Highlighting**: [Prism React Renderer](https://prismjs.com/) 2.4.1
- **Copy to Clipboard**: react-copy-to-clipboard 5.1.0
- **Select Component**: react-select 5.10.2
- **Icons**: react-icons 5.5.0

### Backend
- **Server**: [Express.js](https://expressjs.com/) 5.2.1
- **CORS**: cors 2.8.6
- **Body Parser**: body-parser 2.2.2
- **Compilation**: Arduino CLI (included in bin/)

### Development Tools
- **Linting**: ESLint 9.36.0
- **Task Runner**: Concurrently 8.2.2
- **PostCSS**: 8.5.6
- **Autoprefixer**: 10.4.21

## 📁 Project Structure

```
Block-code/
├── src/
│   ├── Components/
│   │   ├── Actuators/         # Components for motors, relays, buzzers, LEDs
│   │   ├── BlockCanvas.jsx    # Main visual canvas for block arrangement
│   │   ├── Codegen.jsx        # Code generation engine
│   │   ├── Compiler.jsx       # Backend compilation interface
│   │   ├── Condition/         # If/Else block components
│   │   ├── Display/           # OLED and LCD display components
│   │   ├── General/           # Generic utility blocks
│   │   ├── GPIo/              # GPIO read/write components
│   │   ├── Looping/           # Loop and repeat components
│   │   ├── Motors/            # Servo motor components
│   │   ├── Navigation.jsx     # Navigation bar
│   │   ├── Sensors/           # Sensor block components
│   │   ├── Sidebar.jsx        # Block palette sidebar
│   │   └── common/            # Shared components and utilities
│   ├── utils/                 # Utility functions
│   ├── App.jsx                # Main application component
│   ├── App.css                # Application styles
│   ├── main.jsx               # React entry point
│   └── index.css              # Global styles
├── backend/
│   ├── server.js              # Express server with compilation endpoint
│   ├── package.json           # Backend dependencies
│   └── sketch/                # Temporary sketch storage
│       ├── sketch.ino         # Generated Arduino sketch
│       └── build/             # Compiled output (.hex files)
├── bin/
│   ├── arduino-cli.exe        # Arduino CLI tool for Windows
│   └── LICENSE.txt            # Arduino CLI license
├── public/                    # Static assets
├── test_sketch/               # Test Arduino sketches
├── test_compile/              # Compilation test outputs
├── package.json               # Frontend dependencies
├── vite.config.js             # Vite configuration
├── docker-compose.yaml        # Docker compose setup
├── Dockerfile                 # Docker configuration
├── eslint.config.js           # ESLint configuration
└── README.md                  # This file
```

## 📋 How It Works

1. **Visual Block Design**: Drag components from the sidebar onto the canvas to create your logic
2. **Block Connection**: Connect blocks together to define program flow
3. **Code Generation**: The platform automatically generates Arduino C++ code from your block layout
4. **Compilation**: Backend compiles the generated code using Arduino CLI
5. **Hex File Generation**: Produces .hex files ready to upload to Arduino/ESP32 boards
6. **Download**: Users can download the compiled sketch or hex file for flashing

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher, LTS recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- Windows/Linux/Mac compatible system
- Arduino IDE (optional, for additional board management)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/rakeshkolipakaace/Block-code.git
   cd Block-code
   ```

2. **Install frontend dependencies:**
   ```bash
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd backend
   npm install
   cd ..
   ```

### Running the Project

#### Option 1: Single Command (Recommended)
Start both frontend and backend simultaneously:

```bash
npm run start
# or
npm run start:all
```

This will launch:
- **Frontend**: http://localhost:5174 (or next available port)
- **Backend**: http://localhost:5000 (compilation server)

#### Option 2: Manual Setup (Separate Terminals)

Terminal 1 - Frontend:
```bash
npm run dev
```

Terminal 2 - Backend:
```bash
cd backend
npm start
```

Open your browser and navigate to the URL shown in your terminal to access the application.

### Available Scripts

```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Combined
npm run start        # Start both frontend + backend
npm run start:all    # Alternative (same as above)
```

## 🐳 Docker Setup (Optional)

To run the application using Docker:

```bash
docker-compose up
```

This will containerize and run both frontend and backend services.

## 🔧 API Endpoints

### Backend Services

**POST /compile**
- **Description**: Compiles Arduino block-generated code
- **Request Body**: 
  ```json
  {
    "code": "// Arduino sketch code here"
  }
  ```
- **Response**: 
  ```json
  {
    "success": true,
    "hexFile": "path/to/sketch.ino.hex"
  }
  ```
- **Port**: 5000 (default)

## 🎨 Supported Block Categories

- **General**: Variables, Functions, Comments
- **Control**: If/Else, If/Else If, Switch
- **Loops**: For Loop, While Loop, Repeat
- **Sensors**: DHT, Ultrasonic, Soil Moisture, LDR, IR
- **Displays**: OLED 1.3", LCD 16x2
- **GPIO**: Digital Read, Digital Write, Analog Read, PWM Write
- **Motors**: Servo Control
- **Actuators**: Relay, Buzzer, RGB LED

## 🔐 Security Features

- CORS enabled for cross-origin requests
- Input validation for code compilation
- Temporary sketch storage with automatic cleanup
- Arduino CLI sandboxing for safe compilation

## 📝 Development Workflow

1. Create visual blocks in the canvas
2. Connect blocks to define logic flow
3. Use the "Generate Code" feature to preview Arduino code
4. Click "Compile" to generate .hex file
5. Download the hex file and flash it to your Arduino board

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues or pull requests to improve Block-Code.

### Development Guidelines
- Follow ESLint rules: `npm run lint`
- Test your changes before submitting
- Update documentation as needed
- Ensure both frontend and backend work together

## 📄 License

This project is open source and available for educational and commercial use.

## 👨‍💻 Author

**Rakesh** - [GitHub Profile](https://github.com/rakeshkolipakaace)

## 📚 Resources

- [Arduino Documentation](https://www.arduino.cc/reference/en/)
- [Arduino CLI Guide](https://arduino.github.io/arduino-cli/latest/)
- [React Flow Documentation](https://reactflow.dev/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)

## 🐛 Troubleshooting

**Arduino CLI not found:**
- Ensure `arduino-cli.exe` is in the `bin/` directory
- Check file permissions

**Port 5000/5174 already in use:**
- Kill the process using that port or configure a different port in `vite.config.js`

**Compilation fails:**
- Check if your board is selected (default: Arduino Uno)
- Verify syntax in generated code
- Check backend logs for error details

## 🎯 Future Enhancements

- Support for additional microcontroller boards
- Live serial monitor integration
- Block library for community-created blocks
- Simulation engine for hardware testing
- Multi-user collaboration features
- Mobile app support

---

**Last Updated**: March 2026
**Repository**: [Block-Code](https://github.com/rakeshkolipakaace/Block-code)
**Status**: Active Development
