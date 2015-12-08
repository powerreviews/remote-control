
#include "support.h"

void setup() {
        Particle.function("start",start);
    // Enable the pin that is connected to blue LED
    // and set for output
    pinMode (D7,OUTPUT);
}



void loop(){
    digitalWrite(D7,true);
    delay(1000);
    digitalWrite(D7,false);
    delay(1000);
}

// void loop() {
//     delay(10);
//     cycle++;
//     // count forward on each 10ms interval ... after 100 cycles (1 second) increment state;
//     if (cycle == 100){
//         cycle = 0;
//         state ++;
//     }

//     switch(state){
//         case 0 :
//         // turn LED on;
//             digitalWrite(D7,true);
//             break;
//         case 1 :
//         // turn LED off;
//             digitalWrite(D7,false);
//             break;
//         case 2:
//         // restart cycle;
//             state = 0;
//             break;
//     }
// }


// int state = 0;
// int cycle = 0;

// void loop() {
//     wait();
//     cycle++;
//     // count forward on each 10ms interval ... after 100 cycles (1 second) increment state;
//     if (cycle == 100){
//         cycle = 0;
//         state ++;
//     }

//     switch(state){
//         case 0 :
//         // turn LED on;
//             digitalWrite(D7,true);
//             break;
//         case 1 :
//         // turn LED off;
//             digitalWrite(D7,false);
//             break;
//         case 2:
//         // restart cycle;
//             state = 0;
//             break;
//     }
// }