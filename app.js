var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("./public"));
app.get('/', function (req, res) {
	res.redirect('index.html');
});


var Grass = require("./moduls/class.grass");
var GrassEater = require("./moduls/class.grasseater");
var Predator = require("./moduls/class.predator");
var Fish = require("./moduls/class.fish");

server.listen(3000);


io.on("connection", function (socket) {
	socket.emit("send matrix", matrix);
	socket.on("takt", function (tkt) {
		takt = tkt;
	});
	setInterval(function () {

		for (var y = 0; y < matrix.length; y++) {
			for (var x = 0; x < matrix[y].length; x++) {
				//Grass verj
				if (matrix[y][x].index == 1) {
					if (takt <= 50) {
						matrix[y][x].mul(matrix);
						stat.Grass.born++;
					}
					if (takt == 100) {
						takt = 0;
					}
				}
				//Predator
				else if (matrix[y][x].index == 3) {
					if (takt <= 50) {
						matrix[y][x].eat(matrix);
						stat.Predator.born++;
					}
					else if (takt > 50){
						matrix[y][x].moveWinter(matrix);
						if (takt == 100) {
							takt = 0;
						}
					}

				}

				
				//GrassEater
				else if (matrix[y][x].index == 2) {
					if (takt <= 50) {
						matrix[y][x].eat(matrix);
						stat.GrassEater.born++;
					}
					else if (takt > 50){
						matrix[y][x].eatWinter(matrix);
						if (takt == 100) {
							takt = 0;
						}
					}

				}
				//Fish verj
				else if (matrix[y][x].index == 5) {
					if (takt <= 50) {
						matrix[y][x].eat(matrix);
						stat.Fish.born++;
					}
					if (takt == 100) {
						takt = 0;
					}
				}
			}
		}
		socket.emit("redraw", matrix);
		takt += 10;
	}, time);


	//Current statistics
	setInterval(function () {
		stat = {
			"Grass": {
				"born": Grass.born,
				"dead": Grass.dead,
				"current": Grass.current
			},
			"GrassEater": {
				"born": GrassEater.born,
				"dead": GrassEater.dead,
				"current": GrassEater.current
			},
			"Predator": {
				"born": Predator.born,
				"dead": Predator.dead,
				"current": Predator.current
			},
			"Fish": {
				"born": Fish.born,
				"dead": Fish.dead,
				"current": Fish.current
			}
		};
		var file = "statistika.json";
		var statJSON = JSON.stringify(stat);
		fs.writeFileSync(file, statJSON);

		socket.emit("stats", stat);
	}, 1000);
});

var matrix = require("./moduls/matrix");

var stat = {
	"Grass": {
		"born": 0,
		"dead": 0,
		"current": 0
	},
	"GrassEater": {
		"born": 0,
		"dead": 0,
		"current": 0
	},
	"Predator": {
		"born": 0,
		"dead": 0,
		"current": 0
	},
	"Fish": {
		"born": 0,
		"dead": 0,
		"current": 0
	}
};

var time = frameRate(1);
function frameRate(frameCount) {
	return 1000 / frameCount;
}