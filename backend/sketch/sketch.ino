#include <Arduino.h>
#include <Servo.h>

Servo servo_9;

void setup() {
    Serial.begin(9600);
    pinMode(5, INPUT);
    servo_9.attach(9);
}
void loop() {
int ir_val = digitalRead(5); // Expected: HIGH
if (ir_val == HIGH) {
    servo_9.write(90);
} else {
    servo_9.write(0);
}
}