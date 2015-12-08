
#include "math.h"


bool started = false;


class Heading {
 // BNO055 Register Map
// http://ae-bst.resource.bosch.com/media/products/dokumente/bno055/BST_BNO055_DS000_10_Release.pdf
//
// BNO055 Page 0
#define BNO055_CHIP_ID          0x00    // should be 0xA0              
#define BNO055_ACC_ID           0x01    // should be 0xFB              
#define BNO055_MAG_ID           0x02    // should be 0x32              
#define BNO055_GYRO_ID          0x03    // should be 0x0F              
#define BNO055_SW_REV_ID_LSB    0x04                                                                          
#define BNO055_SW_REV_ID_MSB    0x05
#define BNO055_BL_REV_ID        0x06
#define BNO055_PAGE_ID          0x07
#define BNO055_TEMP             0x34
#define BNO055_CALIB_STAT       0x35
#define BNO055_SYS_STATUS       0x39
#define BNO055_UNIT_SEL         0x3B
#define BNO055_OPR_MODE         0x3D
#define BNO055_PWR_MODE         0x3E
#define BNO055_SYS_TRIGGER      0x3F
#define BNO055_TEMP_SOURCE      0x40
#define BNO055_ST_RESULT        0x36
#define BNO055_EUL_HEADING_LSB  0x1A
#define BNO055_GYRO_DATA_Z_LSB	0X18
// BNO055 Page 1
#define BNO055_PAGE_ID          0x07
#define BNO055_ACC_CONFIG       0x08


#define BNO055_ADDRESS 0x28   //  Device address of BNO055 when ADO = 1

    public:
    
    
    double getHeading() {
        int out = 2;
        uint8_t rawData[2];  // x/y/z gyro register data stored here
    			readBytes(BNO055_ADDRESS, BNO055_EUL_HEADING_LSB, 2, &rawData[0]);  // Read the two raw data registers sequentially into data array
    			out = (((int)rawData[1] << 8) | (int)rawData[0]);       // Turn the MSB and LSB into a signed 16-bit value
        return normalize(((double)out)/16.0);
    }
    
    int debugHeading(String in){
        return (int)getHeading();   
    }
    
    double getRotVel() {
        int out = 2;
        uint8_t rawData[2];  // x/y/z gyro register data stored here
    			readBytes(BNO055_ADDRESS, BNO055_GYRO_DATA_Z_LSB, 2, &rawData[0]);  // Read the two raw data registers sequentially into data array
    			out = (int16_t)(((int32_t)((int8_t)rawData[1])) << 8 | (rawData[0]));
    		//	out = (((int)rawData[1] << 8) | (int)rawData[0]);       // Turn the MSB and LSB into a signed 16-bit value
        return ((double)out)/16.0;
    }
    
    double getHeadingDif(double targetHeading){
        double dif = normalize(targetHeading) - getHeading();
        if (dif > 180){
            return dif - 360;
        }else if (dif < -180){
            return 360 + dif;
        }
        return dif;
    }


    void setup(){
        Wire.begin();
         delay(100);
        
         byte id = readByte(BNO055_ADDRESS, BNO055_CHIP_ID);
		Serial.print("BNO055 Chip ID: "); Serial.println(id, HEX);   
		id = readByte(BNO055_ADDRESS, BNO055_ACC_ID           );
		Serial.print("BNO055 Acc ID: "); Serial.println(id, HEX);
	    byte swlsb = readByte(BNO055_ADDRESS, BNO055_SW_REV_ID_LSB);
	    byte swmsb = readByte(BNO055_ADDRESS, BNO055_SW_REV_ID_MSB);
	    Serial.print("BNO055 SW Revision ID: "); Serial.print(swmsb, HEX); Serial.print("."); Serial.println(swlsb, HEX); 
	    
	    // Check bootloader version
	    byte blid = readByte(BNO055_ADDRESS, BNO055_BL_REV_ID);
	    Serial.print("BNO055 bootloader Version: "); Serial.println(blid); 
	    
	    // Check self-test results
	    byte selftest = readByte(BNO055_ADDRESS, BNO055_ST_RESULT);
	    
	    if(selftest & 0x01) {
	      Serial.println("accelerometer passed selftest"); 
	    } else {
	      Serial.println("accelerometer failed selftest"); 
	    }
	    if(selftest & 0x02) {
	      Serial.println("magnetometer passed selftest"); 
	    } else {
	      Serial.println("magnetometer failed selftest"); 
	    }  
	    if(selftest & 0x04) {
	      Serial.println("gyroscope passed selftest"); 
	    } else {
	      Serial.println("gyroscope failed selftest"); 
	    }      
	    if(selftest & 0x08) {
	      Serial.println("MCU passed selftest"); 
	    } else {
	      Serial.println("MCU failed selftest"); 
	    }
	    // Select page 1 to configure sensors
       writeByte(BNO055_ADDRESS, BNO055_PAGE_ID, 0x01);
    //   // Configure ACC
    //   writeByte(BNO055_ADDRESS, BNO055_ACC_CONFIG, APwrMode << 5 | Abw << 3 | Ascale );
    //   // Configure GYR
    //   writeByte(BNO055_ADDRESS, BNO055_GYRO_CONFIG_0, Gbw << 3 | Gscale );
    //   writeByte(BNO055_ADDRESS, BNO055_GYRO_CONFIG_1, GPwrMode);
    //   // Configure MAG
    //   writeByte(BNO055_ADDRESS, BNO055_MAG_CONFIG, MPwrMode << 4 | MOpMode << 2 | Modr );
       
       // Select page 0 to read sensors
       writeByte(BNO055_ADDRESS, BNO055_PAGE_ID, 0x00);
    
       //Select external crystal
       writeByte(BNO055_ADDRESS, BNO055_SYS_TRIGGER, 0x80);
       // Select BNO055 gyro temperature source 
       writeByte(BNO055_ADDRESS, BNO055_TEMP_SOURCE, 0x01 );
    
       // Select BNO055 sensor units (temperature in degrees C, rate in dps, accel in mg)
       writeByte(BNO055_ADDRESS, BNO055_UNIT_SEL, 0x01 );
       
       // Select BNO055 system power mode
       writeByte(BNO055_ADDRESS, BNO055_PWR_MODE, PWRMode );
     
       // Select BNO055 system operation mode
       writeByte(BNO055_ADDRESS, BNO055_OPR_MODE, OPRMode );
    
         // Select page 0 to read sensors
       writeByte(BNO055_ADDRESS, BNO055_PAGE_ID, 0x00);
    
       Particle.function("heading",&Heading::debugHeading,this);
    }
    

    private:
    
    double normalize(double heading){
        if (heading > 180 || heading < -180){
			heading = heading - 360 * (int)(heading / 360);
		}
		return heading;
    }
    
    void writeByte(uint8_t address, uint8_t subAddress, uint8_t data)
    {
      Wire.beginTransmission(address);  // Initialize the Tx buffer
      Wire.write(subAddress);           // Put slave register address in Tx buffer
      Wire.write(data);                 // Put data in Tx buffer
      Wire.endTransmission();           // Send the Tx buffer
    }
    
    uint8_t readByte(uint8_t address, uint8_t subAddress)
    {
      uint8_t data; // `data` will store the register data   
      Wire.beginTransmission(address);         // Initialize the Tx buffer
      Wire.write(subAddress);                  // Put slave register address in Tx buffer
      Wire.endTransmission();        // Send the Tx buffer, but send a restart to keep connection alive
    //  Wire.endTransmission(false);             // Send the Tx buffer, but send a restart to keep connection alive
    //  Wire.requestFrom(address, 1);  // Read one byte from slave register address 
      Wire.requestFrom(address, (size_t) 1);   // Read one byte from slave register address 
      data = Wire.read();                      // Fill Rx buffer with result
      return data;                             // Return data read from slave register
    }
    
    // Traditional Blocking
    void readBytes(uint8_t address, uint8_t subAddress, uint8_t count, uint8_t * dest)
    {  
    		Wire.beginTransmission(address);   // Initialize the Tx buffer
    		Wire.write(subAddress);            // Put slave register address in Tx buffer
    		Wire.endTransmission();  // Send the Tx buffer, but send a restart to keep connection alive
    		delay(1);
            Wire.requestFrom(address, (size_t) count);  // Read bytes from slave register address 
            delay(1);
        	for (uint8_t i = 0; i < count; i ++){
        		dest[i] = Wire.read();
        	}  
    	
    }
    
    
    enum OPRMode {  // BNO-55 operation modes
      CONFIGMODE = 0x00,
    // Sensor Mode
      ACCONLY,
      MAGONLY,
      GYROONLY,
      ACCMAG,
      ACCGYRO,
      MAGGYRO,
      AMG,            // 0x07
    // Fusion Mode
      IMU,
      COMPASS,
      M4G,
      NDOF_FMC_OFF,
      NDOF            // 0x0C
    };
    
    enum PWRMode {
      Normalpwr = 0,   
      Lowpower,       
      Suspendpwr       
    };
    

    
    uint8_t PWRMode = Normalpwr ;    // Select BNO055 power mode
    uint8_t OPRMode = NDOF;        // specify operation mode for sensors

   
};


class OpticalSensor {
    /*
    The optical sensor provides feedback on the reflectivity of near by surface.
    It returns a large number, up to 4096 for a dark, non-reflective surface (or no reflection due to no surface).
    It returns a smaller number for lighter, more reflective surface.  A white matte surface at 1 cm away will regster ~500 out 0f 4096.
    
    The id of an analog pin must be provided to the constuctor.  This pin will be enabled and used for reading input.
    */

    public:
    
    void setup(int analogPin){
        pinID = analogPin;
        pinMode(pinID,INPUT);
    }
    
    int read(){
        return analogRead(pinID);
    }
    
    private:
    int pinID;
    
};

class Motor{
  private:
  int left=0,right=0;
  int abort(String in){
     
     if (!started){
         started = true;
         return 1;
     } 
     
     left = 0;
     right = 0;
      
    digitalWrite(rf,LOW);
    digitalWrite(rb,LOW);
    digitalWrite(lf,LOW);
    digitalWrite(lb,LOW);
    
    started = false;
    
    return 0;
  }
  public:
  
  void setup(int leftForwardPin,int leftBackPin,int rightForwardPin,int rightBackPin){
      rf = rightForwardPin;
      rb = rightBackPin;
      lf = leftForwardPin;
      lb = leftBackPin;
      
    pinMode(rf,OUTPUT);
    pinMode(rb,OUTPUT);
    pinMode(lf,OUTPUT);
    pinMode(lb,OUTPUT);
    
    digitalWrite(rf,LOW);
    digitalWrite(rb,LOW);
    digitalWrite(lf,LOW);
    digitalWrite(lb,LOW);
    
        Particle.variable("left", &left, INT);
        Particle.variable("right", &right, INT);
        
        Particle.function("x",&Motor::abort,this);
    
  }
   
     void setSpeed(int l,int r){

        if (l>250)
            l = 250;
        else if (l < -250)
            l = -250;
     
        if (r>250)
            r = 250;
        else if (r < -250)
            r = -250;
  
        transitionSpeed(left,l,right,r,3);
        
        left = l;
        right = r;
              
      
    }
   
    
  private:
  
  void transitionSpeed(int l1,int l2, int r1, int r2, int step){
      
      int count = 0;
      int al,ar;
      
      while (l1 != l2 || r1 != r2){
          if (l1 != l2){
              if (l1 < l2)
                l1++;
              else
                l1--;  
          }
          if (r1 != r2){
              if (r1 < r2)
                r1++;
              else
                r1--;  
          }
          
          count ++;
          if (count == step){
            delay(1);
            count = 0;
          }
          
          if ((l1>0 && l2<=0) || (l1<0 && l2>=0)){
              al = 0;
          }else{
              al = l1;
          }
          
          if ((r1>0 && r2<=0) || (r1<0 && r2>=0)){
              ar = 0;
          }else{
              ar = r1;
          }
        
      
      
            if (l1 > 0)
                analogWrite(lf,al);
            else
                digitalWrite(lf,LOW);
            
            if (l1 < 0)
                analogWrite(lb,-al);
            else
                digitalWrite(lb,LOW);
                
            if (r1 > 0)
                analogWrite(rf,ar);
            else
                digitalWrite(rf,LOW);
            
            if (r1 < 0)
                analogWrite(rb,-ar);
            else
                digitalWrite(rb,LOW);
            
        }
  }
  
  int rf,rb,lf,lb;
    
};

class Sonar{
    public:
    void setup(int activatePin,int inputPin){
        act = activatePin;
        input = inputPin;
        pinMode(act,OUTPUT);
        pinMode(input,INPUT);
        digitalWrite(act,LOW);
    }
    void triggerPing(){
        digitalWrite(act,HIGH);
        delay(1);
        digitalWrite(act,LOW);
    }
    int read(){
        return analogRead(input);
    }
    private:
    int act,input;
};



int start(String command){
    started = !started;
    return started;
}

void wait(int dur){
    while (!started){
        delay(100);
        Particle.process();
    }
    delay(dur);
}

void wait(){
   wait(10);
}

