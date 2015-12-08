
#include "support.h"

OpticalSensor rightSensor,leftSensor;
Motor motor;


int state = 0;

int getState(String in){
    return state;   
}

int stop(String in){
    motor.setSpeed(0,0);
    state = -2;
    return 0;
}

int read1(String in){
    return leftSensor.read();   
}
int read2(String in){
    return rightSensor.read();   
}

void setup() {
    Particle.function("start",start);
   
     // These sensors are constantly returning a voltage
     // The two analog pins listed are reading in the value
     // TODO: look at it with logic analyzer
    leftSensor.setup(A2);
    rightSensor.setup(A3);

    motor.setup(D3,A4,A5,D2);
   
    pinMode (D7,OUTPUT);
    delay(100);
    motor.setSpeed(120,120);
    delay(200);
    motor.setSpeed(0,0);
    
    // Mapping functions to read these sensors
    // When the button is pressed
    Particle.function("read1",read1);
    Particle.function("read2",read2);


}



void loop() {
    wait();
    
    int leftSpeed = 0;
    int rightSpeed = 0;
    
    if (leftSensor.read()<2000)
        leftSpeed = 150;
    else
        leftSpeed = 0;
        
    if (rightSensor.read()<2000)
        rightSpeed = 150;
    else
        rightSpeed = 0;
    
    motor.setSpeed(leftSpeed,rightSpeed);
    
    
}