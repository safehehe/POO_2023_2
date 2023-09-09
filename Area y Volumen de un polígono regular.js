let poligono = {
  lado: 20,
  n: 5,
};

poligono.perimetro = function () {
  return this.lado * this.n;
};

console.log("Perímetro del polígono:", poligono.perimetro());

poligono.area = function () {
  this.a = Math.PI / this.n; // Calcula this.a dentro de la función area
  let apotema = this.lado / (2 * Math.tan(this.a / 2));
  return (poligono.perimetro() * apotema) / 2;
};

console.log("Área del polígono:", poligono.area());

  
