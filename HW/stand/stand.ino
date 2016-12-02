#include <TFT.h>
#include <SPI.h>

#define CS   10
#define DC   9
#define RESET  8  

TFT TFTscreen = TFT(CS, DC, RESET);

char* id = "1";
int occupied[] = {0,1,2,0,1};
bool rewriteImpuls = false;
bool connected = false;

void setup() {
  TFTscreen.begin();
  TFTscreen.background(0, 0, 0);
  TFTscreen.stroke(255, 255, 255);
  TFTscreen.setTextSize(2);
  TFTscreen.text("BIKESTAND #", 0, 0);
  TFTscreen.text(id,140,0);
  TFTscreen.setTextSize(1);
  TFTscreen.fill(255,0,0);
  for(int i = 3; i <= 7; i++){
    pinMode(i, INPUT);
  }
  statusBar();
  connection();
}

void loop() {
  checkConnection();
  //checkPositions();
  if(rewriteImpuls){
    statusBar();
    rewriteImpuls = false;
  }
}
void statusBar(){
  for(int i = 0; i < 5; i++){
    if(occupied[i] == 0){
      TFTscreen.fill(0,255,0);
    }
    else if(occupied[i] == 1){
      TFTscreen.fill(0,0,255);
    }
    else if(occupied[i] == 2){
      TFTscreen.fill(0,255,255);
    }
    TFTscreen.rect(i*32, 96, 32, 32);
  }
}
void connection(){
  if(connected){
    TFTscreen.stroke(0,255,0);
    TFTscreen.text("ONLINE",0,15);
  }
  else{
    TFTscreen.stroke(0,0,255);
    TFTscreen.text("OFFLINE",0,15);
  }
  TFTscreen.stroke(255,255,255);
}
void checkPositions(){
  for(int i = 0; i < 5; i++){
    bool prev = occupied[i];
    if(digitalRead(i+3) == HIGH){
      occupied[i] = true;
    }
    else{
      occupied[i] = false;
    }
    if(prev != occupied[i]){
      rewriteImpuls = true;
    }
  }
}
void checkConnection(){
  bool prev = connected;
  if(prev != connected){
    rewriteImpuls = true;
  }
}

