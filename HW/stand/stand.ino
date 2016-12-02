#include <TFT.h>
#include <SPI.h>

#define CS   10
#define DC   9
#define RESET  8  

TFT TFTscreen = TFT(CS, DC, RESET);

char* id = "1";
int occupied[] = {1,1,1,1,1};
bool rewriteImpuls = false;
bool connected = false;

#define LEND_BUTTON 2
bool lend_button_pressed = false;

#define RETURN_BUTTON 12
bool return_button_pressed = false;

void setup() {
  Serial.begin(9600);
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
  pinMode(2, INPUT);
  pinMode(12, INPUT);
  statusBar();
  connection();
}

void loop() {
  //Serial.println(return_button_pressed);
  if(digitalRead(LEND_BUTTON) == HIGH){
    lend_button_pressed = true;
  }
  if(digitalRead(RETURN_BUTTON) == HIGH){
    return_button_pressed = true;
  }
  if(digitalRead(LEND_BUTTON) == LOW && lend_button_pressed == true){
    if(mamVolneKolo() != -1){
      occupied[mamVolneKolo()] = 0;
      clearStatusLine();
      //SEND TO WEB THAT I'VE BORROWED A BIKE FROM SLOT mamVolneKolo.
    }
    else{
      clearStatusLine();
      TFTscreen.text("Zadna dalsi volna kola.",0,25);
    }
    //Serial.println("BU");
    lend_button_pressed = false;
    rewriteImpuls = true;
  }
  if(digitalRead(RETURN_BUTTON) == LOW && return_button_pressed == true){
    if(mamVolnyStojan() != -1){
      clearStatusLine();
      occupied[mamVolnyStojan()] = 1;
      //SEND TO WEB THAT I'VE RECIEVED A BIKE TO SLOT mamVolnyStojan.
    }
    else{
  clearStatusLine();
      TFTscreen.text("Zadna dalsi volna mista.",0,25);
    }
    //Serial.println("BU");
    return_button_pressed = false;
    rewriteImpuls = true;
  }
  checkConnection();
  //checkPositions();
  if(rewriteImpuls){
    statusBar();
    rewriteImpuls = false;
  }
}
void statusBar(){
  for(int i = 0; i < 5; i++){
    if(occupied[i] == 1){
      TFTscreen.fill(0,255,0);
    }
    else if(occupied[i] == 0){
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
    int prev = occupied[i];
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
