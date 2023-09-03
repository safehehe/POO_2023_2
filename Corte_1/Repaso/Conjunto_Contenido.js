let c1 = [2,3,4,6,9,5, 385,702, 64];
let c2 = [4,5,7,19,406,278, 19, 85];
let c3 = [9,4,5,2,3];

function ord(c){
    c.sort();
}

function contenido(c1, c2) {
    //c1 contenido en c2
    ord(c1);
    ord(c2);
    let i = c1.length-1;
    while(c2.includes(c1[i]) && i>= 0){
        i -= 1;
    }
    return i===-1;
}