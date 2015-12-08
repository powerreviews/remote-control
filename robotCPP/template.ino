
#include "support.h"

OpticalSensor rightSensor,leftSensor;
Sonar rightSonar,leftSonar;
Motor motor;
Heading heading;

int read1(String in){
    return leftSensor.read();   
}
int read2(String in){
    return rightSensor.read();   
}
int echo1(String in){
    leftSonar.triggerPing();
    delay(40);
    return leftSonar.read();
}
int echo2(String in){
    rightSonar.triggerPing();
    delay(40);
    return rightSonar.read();
}



int mode = 0;
int speed = 0;
double startHeading = 0;
double targetHeading = 0;

void setup() {
    Particle.function("start",start);
    Serial.begin(115200);
    delay(100);
    Serial.println("Start!");
    leftSensor.setup(A2);
    rightSensor.setup(A3);
    motor.setup(D3,A4,A5,D2);
    leftSonar.setup(D5,A0);
    rightSonar.setup(D6,A1);
    pinMode (D7,OUTPUT);
    heading.setup();
    motor.setSpeed(120,120);
    delay(200);
    motor.setSpeed(0,0);
    
    leftSonar.triggerPing();
    delay(40);
    rightSonar.triggerPing();
    delay(40);
    Particle.function("read1",read1);
    Particle.function("read2",read2);
    Particle.function("echo1",echo1);
    Particle.function("echo2",echo2);

}

int count = 0;

void loop(){
    wait();
    digitalWrite(D7,count<100);
    count++;
    if (count == 200)
        count = 0;
        
}