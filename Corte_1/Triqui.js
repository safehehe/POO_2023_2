let quadrille;
let player = 'O'


function setMarker(row, column, player) {
    quadrille.fill(row, column, player);
}

function check(matrix, row, column, player) {
    if (matrix[row].every((c) => (c == player))) {
        return true
    }
    if (matrix.every((c) => (c[column] == player))) {
        return true
    }

    if (matrix.every((c, i) => (c[2 - i] == player))) {
        return true
    }
    if (matrix.every((c, i) => (c[i] == player))) {
        return true
    }
}

function setup() {
    createCanvas(300, 300);
    quadrille = createQuadrille(3, 3);
}

function draw() {
    background('black');
    drawQuadrille(quadrille);

}

function mouseClicked() {
    const row = quadrille.mouseRow;
    const column = quadrille.mouseCol



    if (quadrille.isEmpty(row, column)) {
        setMarker(row, column, player);
        // check cells
    }
    const matrix = quadrille.memory2D
    if (matrix.flat().every((c) => (c !== null))) {
        quadrille = null;
        p = createP('No winner')
        p.style('font-size', '16px');
        p.position(10, 10);
        p.style('color', 'white');
    }
    if (check(matrix, row, column, player)) {
        quadrille = null;
        p = createP('Winner: ' + player)
        p.style('font-size', '16px');
        p.position(10, 10);
        p.style('color', 'white');

    } else {
        player = player == 'O' ? 'X' : 'O'
    }
}
