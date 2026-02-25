#include <Arduino.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>

Adafruit_SSD1306 oled_47_48(128, 64, &Wire, -1);

void setup() {
    Serial.begin(9600);
    Wire.begin();
    oled_47_48.begin(0x3c, false);
    oled_47_48.clearDisplay();
    oled_47_48.display();
}

void loop() {
oled_47_48.clearDisplay();
oled_47_48.setCursor(0, 0);
oled_47_48.println("Hello world");
oled_47_48.display();
}