//Dadas las pendientes, decir si dos rectas son paralelas, perpendiculares o ninguna de las anteriores
//Dado el punto de corte de cada recta con el eje y, calcular las ecuaciones de las mismas
const m1=2;
const m2=(-0.5);
const b1=3;
const b2=5;
function pendientes_ecuaciones (m1,m2,b1,b2){
    if (m1==m2){
        console.log ("Las dos rectas son paralelas");
    }
    else if (m1*m2===-1)
        console.log ("Las dos rectas son perpendiculares")
    else {
        console.log ("Las dos rectas no son paralelas ni perpendiculares")
    }
    //La ecuación de una recta es: y=mx+b
    console.log("La ecuación de la recta 1 es:" + `y=${m1}x+${b1}`)//string format javascript
    console.log("La ecuación de la recta 2 es:" + `y=${m1}x+${b2}`)
}
console.log (pendientes_ecuaciones(m1,m2,b1,b2))
