const text = "aca ama programa japones esponja fresa frase";
const palabras = text.split(" ");
const anagramas = [];

function agruparPorLongitud(palabras) {
  const gruposPorLength = {};

  palabras.forEach(palabra => {
    const longitud = palabra.length;
    if (!gruposPorLength[longitud]) {
      gruposPorLength[longitud] = [];
    }
    gruposPorLength[longitud].push(palabra);
  });

  return gruposPorLength;
}

function sonAnagramas(palabra1, palabra2) {
  const ordenada1 = palabra1.split('').sort().join('');
  const ordenada2 = palabra2.split('').sort().join('');
  return ordenada1 === ordenada2;
}

function buscarAnagramas(palabras) {
  const gruposPorLength = agruparPorLongitud(palabras);

  for (const longitud in gruposPorLength) {
    const palabrasEnLongitud = gruposPorLength[longitud];

    if (palabrasEnLongitud.length > 1) {
      for (let i = 0; i < palabrasEnLongitud.length - 1; i++) {
        for (let j = i + 1; j < palabrasEnLongitud.length; j++) {
          if (sonAnagramas(palabrasEnLongitud[i], palabrasEnLongitud[j])) {
            anagramas.push([palabrasEnLongitud[i], palabrasEnLongitud[j]]);
          }
        }
      }
    }
  }
}

buscarAnagramas(palabras);

console.log("Anagramas encontrados:");
console.log(anagramas);