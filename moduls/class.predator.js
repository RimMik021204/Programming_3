var LivingCreature = require("./class.livingcreature");
module.exports = class Predator extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index);
        this.energy = 10;
        this.directions = [];
        this.acted = false;
    }
    getNewCoordinates() {
        this.directionsMul = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1],
            [this.x - 2, this.y - 2],
            [this.x - 1, this.y - 2],
            [this.x, this.y - 2],
            [this.x + 1, this.y - 2],
            [this.x + 2, this.y - 2],
            [this.x - 2, this.y - 1],
            [this.x + 2, this.y - 1],
            [this.x - 2, this.y],
            [this.x + 2, this.y],
            [this.x - 2, this.y + 1],
            [this.x + 2, this.y + 1],
            [this.x - 2, this.y + 2],
            [this.x - 1, this.y + 2],
            [this.x, this.y + 2],
            [this.x + 1, this.y + 2],
            [this.x + 2, this.y + 2],
        ];
    }

    chooseCell(num, direct, matrix) {
        this.getNewCoordinates();
        return super.chooseCell(num, direct, matrix);
    }

    mul(matrix) {
        this.energy++;
        var newCell = random(this.chooseCell(0, this.directionsMul, matrix));
        if (newCell && this.energy >= 11.1) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new Predator(newX, newY, 3);
            this.energy = 0;
            Predator.born++;
            Predator.current++;
        }
    }

    eat(matrix) {
        var newCell = random(this.chooseCell(2, this.directions, matrix));
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
                    this.energy = 8;
                }
            }
            else this.move(matrix);
        }
        else this.acted = false;
    }

    move(matrix) {
        var newCell = random(this.chooseCell(0, this.directionsMul, matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
        this.energy--;
        if (this.energy <= 0) {
            this.die(matrix);
        }
    }

    moveWinter(matrix) {
        var newCell = random(this.chooseCell(0, this.directionsMul, matrix));
        if (newCell) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = newX;
            this.y = newY;
        }
    }

    die(matrix) {
        this.dieCounter();
        matrix[this.y][this.x] = 0;
    }

    dieCounter() {
        Predator.dead++;
        Predator.current--;
    }
}

function random(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}