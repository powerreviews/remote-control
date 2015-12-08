
#include "support.h"

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


void setup() {
    Particle.function("start",start);
   
    // These are the specific pins used to control the motor
    // Always use these pins (unless you rewire motor)
    // They are special PWM pins
    // TODO:look at with logic analyzer
    motor.setup(D3,A4,A5,D2);
   
    pinMode (D7,OUTPUT);
    delay(100);
    motor.setSpeed(120,120);
    delay(200);
    motor.setSpeed(0,0);
    
    // Adding a special function
    Particle.function("a",getState);
    Particle.function("down",stop);
}

int cycle = 0;


void loop() {
    wait();
    cycle++;
    // count forward on each 10ms interval ... after 50 cycles (1/2 second) increment state;
    if (cycle == 50){
        cycle = 0;
        state ++;
    }
    
    // Using modulous to flash every 100 ms
    digitalWrite(D7,cycle%10);

    switch(state){
        case 0 :
        // turn on both wheels at 150 out of 255
        // moves forward
            motor.setSpeed(180,180);
            break;
        case 1 :
        // turn on right wheels at 140 out of 255
        // gradually turns left
            motor.setSpeed(0,130);
            break;
        case 2:
        // turn on left wheels at -160 out of 255
        // turn on right wheels at 160 out of 255
        // spins fast
            motor.setSpeed(-160,160);
            break;
        case 3:
        // Reset cycle
            state = 0;
            break;
    }
    // TODO: Add a backwards and turn right 
    // !! Dont switch from forwads to backwards immediatly
}