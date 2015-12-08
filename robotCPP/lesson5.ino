
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

double target = 0;

int up(String in){
    return target = 0;
}

int down(String in){
    return target = 180;
}

int left(String in){
    return target = -90;
}

int right(String in){
    return target = 90;
}

int mode = 0;
int speed = 0;
double startHeading = 0;
double targetHeading = 0;

void setup() {
    Particle.function("start",start);
    delay(100);
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
    
    // Register the extra buttons to map to changes in target direction
    Particle.function("up",up);
    Particle.function("down",down);
    Particle.function("left",left);
    Particle.function("right",right);

}

int count = 0;

int originalHeading = -9999;

void loop(){
    wait();
    // When first starting, take current heading as up
    if (originalHeading == -9999){
        originalHeading = heading.getHeading();
        return;
    }
    
    // Find Heading Difference
    double headingDif = heading.getHeadingDif(originalHeading+target);
    
    // turn offset into a number big enough to make robot turn
    // First square it then multiply again by 2
    int offset = headingDif*10;
    
    // // Remember, squaring makes everything positive, but negative is important
    // if (headingDif < 0 )
    //     offset = -offset;
    
    if (offset>200)
        offset = 200;
    else if (offset<-200)
        offset = -200;
        
 
    // If we are pointing in the desired direction (+-5 deg) 
        // stop moving and light up
    if (headingDif>-5 && headingDif <5){
        digitalWrite(D7,true);
        motor.setSpeed(0,0);
    }else{
        // else do stuff and turn off light
        digitalWrite(D7,false);
        motor.setSpeed(0+offset,0-offset);
    }
        
}