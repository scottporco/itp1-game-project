/*
* The Game Project Part 6
* Scott Bertrand Porco
* Student number: 240273471
*/

/* Variable Initialization */
var gameChar_x;
var gameChar_y;
var floorPos_y;
var isLeft;
var isRight;
var isFalling;
var isPlummeting;
var trees_x;
var treePos_y;
var clouds;
var mountains;
var collectables;

var cameraPosX = 0;
var characterWidth = 25;
var characterHeight = 40;
var canyons = [];
var game_score;
var game_lives;
var game_lost;
var flagPoll;
var button;
var isOnPlatform;

var platForms = [];
var enemies = [];

// Sounds
var jumpSound;
var fallDownCanyon;
var coinPickup
var levelFailed;
var levelWon;
var enemyContact;



function preload() {

	soundFormats('mp3', 'wav')

	//LOAD SOUNDS

	jumpSound = loadSound('assets/jump.wav');
	jumpSound.setVolume(0.1);

	//Retro short fall by MaoDin204 -- https://freesound.org/s/717685/ -- License: Creative Commons 0
	fallDownCanyon = loadSound('assets/717685__maodin204__retro-short-fall.wav');
	fallDownCanyon.setVolume(0.1);


	//coin07.mp3 by Taira Komori -- https://freesound.org/s/213422/ -- License: Attribution 4.0
	coinPickup = loadSound('assets/taira-komori__coin.mp3');
	coinPickup.setVolume(0.1);

	// LushLife_GameOver.wav by SimonBay -- https://freesound.org/s/439890/ -- License: Attribution 3.0
	levelFailed = loadSound('assets/439890__simonbay__lushlife_gameover.wav');
	levelFailed.setVolume(0.1);

	// advance next level pixel game by CogFireStudios -- https://freesound.org/s/676805/ -- License: Creative Commons 0
	levelWon = loadSound('assets/676805__cogfirestudios__advance-next-level-pixel-game.wav');
	levelWon.setVolume(0.1);

	// Waka 2 by DominikBraun -- https://freesound.org/s/483505/ -- License: Attribution 4.0
	enemyContact = loadSound('assets/483505__dominikbraun__waka-2.mp3');
	enemyContact.setVolume(0.1);

}



function setup() {
	/* Set up section */
	createCanvas(1024, 576);
	button = createButton();
	startGame();


	platForms.push(
		createPlatforms(100, floorPos_y - 80, 200),
		createPlatforms(325, floorPos_y - 160, 200),
		createPlatforms(525, floorPos_y - 240, 200),
		createPlatforms(875, floorPos_y - 310, 400),
		createPlatforms(1100, floorPos_y - 75, 150),
		createPlatforms(1285, floorPos_y - 100, 75),
		createPlatforms(1270, floorPos_y - 200, 75),
		createPlatforms(1270, floorPos_y - 200, 75),

		createPlatforms(2800, floorPos_y - 100, 105),
		createPlatforms(2800, floorPos_y - 200, 105),
	);

	canyons.push(
		createCanyons({ x_pos: 150, y_pos: 432, width: random(75, 90), height: 150, }),
		createCanyons({ x_pos: 150, y_pos: 432, width: random(75, 90), height: 150, }),
		createCanyons({ x_pos: 650, y_pos: 432, width: random(75, 90), height: 150, }),
		createCanyons({ x_pos: 1500, y_pos: 432, width: random(75, 90), height: 150 }),
		createCanyons({ x_pos: 2200, y_pos: 432, width: random(75, 90), height: 150 }),

	)

	enemies.push(
		new Enemy(850, floorPos_y - 100, 100, true),
		new Enemy(875, floorPos_y - 330, 400, false),
		new Enemy(1100, floorPos_y - 10, 150, false),
		new Enemy(1800, floorPos_y + 15, 25, false),
		new Enemy(1800, floorPos_y - 200, 20, false),
		new Enemy(1950, floorPos_y - 200, 300, true),
		new Enemy(2300, floorPos_y - 200, 500, false),
		new Enemy(2300, floorPos_y - 100, 500, false),
		new Enemy(2500, floorPos_y - 5, 300, false),
	);
}

function draw() {
	cameraPosX = -gameChar_x + (width / 2); //Set Cameras position

	background(100, 155, 255); //fill the sky blue

	noStroke();
	fill(0, 155, 0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw green ground

	// Get camera view moving
	push();
	translate(cameraPosX, 0);

	drawMountains();
	drawClouds();
	drawTrees();
	renderFlagPoll();
	checkFlagPole();

	for (var i = 0; i < platForms.length; i++) {
		platForms[i].draw();
	}

	for (var i = 0; i < collectables.length; i++) { // loop through collectable for collectable placements
		if (!collectables[i].isFound) {
			var collectable = new Collectable(collectables[i]);
			collectable.draw();
			collectable.checkCollectable();
		}
	}

	for (var i = 0; i < canyons.length; i++) {
		canyons[i].draw();
		if (!isPlummeting && !isFalling) {
			canyons[i].checkContact();
		}
	}

	for (var i = 0; i < enemies.length; i++) {
		enemies[i].draw();
		var isContact = enemies[i].checkContact(gameChar_x, gameChar_y);
		if (isContact) {
			if (game_lives > 0) {
				enemyContact.play();
				isPlummeting = true;
				gameChar_y += 300;
				noLoop();
				tryAgain(); // restart game,
				break;
			}
		}
	}

	//the game character
	//Coming from character.js file see index.html
	if (isLeft && isFalling) {
		characterIsJumpingLeft(gameChar_x, gameChar_y, characterWidth, characterHeight);
	}
	else if (isRight && isFalling) {
		characterIsJumpingRight(gameChar_x, gameChar_y, characterWidth, characterHeight);
	}
	else if (isLeft) {
		characterIsGoingLeft(gameChar_x, gameChar_y, characterWidth, characterHeight);
	}
	else if (isRight) {
		characterIsGoingRight(gameChar_x, gameChar_y, characterWidth, characterHeight);
	}
	else if (isFalling || isPlummeting) {
		characterIsPlummeting(gameChar_x, gameChar_y, characterWidth, characterHeight);
	}
	else {
		characterIsStill(gameChar_x, gameChar_y, characterWidth, characterHeight);
	}

	pop();
	fill(255);
	noStroke();

	fill('black');
	noStroke();
	text("Score: " + game_score + "/" + collectables.length, 20, 20)
	text("Lives: " + deductLives(0) + "/3", width - 75, 20)


	///////////INTERACTION CODE//////////
	// Put conditional statements to move the game character below here
	// Learnt this in our module
	if (isLeft === true) {
		gameChar_x -= 5;
	} else if (isRight === true) {
		gameChar_x += 5;
	}

	if (gameChar_y < floorPos_y) {
		isOnPlatform = false;
		for (var i = 0; i < platForms.length; i++) {
			if (platForms[i].checkContact(gameChar_x, gameChar_y)) {
				isOnPlatform = true;
				isFalling = false;
				isPlummeting = false;
				break;
			}
		}
		if (!isOnPlatform) {
			gameChar_y += 5;
			isFalling = true;
		}
	} else {
		isFalling = false
	}

	if (isPlummeting && gameChar_y >= 1000) {
		gameChar_y = 1000;
		isRight = false;
		isLeft = false;
	}

	if (flagPoll.isReached) {
		levelComplete(); //WIN GAME 	
	}

	if(game_lives <= 0) {
		gameOver(); //END GAME
	}

	

} // END DRAW LOOP


function deductLives(life) {
	if (life > 0) {
		game_lives -= life;
	}
	return game_lives
}


function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.
	// I added extra keys for jumping here, i.e. space bar & up arrow,
	if (!isPlummeting) {
		if (keyCode === 37) { // Move left
			isLeft = true;
		} else if (keyCode === 39) { // Move Right
			isRight = true;
		} else if ((keyCode === 87 || keyCode === 32 || keyCode === 38) && !isFalling) { //Jumping conditional
			jumpSound.play();
			gameChar_y -= 150;
		}
	}
}
function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.
	if (!isPlummeting) {
		if (keyCode === 37) {
			isLeft = false;
		} else if (keyCode === 39) {
			isRight = false;
		}
	}
}
function drawClouds() {
	for (var i = 0; i < clouds.length; i++) { // Draw clouds in for-loop
		fill(255); // White color for the cloud
		noStroke(); // No outline for the cloud
		ellipse(clouds[i].x, clouds[i].y, clouds[i].size * 2); // Main circle of the cloud
		ellipse(clouds[i].x + clouds[i].size * 0.7, clouds[i].y - clouds[i].size * 0.5, clouds[i].size * 1.2); // Upper right circle of the cloud
		ellipse(clouds[i].x - clouds[i].size * 0.7, clouds[i].y - clouds[i].size * 0.5, clouds[i].size * 1.2); // Upper left circle of the cloud
		ellipse(clouds[i].x + clouds[i].size * 1.2, clouds[i].y, clouds[i].size * 1.2); // Right circle of the cloud
		ellipse(clouds[i].x - clouds[i].size * 1.2, clouds[i].y, clouds[i].size * 1.2); // Left circle of the cloud
	}
}

function drawMountains() {
	for (var i = 0; i < mountains.length; i++) { // Draw mountain in for-loop
		fill(110, 110, 110);
		triangle(
			mountains[i].x,
			mountains[i].y,
			mountains[i].x2,
			mountains[i].y2,
			mountains[i].x3,
			mountains[i].y2
		);
		fill(255); // Draw snow on the peak
		triangle(
			mountains[i].snowCord1X,
			mountains[i].snowCord1Y,
			mountains[i].snowCord2X,
			mountains[i].snowCord2Y,
			mountains[i].snowCord3X,
			mountains[i].snowCord3Y
		);

	}
}
function drawTrees() {
	for (var i = 0; i < trees_x.length; i++) { // Trees in for-loop
		// Draw tree trunk
		fill(139, 69, 19); // Brown color for the trunk
		rect(200 + trees_x[i], treePos_y, 40, 200); // Rectangle for the trunk

		// Draw tree leaves
		fill(34, 139, 34); // Green color for the leaves
		ellipse(220 + trees_x[i], treePos_y, 250, 250); // Circle for the top part of the tree
		ellipse(170 + trees_x[i], treePos_y, 250, 200); // Circle for the left part of the tree
		ellipse(270 + trees_x[i], treePos_y, 250, 200); // Circle for the right part of the tree
		/** END code "personally wrote without assistance" **/
	}
}

function gameOver() {
	push();
	fill(0, 180);  // black with 50% transparency
	rect(0, 0, width, height);

	// CREATE MODAL BOX WITH INSTRUCTIONS
	fill(136, 8, 8);
	rectMode(CENTER);
	rect(width / 2 - 45, height / 2, 300, 150);
	fill(255, 255, 255);
	noStroke();
	textAlign(CENTER);
	text('GAME OVER! YOU LOOSE!', width / 2 - 45, height / 2 - 10);
	button.show();
	button.html('Want to give this level another shot?')
	button.position(width / 2 - 160, height / 2 + 20);
	// PLAY LEVEL FAILED SOUND
	if (!levelFailed._playing) {
		levelFailed.play();
	}

	// KILL DRAW LOOP
	noLoop();

	// IF BUTTON IS PRESSED RESTART GAME
	button.mousePressed(() => {
		startGame();
		loop();
	})
	pop();
}

function levelComplete() {
	push();
	fill(0, 180);  // black with 50% transparency
	rect(0, 0, width, height);

	stroke(255, 255, 255);
	strokeWeight(4);
	fill('green');
	rectMode(CENTER);
	rect(width / 2 - 45, height / 2, 300, 200);

	fill('white');
	noStroke();
	textAlign(CENTER);

	text('Success You Beat the Level', width / 2 - 45, height / 2 - 40);
	text('You collected: ' + game_score + ' coins and have ' + game_lives + " remaining", width / 2 - 45, height / 2 - 20);
	text('Your game score is : ' + round((game_score / 10) * 100) + ' percent', width / 2 - 45, height / 2);

	button.show();
	button.html('Play Again?')
	button.position(width / 2 - 88, height / 2 + 20);

	button.mousePressed(function () {
		startGame();
		loop();
	})
	pop();

	setTimeout(function () {
		noLoop();
		if (!levelWon._playing) {
			levelWon.play();
		}
	}, 750)


}


function renderFlagPoll() {
	push();
	strokeWeight(5);
	stroke(180);
	line(flagPoll.x_pos, floorPos_y, flagPoll.x_pos, floorPos_y - 250);
	fill(255, 0, 255);
	noStroke();
	if (flagPoll.isReached) {
		rect(flagPoll.x_pos, floorPos_y - 250, 100, 50);
	} else {
		rect(flagPoll.x_pos, floorPos_y - 50, 100, 50);
	}

	pop();
}

function checkFlagPole() {
	const d = abs(gameChar_x - flagPoll.x_pos);
	if (d < 15) {
		flagPoll.isReached = true;
	}
}

function tryAgain() {
	deductLives(1);
	keyCode = '';
	isLeft = false;
	isRight = false;
	setTimeout(() => {
		floorPos_y = height * 3 / 4;
		gameChar_x = width / 2;
		gameChar_y = floorPos_y;
		game_lost = false;
		isPlummeting = false;
		button.hide();
		loop();
	}, 1500)
}

function startGame() {
	floorPos_y = height * 3 / 4;
	gameChar_x = width / 2;
	gameChar_y = floorPos_y;
	isLeft = false;
	isRight = false;
	isFalling = false;
	isPlummeting = false;
	getItems(); //Check gameItems.js file for all the map items.
	game_score = 0;
	game_lives = 3;
	game_lost = false;

	flagPoll = {
		isReached: false,
		x_pos: 3000
	}

	button.hide();
}


function createPlatforms(x, y, length) {  //factory pattern follwed in course
	var p = {
		x: x,
		y: y,
		length: length,
		draw: function () {
			fill(255, 0, 255);
			rect(this.x, this.y, this.length, 20);
		},
		checkContact: function (gc_X, gc_Y) {
			if (gc_X > this.x && gc_X < this.x + this.length) {

				var d = this.y - gc_Y - 50;

				if (d >= 0 && d < 5) {
					return true;
				} else {
					return false;
				}

			}
		}
	}
	return p;
}

function Enemy(x, y, range, incrementY = false) { //Capital E because it's a constructor
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentX = x;
	this.currentY = y;
	this.inc = 1;
	this.incrementY = incrementY;

	this.update = function () {
		if (!this.incrementY) {
			this.currentX += this.inc;

			if (this.currentX >= this.x + this.range) {
				this.inc = -1;
			}
			else if (this.currentX < this.x) {
				this.inc = 1;
			}
		} else {
			this.currentY += this.inc;
			if (this.currentY >= this.y + this.range) {
				this.inc = -1;
			}
			else if (this.currentY < this.y) {
				this.inc = 1;
			}
		}
	}

	this.draw = function () {
		this.update();

		drawBat(this.currentX, this.currentY); // Draw the bat at the center
	}
	this.checkContact = function (gc_X, gc_Y) {
		var d = dist(gc_X, gc_Y, this.currentX, this.currentY)
		if (d < 50) {
			return true;
		}
		return false;
	}
}


function Collectable(t_collectable) {  //Capital C because it's a constructor
	this.t_collectable = t_collectable;

	this.draw = function () {
		if (this.t_collectable.isFound === false) {
			fill(255, 215, 0);
			ellipse(this.t_collectable.x_pos, this.t_collectable.y_pos, this.t_collectable.size, this.t_collectable.size);
			fill(255, 255, 255);
			ellipse(this.t_collectable.x_pos - 5, this.t_collectable.y_pos - 5, this.t_collectable.size * 0.16, this.t_collectable.size * 0.16);
			ellipse(this.t_collectable.x_pos + 5, this.t_collectable.y_pos + 5, this.t_collectable.size * 0.16, this.t_collectable.size * 0.16);
		}
	}
	this.checkCollectable = function () {
		if (dist(gameChar_x, gameChar_y, this.t_collectable.x_pos, this.t_collectable.y_pos) < this.t_collectable.size + 10) {
			this.t_collectable.isFound = true;
			game_score += 1;
			coinPickup.play();
		}
	}
}

function createCanyons(t_canyon) {  //factory pattern
	var c = {
		t_canyon: t_canyon,
		draw: function () {
			// Draw the t_canyon
			fill(61, 58, 55);
			rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.height);

			// Fire lava at the bottom of the pit
			fill(255, 102, 0);
			rect(t_canyon.x_pos, t_canyon.y_pos + t_canyon.height - 15, t_canyon.width, 10);
		},
		checkContact: function () {
			if (gameChar_y >= 431 && (gameChar_x >= t_canyon.x_pos && gameChar_x <= t_canyon.x_pos + t_canyon.width)) {
				gameChar_y += 300;
				isPlummeting = true;
				if (isPlummeting) {
					if (game_lives > 0) {
						fallDownCanyon.play();
						noLoop();
						tryAgain(); // restart game
						return true;
					}
				}
			}
		}
	}
	return c;
}


