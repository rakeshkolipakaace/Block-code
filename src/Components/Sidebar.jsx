import { useState, useEffect } from "react";
import { FiMenu, FiX, FiChevronDown, FiChevronRight } from "react-icons/fi";

const Sidebar = ({ onAddBlock }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth <= 768) setIsOpen(false);
      else setIsOpen(true);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const menuItems = [
    {
      name: "Sensors",
      subItems: [
        "Ultrasonic",
        "DHT11",
        "IR Sensor",
        "LDR",
        "Soil Moisture",
        "Water Level Sensor",
      ],
    },
    {
      name: "Condition",
      subItems: ["if", "if-else"],
    },
    {
      name: "Looping",
      subItems: ["break", "repeat", "forever", "while", "for loop"],
    },
    {
      name: "General",
      subItems: ["Print", "Assign", "Delay"],
    },

    {
      name: "GP/IO Pins",
      subItems: ["PWM", "GPIO pin", "Pin Write", "Pin read", "ADC"],
    },
    {
      name: "Actuators",
      subItems: [
        "Buzzer",
        "PWM LED",
        "RGB LED",
        "Relay",
        "16*2 LCD",
        "Push Button",
      ],
    },

    {
      name: "Motors",
      subItems: ["Servo Motor"],
    },
    {
      name: "Display",
      subItems: ["1.3 OLED", "LCD 16*2"],
    },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);

  const toggleExpand = (itemName) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemName]: !prev[itemName],
    }));
  };

  const handleSubItemClick = (subItem) => {
    setActiveItem(subItem);
    if (!onAddBlock) return;

    if (subItem === "Ultrasonic") {
      onAddBlock("ultrasonic", { triggerPin: "", echoPin: "", distance: "" });
    } else if (subItem === "DHT11") {
      onAddBlock("dht11", { dataPin: "", temperature: "", humidity: "" });
    } else if (subItem === "IR Sensor") {
      onAddBlock("ir", { outPin: "", irValue: "" });
    } else if (subItem === "LDR") {
      onAddBlock("ldr", { analogPin: "", intensity: "" });
    } else if (subItem === "Soil Moisture") {
      onAddBlock("soilMoisture", { analogPin: "", moisture: "" });
    } else if (subItem === "Water Level Sensor") {
      onAddBlock("waterLevel", { waterLevel: "" });
    } else if (subItem === "Buzzer") {
      onAddBlock("buzzer", { pin: "", output: "LOW" });
    } else if (subItem === "PWM LED") {
      onAddBlock("pwmLed", { pin: "", output: "LOW" });
    } else if (subItem === "RGB LED") {
      onAddBlock("rgbLed", {
        redPin: "",
        greenPin: "",
        bluePin: "",
        color: "",
        brightness: 255,
      });
    } else if (subItem === "Relay") {
      onAddBlock("relay", {
        pin: "",
        no: "LOW",
        nc: "LOW",
      });
    } else if (subItem === "16*2 LCD") {
      onAddBlock("lcd", {
        sda: "",
        scl: "",
        backlight: "HIGH",
      });
    } else if (subItem === "Servo Motor") {
      onAddBlock("servoMotor", {
        servoPin: "",
        angle: 0,
      });
    } else if (subItem === "Push Button") {
      onAddBlock("pushButton", {
        pin: "",
        value: "LOW",
      });
    } else if (subItem === "break") {
      onAddBlock("break", {});
    } else if (subItem === "repeat") {
      onAddBlock("repeat", { times: 1 });
    } else if (subItem === "forever") {
      onAddBlock("forever", {});
    } else if (subItem === "while") {
      onAddBlock("whileLoop", { condition: "True" });
    } else if (subItem === "for loop") {
      onAddBlock("forLoop", { variable: "i", range: "range(10)" });
    } else if (subItem === "if") {
      onAddBlock("ifCond", { left: "", operator: ">=", right: "0" });
    } else if (subItem === "if-else") {
      onAddBlock("ifElse", { left: "", operator: ">=", right: "0" });
    } else if (subItem === "GPIO pin") {
      onAddBlock("gpioPin", { pin: "2", mode: "OUT" });
    } else if (subItem === "Pin Write") {
      onAddBlock("gpioPinWrite", { pin: "4", value: 1 });
    } else if (subItem === "Pin read") {
      onAddBlock("gpioPinRead", { pin: "4", store: "value" });
    } else if (subItem === "ADC") {
      onAddBlock("adc", { pin: "34", store: "value" });
    } else if (subItem === "PWM") {
      onAddBlock("gpioPwm", { pin: "2", frequency: "1000", duty: "512" });
    } else if (subItem === "1.3 OLED") {
      onAddBlock("oled13", {
        port: "1",
        sck: "47",
        sda: "48",
        rotate: 0,
        top: 0,
        left: 0,
        text: "Hello world",
      });
    } else if (subItem === "LCD 16*2") {
      onAddBlock("lcd16x2", {
        sda: "47",
        scl: "48",
        address: "0x27",
        text: "Hello world",
        row: 0,
        col: 0,
        clear: true,
      });
    } else if (subItem === "Print") {
      onAddBlock("print", { text: "Hello world" });
    } else if (subItem === "Assign") {
      onAddBlock("variable", { variable: "x", value: 0 });
    } else if (subItem === "Delay") {
      onAddBlock("sleep", { seconds: 1 });
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        style={{
          display: window.innerWidth <= 768 ? "block" : "none",
          position: "fixed",
          top: "16px",
          left: "16px",
          zIndex: 50,
          padding: "8px",
          borderRadius: "8px",
          backgroundColor: "#1f2937",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? (
          <FiX style={{ width: "24px", height: "24px" }} />
        ) : (
          <FiMenu style={{ width: "24px", height: "24px" }} />
        )}
      </button>

      {isMobile && isOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 30,
          }}
          onClick={toggleSidebar}
        ></div>
      )}

      <aside
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "100vh",
          backgroundColor: "#111827",
          color: "white",
          transition: "all 0.3s ease-in-out",
          zIndex: 40,
          width: isOpen ? "256px" : "80px",
          transform:
            isMobile && !isOpen ? "translateX(-100%)" : "translateX(0)",
          overflowY: "auto",
          overflowX: "hidden",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {/* LOGO */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "80px",
            backgroundColor: "#1f2937",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1633409361618-c73427e4e206?ixlib=rb-4.0.3"
            alt="Logo"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: isOpen ? "8px" : "50%",
              objectFit: "cover",
              transition: "all 0.3s",
            }}
          />
          {isOpen && (
            <span
              style={{
                marginLeft: "12px",
                fontSize: "20px",
                fontWeight: "600",
                whiteSpace: "nowrap",
              }}
            >
              Block Code
            </span>
          )}
        </div>

        {/* MENU */}
        <nav style={{ marginTop: "32px" }}>
          <ul style={{ listStyle: "none", padding: "0 16px", margin: 0 }}>
            {menuItems.map((item) => (
              <li key={item.name} style={{ marginBottom: "8px" }}>
                <div style={{ display: "flex", flexDirection: "column" }}>
                  {/* MAIN MENU ITEM */}
                  <button
                    onClick={() => {
                      setActiveItem(item.name);
                      if (item.subItems) toggleExpand(item.name);
                    }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      width: "100%",
                      padding: "12px",
                      borderRadius: "8px",
                      transition: "all 0.2s",
                      backgroundColor:
                        activeItem === item.name ? "#1f2937" : "transparent",
                      color: activeItem === item.name ? "white" : "#9ca3af",
                      border: "none",
                      cursor: "pointer",
                      textAlign: "left",
                    }}
                  >
                    {isOpen && (
                      <>
                        <span
                          style={{
                            marginLeft: "12px",
                            fontSize: "14px",
                            fontWeight: "500",
                            flexGrow: 1,
                          }}
                        >
                          {item.name}
                        </span>
                        {item.subItems && (
                          <span style={{ marginLeft: "auto" }}>
                            {expandedItems[item.name] ? (
                              <FiChevronDown
                                style={{ width: "16px", height: "16px" }}
                              />
                            ) : (
                              <FiChevronRight
                                style={{ width: "16px", height: "16px" }}
                              />
                            )}
                          </span>
                        )}
                      </>
                    )}
                  </button>

                  {/* SUB ITEMS */}
                  {isOpen && item.subItems && expandedItems[item.name] && (
                    <ul
                      style={{
                        marginLeft: "48px",
                        marginTop: "8px",
                        listStyle: "none",
                        padding: 0,
                      }}
                    >
                      {item.subItems.map((subItem) => (
                        <li key={subItem} style={{ marginBottom: "8px" }}>
                          <button
                            onClick={() => handleSubItemClick(subItem)}
                            style={{
                              width: "100%",
                              padding: "8px",
                              fontSize: "14px",
                              borderRadius: "6px",
                              transition: "all 0.2s",
                              backgroundColor:
                                activeItem === subItem
                                  ? "#1f2937"
                                  : "transparent",
                              color:
                                activeItem === subItem ? "white" : "#9ca3af",
                              border: "none",
                              cursor: "pointer",
                              textAlign: "left",
                            }}
                          >
                            {subItem}
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </div>
  );
};

export default Sidebar;
