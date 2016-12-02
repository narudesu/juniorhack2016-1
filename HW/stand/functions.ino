int mamVolneKolo(){
  for(int i = 0; i < 5; i++){
    if(occupied[i] == 1){
      return i;
    }
  }
  return -1;
}
int mamVolnyStojan(){
  for(int i = 0; i < 5; i++){
    if(occupied[i] == 0){
      return i;
    }
  }
  return -1;
}
void clearStatusLine(){
  TFTscreen.fill(0,0,0);
  TFTscreen.stroke(0,0,0);
  TFTscreen.rect(0,25,200,50);
  TFTscreen.stroke(255,255,255);
}

