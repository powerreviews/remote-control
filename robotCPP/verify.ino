
#include "support.h"

OpticalSensor rightSensor,leftSensor;
Sonar rightSonar,leftSonar;
Motor motor;
Heading heading;
//Adafruit_BNO055 h2;

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

double initHeading = 0;

void setup() {
    Particle.function("start",start);
    Serial.begin(115200);
    delay(5000);
    Serial.println("Start!");
    leftSensor.setup(A2);
    rightSensor.setup(A3);
    motor.setup(D3,A4,A5,D2);
    leftSonar.setup(D5,A0);
    rightSonar.setup(D6,A1);
    pinMode (D7,OUTPUT);
    Serial.println("Initializing Heading");
   // h2.begin();
    heading.setup();
    motor.setSpeed(140,140);
    delay(100);
    motor.setSpeed(0,0);
    leftSonar.triggerPing();
    delay(40);
    rightSonar.triggerPing();
    delay(40);
    Particle.function("read1",read1);
    Particle.function("read2",read2);
    Particle.function("echo1",echo1);
    Particle.function("echo2",echo2);
 
    motor.setSpeed(200,0);
    delay(1000);
    motor.setSpeed(0,0);
    delay(500);
    motor.setSpeed(200,0);
    delay(1000);
    motor.setSpeed(0,0);
    delay(500);
    motor.setSpeed(0,200);
    delay(2000);
    motor.setSpeed(0,0);
}


void loop() {
    wait();
    int leftM = 0;
    int rightM = 0;
  
    leftSonar.triggerPing();
    delay(50);
    int ls = leftSonar.read();
    int lo = leftSensor.read();
    
    rightSonar.triggerPing();
    delay(50);
    int rs = rightSonar.read();
    int ro = rightSensor.read();
    
    double dif = heading.getHeadingDif(0);
    digitalWrite(D7,(dif > -10.0 && dif < 10.0));
    
    if (ls < 200){
        if (lo < 3500){
            leftM = 250-ls;
        }else {
            leftM = -250+ls;
        }
    }
    if (rs < 200){
        if (ro < 3500){
            rightM = 250-rs;
        }else{
            rightM = -250+rs;
        }
    }
    
    motor.setSpeed(leftM,rightM);
}