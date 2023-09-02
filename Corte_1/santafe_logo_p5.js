function setup(){
    createCanvas(400,400);
}
function draw(){
    fill("red");
    noStroke();
    square((width/2)-100, (height/2)-100,200);
    circle(200, 300, 200);

    fill("white");
    rect((width/2)-90, (height/2)-60, 180, 160);
    circle(200, 300, 180);

    fill("red");
    circle(250, 300, 50);

    fill("white");
    textSize(25);
    text("SANTA FE", (width/2)-90, (height/2)-95, 310, 230);
}
