let quadrille, s, b;
let img, boxi, spot, obstacle;
let sX, sY;  // Coordenadas del muñeco
let boxiX, boxiY; // Coordenadas de la caja
let aX,aY;
let p;
let mode;

function preload() {
  img = loadImage('https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/1998751/green-hat-moustache-character-clipart-sm.png');
  boxi = loadImage('https://is1-ssl.mzstatic.com/image/thumb/Purple126/v4/67/d1/85/67d18508-f5be-0de1-750b-67476603606c/AppIcon-0-0-1x_U007emarketing-0-0-0-7-0-0-sRGB-0-0-0-GLES2_U002c0-512MB-85-220-0-0.png/1024x1024.jpg');
  spot = loadImage('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Red_X.svg/1200px-Red_X.svg.png');
}

function setup() {
  createCanvas(5 * Quadrille.CELL_LENGTH, 5 * Quadrille.CELL_LENGTH);
  quadrille = createQuadrille(5, 5);
  
  a= createQuadrille(1,1, spot);
  resetCuadrillaA();
  
  b = createQuadrille(1, 1, boxi);
  bX = 2 // Posición inicial x de la caja en la cuadrícula grande
  bY = 1// Posición inicial y de la caja en la cuadrícula grande
  bX1=1;
  bY1=2;
  bX2=3;  
  bY2=3;  
  
  s = createQuadrille(1, 1, img);
  sX = 0; // Posición inicial x del muñeco en la cuadrícula grande
  sY = 1; // Posición inicial y del muñeco en la cuadrícula grande
  
  obstacle=createQuadrille(1,1, color(' black'));
    
  
  mode = createSelect();
  mode.option('Nivel 1');
  mode.option('Nivel 2');
  mode.selected('Nivel 1');
}

function resetCuadrillaA() {
  aX = floor(random(5));  // Valor aleatorio entre 0 y 5 para las columnas
  aY = floor(random(5));  // Valor aleatorio entre 0 y 5 para las filas

}

function draw() {
  background("#7DE7B9");
  drawQuadrille(quadrille);
  
  switch(mode.value()) {
    case 'Nivel 1':    
  drawQuadrille(s, { x: sX*Quadrille.CELL_LENGTH, y: sY*Quadrille.CELL_LENGTH});
  drawQuadrille(a, { x: aX * Quadrille.CELL_LENGTH, y: aY * Quadrille.CELL_LENGTH });  
  drawQuadrille(b, { x: bX*Quadrille.CELL_LENGTH, y: bY*Quadrille.CELL_LENGTH});
   break;   
    
     case 'Nivel 2':  
  drawQuadrille(s, { x: sX*Quadrille.CELL_LENGTH, y: sY*Quadrille.CELL_LENGTH});    
      
  drawQuadrille(obstacle, {x: 1 * Quadrille.CELL_LENGTH, y: 4 * Quadrille.CELL_LENGTH});  
  drawQuadrille(obstacle, {x: 1 * Quadrille.CELL_LENGTH, y: 0 * Quadrille.CELL_LENGTH}); 
  drawQuadrille(obstacle, {x: 2 * Quadrille.CELL_LENGTH, y: 0 * Quadrille.CELL_LENGTH}); 
  drawQuadrille(obstacle, {x: 3 * Quadrille.CELL_LENGTH, y: 4 * Quadrille.CELL_LENGTH});  
  drawQuadrille(obstacle, {x: 2 * Quadrille.CELL_LENGTH, y: 4 * Quadrille.CELL_LENGTH}); 
  drawQuadrille(obstacle, {x: 3 * Quadrille.CELL_LENGTH, y: 0 * Quadrille.CELL_LENGTH});
      
  drawQuadrille(a, { x: 2 * Quadrille.CELL_LENGTH, y: 2* Quadrille.CELL_LENGTH });  
  drawQuadrille(a, { x: 1 * Quadrille.CELL_LENGTH, y: 1 * Quadrille.CELL_LENGTH });  
  drawQuadrille(a, { x: 2 * Quadrille.CELL_LENGTH, y: 3 * Quadrille.CELL_LENGTH });  
      
  drawQuadrille(b, { x: bX1*Quadrille.CELL_LENGTH, y: bY1*Quadrille.CELL_LENGTH}); 
  drawQuadrille(b, { x: bX*Quadrille.CELL_LENGTH, y: bY*Quadrille.CELL_LENGTH});
  drawQuadrille(b, { x: bX2*Quadrille.CELL_LENGTH, y: bY2*Quadrille.CELL_LENGTH});    
      break;
    }
}

function keyPressed() {
  // Calcula las nuevas coordenadas del muñeco
  let newSX = sX;
  let newSY = sY;
  
  if (keyCode === LEFT_ARROW && sX > 0) {
    newSX = sX - 1;
  }  
  if (keyCode === RIGHT_ARROW && sX < 4) {
    newSX = sX + 1;
  } 
  
  switch(mode.value()) {
    case 'Nivel 1':
  if (keyCode === UP_ARROW && sY > 0) {
    newSY = sY - 1;
  } 
  if (keyCode === DOWN_ARROW && sY < 4) {
    newSY = sY + 1;
  }
// Verifica si las nuevas coordenadas del muñeco y la caja son iguales      
 if (newSX === bX && newSY === bY) {
    // Realiza el movimiento de la caja en la misma dirección que el muñeco
    if (keyCode === LEFT_ARROW && bX > 0) {
      bX = bX - 1;
    }  
    if (keyCode === RIGHT_ARROW && bX < 4) {
      bX = bX + 1;
    } 
    if (keyCode === UP_ARROW && bY > 0) {
      bY = bY - 1;
    } 
    if (keyCode === DOWN_ARROW && bY < 4) {
      bY = bY + 1;
    }
  } 
      
 if(aX===bX && aY===bY) {
    console.log("you win")
    quadrille = null;
    p = createP('You Win')
    p.style('font-size', '16px');
    p.position(10, 10);
    p.style('color', 'black');
  }
      break;
      
      
      case 'Nivel 2':  
  if (keyCode === UP_ARROW && sY > 1) {
    newSY = sY - 1;
  } 
  if (keyCode === DOWN_ARROW && sY < 3) {
    newSY = sY + 1;
  }     
// Verifica si las nuevas coordenadas del muñeco y la caja son iguales
 
 if (newSX === bX && newSY === bY) {   
    // Realiza el movimiento de las cajas en la misma dirección que el muñeco
    if (keyCode === LEFT_ARROW && bX > 0) {
      bX = bX - 1;
    }  
    if (keyCode === RIGHT_ARROW && bX < 4) {
      bX = bX + 1;
    } 
    if (keyCode === UP_ARROW && bY > 1) {
      bY = bY - 1;
    } 
    if (keyCode === DOWN_ARROW && bY < 3) {
      bY = bY + 1;
    }
  } 
      
 else if(newSX===bX1 && newSY===bY1){
    if (keyCode === LEFT_ARROW && bX1 > 0) {
      bX1 = bX1 - 1;
    }  
    if (keyCode === RIGHT_ARROW && bX1 < 4) {
      bX1 = bX1 + 1;
    } 
    if (keyCode === UP_ARROW && bY1 > 0) {
      bY1 = bY1 - 1;
    } 
    if (keyCode === DOWN_ARROW && bY1 < 3) {
      bY1 = bY1 + 1;
    }
  }
 else if(newSX===bX2 && newSY===bY2){
    if (keyCode === LEFT_ARROW && bX2 > 0) {
      bX2 = bX2 - 1;
    }  
    if (keyCode === RIGHT_ARROW && bX2 < 4) {
      bX2 = bX2 + 1;
    } 
    if (keyCode === UP_ARROW && bY2 > 1) {
      bY2 = bY2 - 1;
    } 
    if (keyCode === DOWN_ARROW && bY2 < 3) {
      bY2 = bY2 + 1;
    }
  }
 const matrix = quadrille.memory2D
 checkConditions()    
     break; 
  }

// Realiza el movimiento del muñeco
sX = newSX;
sY = newSY;
}

function checkConditions() {
 if ( bX2===2 && bY2===3) {
    console.log("you win");
    quadrille = null;
    p = createP('You Win')
    p.style('font-size', '16px');
    p.position(10, 10);
    p.style('color', 'black');
  }
}
