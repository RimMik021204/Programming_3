var LivingCreature = require("./class.livingcreature");
module.exports = class GrassEater extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 12;
        this.directions = [];
        this.acted = false;
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    chooseCell(num, direct, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(num, direct, matrix);
    }

    moveWinter(matrix) {
        var newCell = random(this.chooseCell(4, this.directions, matrix));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.acted = true;
                this.energy--;
            }
        }
        else this.acted = false;
    }

    move(matrix) {
        var newCell = random(this.chooseCell(0, this.directions, matrix));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.acted = true;
                this.energy--;
                if (this.energy <= 0) {
                    this.die(matrix);
                }
            }
        }
        else this.acted = false;
    }

    eat(matrix) {
        var newCell = random(this.chooseCell(1, this.directions, matrix));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX].die(matrix);
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = newX;
                this.y = newY;
                this.energy++;
                this.acted = true;
                if (this.energy >= 8) {
                    this.mul(matrix);
                }
            }
            else this.move(matrix);
        }
        else this.acted = false;
    }

    eatWinter(matrix) {
        var newCell = random(this.chooseCell(5, this.directions, matrix));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX].die(matrix);
                matrix[newY][newX] = 4;
                this.acted = true;
            }
            else this.move(matrix);
        }
        else this.acted = false;
    }

    mul(matrix) {
        var newCell = random(this.chooseCell(0, this.directions, matrix));
        if (newCell && this.energy >= 0) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new GrassEater(newX, newY, 2);
            GrassEater.born++;
            GrassEater.current++;
        }
    }

    die(matrix) {
        this.dieCounter();
        matrix[this.y][this.x] = 0;
    }

    dieCounter() {
        GrassEater.dead++;
        GrassEater.current--;
    }
}

function random(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}