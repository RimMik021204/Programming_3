var LivingCreature = require("./class.livingcreature");
module.exports = class Fish extends LivingCreature {
    constructor(x, y, index) {
        super(x, y, index)
        this.energy = 30;
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

    mul(matrix) {
        this.energy++;
        var newCell = random(this.chooseCell(4, this.directions, matrix));
        if (newCell && this.energy >= 3) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = new Fish(newX, newY, 5);
            this.energy = 0;
            Fish.born++;
            Fish.current++;
        }
    }

    eat(matrix) {
        if (this.acted == false) {
            var newCell = random(this.chooseCell(2, this.directions, matrix));
            var newCell1 = random(this.chooseCell(3, this.directions, matrix));
            if (newCell1) {
                var newX = newCell1[0];
                var newY = newCell1[1];

                matrix[newY][newX].die(matrix);

                matrix[newY][newX] = 0;
                this.energy++;
                this.acted = true;
                if (this.energy >= 8) {
                    this.mul(matrix);
                    this.energy = 5;
                }
            }
            else if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];

                matrix[newY][newX].die(matrix);

                matrix[newY][newX] = 0;
                this.energy++;
                this.acted = true;
                if (this.energy >= 8) {
                    this.mul(matrix);
                    this.energy = 5;
                }
            }
            else {
                this.move(matrix);
            }

        }
        else this.acted = false;


    }


    move(matrix) {
        var newCell = random(this.chooseCell(4, this.directions, matrix));
        if (this.acted == false) {
            if (newCell) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 4;
                this.x = newX;
                this.y = newY;
                this.energy--;
                if (this.energy <= 0) {
                    this.die(matrix);
                }
                this.acted = true;
            }
        }
        else this.acted = false;

    }

    die(matrix) {
        this.dieCounter();
        matrix[this.y][this.x] = 4;
    }
    
    dieCounter(){
        Fish.dead++;
        Fish.current--;
    }

}

function random(arr) {
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}