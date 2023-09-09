const text = "aca oso ana arañara apa ama salas ala programa";
const palabras = text.split(" ");
const palabrasInvertidas = [];

function invertir(palabra) {
  let palabraInvertida = "";
  for (let j = palabra.length - 1; j >= 0; j--) {
    palabraInvertida = palabraInvertida.concat(palabra.charAt(j));
  }
  return palabraInvertida;
}

for (let i = 0; i < palabras.length; i++) {
  const palabraOriginal = palabras[i];
  const palabraInvertida = invertir(palabraOriginal);
  if (palabraOriginal === palabraInvertida) {
    palabrasInvertidas.push(palabraOriginal);
  }
}
console.log("Listado de palíndromos en el texto: ", palabrasInvertidas);