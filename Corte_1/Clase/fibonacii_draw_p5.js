let fixedCenterX;
let fixedCenterY;
let state;
let arc_dev;
let erase_;
function setup() {
  //frameRate(24);
  createCanvas(1000, 1000);
  background(255);
  fixedCenterX = width/2;
  fixedCenterY = height/2;
  arc_dev = 0;
  erase_ = false;
  state =  {
              "step":0,
              "count":3,
              "direction": {"x":0,"y":1},
              "arc_start": PI + HALF_PI,
              "arc_end":0,
              "arc_dev":0,
              "next_arc" : function(){
                if (this.step === 0){
                  this.arc_start = PI + HALF_PI + this.arc_dev;
                  this.arc_end = 0 + this.arc_dev;
                } else {
                  this.arc_start += HALF_PI;
                  this.arc_end += HALF_PI;
                }
                return `Arc Start:${this.arc_start}\n Arc End: ${this.arc_end}`;
              },
              "next_step" : function(){
                this.step = (this.step + 1) % 4;
                this.count += 1;
                switch (this.step) {
                  case 0 :
                    this.direction.x = 0;
                    this.direction.y = 1;
                    break;
                  case 1 :
                    this.direction.x = -1;
                    this.direction.y = 0;
                    break;
                  case 2 :
                    this.direction.x = 0;
                    this.direction.y = -1;
                    break;
                  case 3 :
                    this.direction.x = 1;
                    this.direction.y = 0;
                    break;
                  default :
                    //console.log("joas");
                    break;
                }
                this.next_arc()
                ////console.log();
                return this.step;
              },
              "get_fibo" : function(){
                return fibor(this.count);
              },
              "get_fibo_2" : function(){
                return fibor(this.count-2);
              },
              "reset" : function(){
                this.step = 3;
                this.next_step();
                this.count = 3;
              }
};
  ////console.log(state);
  ////console.log(state.next_step());
  
  let fibo_ = 16;
  while (fibo_ >=0){
    ////console.log("n:"+fibo_);
    ////console.log("fibo:"+fibor(fibo_));
    fibo_-=1;
  }
  
}

function draw() {
  
  fixedCenterX = width/2;
  fixedCenterY = height/2;
  //background(255);
  //fill("white");
  let size = 10;
  noFill();
  arc(fixedCenterX,fixedCenterY, size, size, HALF_PI + arc_dev, PI + HALF_PI + arc_dev);
  ////console.log("x"+fixedCenterX);
  ////console.log("y"+fixedCenterY);
  let n = 7;
  while (n>=0){
    fixedCenterX = fixedCenterX + state.get_fibo_2()*state.direction.x*5;
    fixedCenterY = fixedCenterY + state.get_fibo_2()*state.direction.y*5;
    size = state.get_fibo_2()*10;
    ////console.log("x"+fixedCenterX);
    ////console.log("y"+fixedCenterY);
    //fill("red");
    //circle(fixedCenterX,fixedCenterY,10);
    //fill("white");
    arc(fixedCenterX,fixedCenterY,state.get_fibo()*10,state.get_fibo()*10,state.arc_start,state.arc_end)
    //console.log(state.step)
    state.next_step();
    n-=1;
  }
  state.reset();
  state.arc_dev = arc_dev;
  arc_dev = (0.1+arc_dev)%5.5;
  //console.log(arc_dev);
  if (arc_dev<= 0.1 && arc_dev >= 0){
    //background(255);
    erase_ = !erase_;
    if (erase_) {
      erase();
    }else {
      noErase();
    }
  }
  
}

function fibor(n){
  if (n===0 || n===1){
    return n;
  }
  return fibor(n-1) + fibor(n-2);
}
