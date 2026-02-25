const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const arduinoCliPath = path.resolve(__dirname, "..", "bin", "arduino-cli.exe");

app.post("/compile", async (req, res) => {
    const { code } = req.body;

    const sketchDir = path.join(__dirname, "sketch");
    const sketchFile = path.join(sketchDir, "sketch.ino");

    if (!fs.existsSync(sketchDir)) {
        fs.mkdirSync(sketchDir);
    }

    // Write the code to a temporary .ino file
    fs.writeFileSync(sketchFile, code);

    // Check if arduino-cli is available
    exec(`"${arduinoCliPath}" version`, (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: `'arduino-cli' not found at ${arduinoCliPath}. Please ensure the automated setup finished correctly.`
            });
        }

        // Compile using arduino-cli
        // Note: fqbn is set to arduino:avr:uno by default, can be made dynamic later
        exec(
            `"${arduinoCliPath}" compile --fqbn arduino:avr:uno "${sketchDir}" --output-dir "${sketchDir}/build"`,
            (error, stdout, stderr) => {
                if (error) {
                    console.error("Compilation Error:", stderr);
                    return res.json({
                        success: false,
                        error: stderr || stdout
                    });
                }

                // Check if .hex file exists
                const hexFile = path.join(sketchDir, "build", "sketch.ino.hex");
                if (fs.existsSync(hexFile)) {
                    const hexContent = fs.readFileSync(hexFile, "utf8");
                    res.json({
                        success: true,
                        output: stdout,
                        hex: hexContent
                    });
                } else {
                    res.json({
                        success: true,
                        output: stdout,
                        message: "Compiled successfully but HEX file not found in build directory."
                    });
                }
            }
        );
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Compiler server running on port ${PORT}`));
