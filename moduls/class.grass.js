var LivingCreature = require("./class.livingcreature");

module.exports = class Grass extends LivingCreature{
    constructor(x, y, index) {
        super(x, y, index);

        this.directionsWater = [
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

    mul(matrix) {
        this.multiply++
        var newCell = random( this.chooseCell(0, this.directions, matrix) );
        var newCellWater = random(this.chooseCell(0, this.directionsWater, matrix));

        var cell4 = this.chooseCell(4, this.directionsWater, matrix)
        if (cell4.length > 0) { 
            if (newCellWater) {
                var newX = newCellWater[0];
                var newY = newCellWater[1];
                matrix[newY][newX] = new Grass(newX, newY, 1);
                this.multiply = 0;
                Grass.born++;
                Grass.current++;
            }
        }
        else {
            if (newCell && this.multiply >= 8) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = new Grass(newX, newY, 1);
                this.multiply = 0;
                Grass.born++;
                Grass.current++;
            }
        }

    }

    die(){
        Grass.dead++;
        Grass.current--;
    }
}

function random(arr)
{
    var randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}

