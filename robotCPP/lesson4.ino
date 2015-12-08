
#include "support.h"

Sonar rightSonar,leftSonar;
Motor motor;

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

    motor.setup(D3,A4,A5,D2);
    leftSonar.setup(D5,A0);
    rightSonar.setup(D6,A1);
    pinMode (D7,OUTPUT);

    motor.setSpeed(120,120);
    delay(200);
    motor.setSpeed(0,0);
    
    leftSonar.triggerPing();
    delay(40);
    rightSonar.triggerPing();
    delay(40);


    Particle.function("echo1",echo1);
    Particle.function("echo2",echo2);

}

int count = 0;

void loop(){
    // TODO: Show with logic analyzer how the triggerPing() sends a pulse
    // and the sonar responds over 40ms.
    leftSonar.triggerPing();
    wait(50);
    int left = leftSonar.read();
    rightSonar.triggerPing();
    wait(50);
    int right = rightSonar.read();
    
    // when the echo shows a distance of 200 the motor is at 0.
    // As it gets further away, the motor speeds forward
    // if it gets too close, it moves backwards
    motor.setSpeed((left-200)*4,(right-200)*4);
    
    // TODO: Show how shallow angles are a harder to detect
    //tilting the sensor helps
        
}