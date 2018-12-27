var Grass = require("./class.grass");
var GrassEater = require("./class.grasseater");
var Predator = require("./class.predator");
var Fish = require("./class.fish");

Grass.born = 0;
Grass.dead = 0;
Grass.current = 0;

GrassEater.born = 0;
GrassEater.dead = 0;
GrassEater.current = 0;

Predator.born = 0;
Predator.dead = 0;
Predator.current = 0;

Fish.born = 0;
Fish.dead = 0;
Fish.current = 0;

var matrix = [];
var n = 50;
var m = 50;
var arr = [];
var dzukQanak = 25;

for (var y = 0; y < n; y++) {
    matrix[y] = [];
    for (var x = 0; x < m; x++) {
        matrix[y][x] = random([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 3]);
        if (x + y >= n - 4 && x + y <= n + 2) {
            matrix[y][x] = 4;
            arr.push([x, y]);
        }
    }
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

while (dzukQanak > 0) {
    var kord = random(arr);
    var x = kord[0];
    var y = kord[1];
    matrix[y][x] = 5;
    dzukQanak--;
}

for (var y = 0; y < matrix.length; y++) {
    for (var x = 0; x < matrix[y].length; x++) {
        if (matrix[y][x] == 1) {
            matrix[y][x] = new Grass(x, y, 1);
            Grass.born++;
            Grass.current++;
        }
        if (matrix[y][x] == 2) {
            matrix[y][x] = new GrassEater(x, y, 2);
            GrassEater.born++;
            GrassEater.current++;
        }
        if (matrix[y][x] == 3) {
            matrix[y][x] = new Predator(x, y, 3);
            Predator.born++;
            Predator.current++;
        }
        if (matrix[y][x] == 5) {
            matrix[y][x] = new Fish(x, y, 5);
            Fish.born++;
            Fish.current++;
        }
    }
}
module.exports = matrix;