let cuadrado;
cuadrado = {
  //Data
  _position : [0,0], //(x,y) range (-100, 100)
  _rotation : 0, //radians in PI/12 steps
  _edge : 40,
  _color : "red",
  //Methods
  randomize: function () {
    this.position = [-100 + 200 * Math.random(), -100 + 200 * Math.random()];
    this.rotation = 24*Math.random();
    this.color = Math.round(Math.random()*255).toString(16) + Math.round(Math.random()*255).toString(16) + Math.round(Math.random()*255).toString(16);
  },
  set position(tup){
    //Will return -100 or 100 if the coordinate overflows
    const check = (val) => Math.min(Math.max(val,-100),100);
    this._position[0] = check(tup[0]);
    this._position[1] = check(tup[1]);
  },
  get position(){
    return this._position;
  },
  set rotation(multiplier) {
    //p5.js PI
    this._rotation = Math.floor(multiplier); 
  },
  get rotation(){
    return this._rotation * (PI/12);
  },
  set color(str){
    this._color = str;
  },
  get color(){
    return this._color;
  },
  set edge(l){
    this._edge = l;
  },
  get edge(){
    return this._edge;
  },
}
