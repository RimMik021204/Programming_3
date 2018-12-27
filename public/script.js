var matrix = [];
var socket;
var stat;
var takt = 0;
var side = 15;
var arr = [];
var dzukQanak = 25;
var img;

// function preload() {
// 	img = loadImage('../img/grass.jpeg');
//   }
function setup() {
	
	background('#acacac');
	frameRate(0);

	socket = io();

	socket.on("send matrix", function (mtx) {
		matrix = mtx;
		createCanvas(1500, 751);
		background('#acacac');
		redraw();

		socket.on("redraw", function (mtx) {
			matrix = mtx;
			redraw();
		});

		socket.on("stats", function (stats) {
			stat = stats;
		});

	});

	noLoop();

}

function draw() {
	background('#acacac');
	// image(img, 0, 0, 300, 300);
	for (var yCord = 100; yCord <= 600; yCord += 100) {
		for (var xCord = 100; xCord <= 600; xCord += 100) {
			line(1500, yCord, xCord, yCord)
		}
	}
	var yText = 0;
	for (var i in stat) {

		var xText = 0;

		if (i == "Grass") {
			fill("green")
		}
		else if (i == "GrassEater") {
			fill("yellow")
		}
		else if (i == "Predator") {
			fill("red")
		}
		else if (i == "Fish") {
			fill("blue")
		}
		else {
			fill("black")
		}
		textSize(25)
		text(i, 800, 250 + yText);
		for (var j in stat[i]) {
			text(stat[i][j], 1000 + xText, 250 + yText);
			xText += 180;
		}
		yText += 100;

	}

	textSize(35);
	fill("black");
	text('Game Of Life', 900, 50);
	line(950, 100, 950, 600);
	line(1125, 100, 1125, 600);
	line(1300, 100, 1300, 600);
	textSize(25);
	fill("black");
	text("Name", 800, 150);
	text("Born", 1000, 150);
	text("Dead", 1150, 150);
	text("Current", 1350, 150);


	for (var y = 0; y < matrix.length; y++) {
		for (var x = 0; x < matrix[y].length; x++) {
			if (matrix[y][x] == 0) {
				fill("#acacac");
				rect(x * side, y * side, side, side);
			}
			//grass verj
			else if (matrix[y][x].index == 1) {
				if (takt <= 50) {
					fill("green");
					rect(x * side, y * side, side, side);
				}
				else if (takt >= 51) {
					fill("white");
					rect(x * side, y * side, side, side);
					if (takt == 100) {
						takt = 0;
					}
				}

			}
			//grassEater
			else if (matrix[y][x].index == 2) {
				fill("yellow");
				rect(x * side, y * side, side, side);
			}
			//Predator
			else if (matrix[y][x].index == 3) {
				if (takt <= 50) {
					fill("red");
					rect(x * side, y * side, side, side);
				}
				else if (takt >= 51) {
					fill("#8B0000");
					rect(x * side, y * side, side, side);
					if (takt == 100) {
						takt = 0;
					}
				}
			}
			//get
			else if (matrix[y][x] == 4) {
				if (takt <= 50) {
					fill("#00b3b3");
					rect(x * side, y * side, side, side);
				}
				else if (takt >= 51) {
					fill("#00ffff");
					rect(x * side, y * side, side, side);
					if (takt == 100) {
						takt = 0;
					}
				}
			}
			//fish verj
			else if (matrix[y][x].index == 5) {
				if (takt <= 50) {
					fill("blue");
					rect(x * side, y * side, side, side);
				}
				else if (takt >= 51) {
					fill("#3333ff");
					rect(x * side, y * side, side, side);
					if (takt == 100) {
						takt = 0;
					}
				}
			}
		}
	}
	takt += 10;
	socket.emit("takt", takt);
}
