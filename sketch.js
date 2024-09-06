/*
* The Game Project Part 6
* Scott Bertrand Porco
* Student number: 240273471
*/

/* Variable Initialization */
let gameChar_x;
let gameChar_y;
let floorPos_y;
let isLeft;
let	isRight;
let isFalling;
let isPlummeting;
let trees_x;
let treePos_y;
let clouds;
let mountains;
let collectables;
let cameraPosX = 0;
let characterWidth = 25;
let characterHeight = 40;
let canyons;
let game_score;
let game_lives;
let game_lost;
let flagPoll;
let button;
let isOnPlatform;
let platForms = [];
let enemies = [];
let enemiesDirection;

// Sounds
let jumpSound;
let fallDownCanyon;
let coinPickup
let levelFailed;
let levelWon;
let enemyContact;



function preload() {

	soundFormats('mp3', 'wav')

	//LOAD SOUNDS

		jumpSound = loadSound('assets/jump.wav');
		jumpSound.setVolume(0.1);

		//Fall - Rpg by colorsCrimsonTears -- https://freesound.org/s/566204/ -- License: Creative Commons 0
		fallDownCanyon = loadSound('assets/566204__colorscrimsontears__fall-rpg.wav');
		fallDownCanyon.setVolume(0.1);
		
		
		//coin07.mp3 by Taira Komori -- https://freesound.org/s/213422/ -- License: Attribution 4.0
		coinPickup = loadSound('assets/taira-komori__coin.mp3');
		coinPickup.setVolume(0.1);

		// Lose_C_08 by cabled_mess -- https://freesound.org/s/350980/ -- License: Creative Commons 0
		levelFailed = loadSound('assets/350980__cabled_mess__lose_c_08.wav');
		levelFailed.setVolume(0.1);

		// Level win.wav by Tuudurt -- https://freesound.org/s/258142/ -- License: Creative Commons 0
		levelWon = loadSound('assets/258142__tuudurt__level-win.wav');
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
		createPlatforms(325, floorPos_y - 125, 200),
		createPlatforms(525, floorPos_y - 255, 200),
	);

	enemies.push(
		new Enemy(840, floorPos_y-10, 100), 
		new Enemy(100, floorPos_y-10, 100) 
	);
}

function draw()
{
	cameraPosX = -gameChar_x+(width/2); //Set Cameras position
	background(100,155,255); //fill the sky blue
	noStroke();
	fill(0,155,0);
	rect(0, floorPos_y, width, height - floorPos_y); //draw some green ground

	// Get camera view moving
	push();
	translate(cameraPosX, 0);

	drawMountains();
	drawClouds();
	drawTrees();
	renderFlagPoll();
	checkFlagPole();

	for(let i = 0; i < platForms.length; i++){
		platForms[i].draw();
	}

	for (let i = 0; i < collectables.length; i++) { // loop through collectable for collectable placements
		if(!collectables[i].isFound){
			drawCollectable(collectables[i]);
			checkCollectable(collectables[i]);
		}
	}

	for (let i = 0; i < canyons.length; i++) {
		drawCanyon(canyons[i]);
		if (!isPlummeting && !isFalling){
			checkPlayerDie(canyons[i]);
		}
	}

	for(var i = 0; i < enemies.length; i++){
		enemies[i].draw();
		let isContact = enemies[i].checkContact(gameChar_x,gameChar_y);
		if(isContact)
		{
			if(game_lives > 0)
			{
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
	if(isLeft && isFalling) {
		characterIsJumpingLeft(gameChar_x, gameChar_y, characterWidth, characterHeight); //Coming from character.js file see index.html
	}
	else if(isRight && isFalling) {
		characterIsJumpingRight(gameChar_x, gameChar_y, characterWidth, characterHeight); //Coming from character.js file see index.html
	}
	else if(isLeft) {
		characterIsGoingLeft(gameChar_x, gameChar_y, characterWidth, characterHeight); //Coming from character.js file see index.html
	}
	else if(isRight) {
		characterIsGoingRight(gameChar_x, gameChar_y, characterWidth, characterHeight); //Coming from character.js file see index.html
	}
	else if(isFalling || isPlummeting) {
		characterIsPlummeting(gameChar_x, gameChar_y, characterWidth, characterHeight); //Coming from character.js file see index.html
	}
	else {
		characterIsStill(gameChar_x, gameChar_y, characterWidth, characterHeight); //Coming from character.js file see index.html
	}

	if(game_lives <= 0) {
		levelFailed.play();
		gameOver();
	}

	if(game_lives >= 0 && flagPoll.isReached){
		LevelComplete();
	}




	pop();
	fill(255);
	noStroke();


	fill('black');
	noStroke();
	text("Score: " + game_score, 20 , 20)
	text("Lives: " + deductLives(0), width - 75 , 20)



	///////////INTERACTION CODE//////////
	// Put conditional statements to move the game character below here
	// Learnt this in our module
	if(isLeft === true){
		gameChar_x -= 5;
	} else if(isRight === true){
		gameChar_x += 5;
	}

	if(gameChar_y < floorPos_y){
		isOnPlatform = false;
		for(let i = 0; i < platForms.length; i++) {
			if( platForms[i].checkContact(gameChar_x, gameChar_y) ) {
				isOnPlatform  = true;
				isFalling = false;
				isPlummeting = false;
				break;
			}
		}
		if(!isOnPlatform){
			gameChar_y += 5;
			isFalling = true;
		}
	} else {
		isFalling=false
	}

	if(isPlummeting && gameChar_y >= 1000){
		gameChar_y = 1000;
		isRight = false;
		isLeft = false;
	}

} // END DRAW LOOP


function deductLives(life) {
	if(life > 0){
		game_lives -= life;
	}
	console.log(game_lives);
	return game_lives
}


function keyPressed() {
	// if statements to control the animation of the character when
	// keys are pressed.
	// I added extra keys for jumping here, i.e. space bar & up arrow,
	if(!isPlummeting){
		if(keyCode === 37) { // Move left
			isLeft = true;
		} else if(keyCode === 39) { // Move Right
			isRight = true;
		} else if((keyCode === 87 || keyCode === 32 || keyCode === 38) && !isFalling) { //Jumping conditional
			jumpSound.play();
			gameChar_y -= 200;
		}
	}
}
function keyReleased() {
	// if statements to control the animation of the character when
	// keys are released.
	if(!isPlummeting) {
		if (keyCode === 37) {
			isLeft = false;
		} else if (keyCode === 39) {
			isRight = false;
		}
	}
}
function drawClouds () {
	for(let i = 0; i < clouds.length; i++){ // Draw clouds in for-loop
		fill(255); // White color for the cloud
		noStroke(); // No outline for the cloud
		ellipse(clouds[i].x, clouds[i].y, clouds[i].size * 2); // Main circle of the cloud
		ellipse(clouds[i].x + clouds[i].size * 0.7, clouds[i].y - clouds[i].size * 0.5, clouds[i].size * 1.2); // Upper right circle of the cloud
		ellipse(clouds[i].x - clouds[i].size * 0.7, clouds[i].y - clouds[i].size * 0.5, clouds[i].size * 1.2); // Upper left circle of the cloud
		ellipse(clouds[i].x + clouds[i].size * 1.2, clouds[i].y, clouds[i].size * 1.2); // Right circle of the cloud
		ellipse(clouds[i].x - clouds[i].size * 1.2, clouds[i].y, clouds[i].size * 1.2); // Left circle of the cloud
	}
}
function drawCollectable(t_collectable){
		if (t_collectable.isFound === false) {
			fill(255, 215, 0);
			ellipse(t_collectable.x_pos, t_collectable.y_pos, t_collectable.size, t_collectable.size);
			fill(255, 255, 255);
			ellipse(t_collectable.x_pos - 5, t_collectable.y_pos - 5, t_collectable.size * 0.16, t_collectable.size * 0.16);
			ellipse(t_collectable.x_pos + 5, t_collectable.y_pos + 5, t_collectable.size * 0.16, t_collectable.size * 0.16);
		}

}
function checkCollectable(t_collectable) {
	if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size) {
		t_collectable.isFound = true;
		game_score+=1;
		coinPickup.play();
	}
}
function drawMountains(){
	for(let i = 0; i < mountains.length; i++) { // Draw mountain in for-loop
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
	for(let i=0; i < trees_x.length; i++){ // Trees in for-loop
		// Draw tree trunk
		fill(139, 69, 19); // Brown color for the trunk
		rect(200+trees_x[i], treePos_y, 40, 200); // Rectangle for the trunk

		// Draw tree leaves
		fill(34, 139, 34); // Green color for the leaves
		ellipse(220+trees_x[i], treePos_y, 250, 250); // Circle for the top part of the tree
		ellipse(170+trees_x[i], treePos_y, 250, 200); // Circle for the left part of the tree
		ellipse(270+trees_x[i], treePos_y, 250, 200); // Circle for the right part of the tree
		/** END code "personally wrote without assistance" **/

	}
}
function drawCanyon(t_canyon) {
		// Draw the t_canyon
		fill(61, 58, 55);
		rect(t_canyon.x_pos, t_canyon.y_pos, t_canyon.width, t_canyon.height);

		// Fire lava at the bottom of the pit
		fill(255, 102, 0);
		rect(t_canyon.x_pos, t_canyon.y_pos + t_canyon.height - 15, t_canyon.width, 10);

}
function checkPlayerDie(t_canyon) {
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

function gameOver(){
		fill(200);
		rectMode(CENTER);
		rect(gameChar_x, height/2, 250, 150);
		fill('black');
		noStroke();
		textAlign(CENTER);
		text('YOU LOOSE', gameChar_x, height/2 );

		button.show();
		button.html('Restart Level?')
		button.position(width/2-45, height/2+20);
	
		button.mousePressed(()=>{
			startGame();
			levelFailed.stop();
		})
}

let LevelComplete = () => {
	fill('green');
	rectMode(CENTER);
	rect(gameChar_x, height/2, 250, 150);

	fill('white');
	noStroke();
	textAlign(CENTER);
	text('You beat the level with: ' + game_score + ' coins', gameChar_x, height/2 );

	button.show();
	button.html('Play Again?')
	button.position(width/2-45, height/2+20);
	button.mousePressed(()=>{
		startGame();
	})
}


function renderFlagPoll() {
	push();
	strokeWeight(5);
	stroke(180);
	line(flagPoll.x_pos, floorPos_y, flagPoll.x_pos, floorPos_y-250);
	fill(255,0,255);
	noStroke();
	if(flagPoll.isReached){
		rect(flagPoll.x_pos, floorPos_y - 250, 100, 50);
	} else {
		rect(flagPoll.x_pos, floorPos_y - 50, 100, 50);
	}
	pop();
}

function checkFlagPole(){
	const d = abs(gameChar_x - flagPoll.x_pos);
	if(d < 15) {
		levelWon.play();
		flagPoll.isReached = true;
	}
}

function tryAgain() {
	deductLives(1);

	setTimeout(()=>{

	floorPos_y = height * 3/4;
	gameChar_x = width/2;
	gameChar_y = floorPos_y;
	game_lost = false;
	isPlummeting = false;
	button.hide();

		loop();
	}, 1500)

}

function startGame() {
	floorPos_y = height * 3/4;
	gameChar_x = width/2;
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
		isReached:false,
		x_pos: 1500
	}

	button.hide();
}


function createPlatforms(x,y,length) {
 var p = {
	x: x,
	y: y,
	length: length,
	draw: function(){
		fill(255,0, 255);
		rect(this.x, this.y, this.length, 20);
	},
	checkContact: function(gc_X, gc_Y){
		if(gc_X > this.x && gc_X < this.x + this.length){
			let d = this.y - gc_Y;
			if(d >= 0 && d < 50) {
				console.log("ON PLATFORM");
				return true;
			} else {
				return false;
			}
		}
	}
 }
 return p;
}

function Enemy(x, y, range) 
{
	this.x = x;
	this.y = y;
	this.range = range;
	this.currentX = x;
	this.inc = 1;

	this.update = function()
	{
		this.currentX += this.inc;

		if(this.currentX >= this.x + this.range)
		{
			this.inc = -1;
			enemiesDirection = 'left';

		} 
		else if(this.currentX < this.x )
		{
			this.inc = 1;
			enemiesDirection = 'right';
		}
	}

	this.draw = function() 
	{
		this.update();
		drawBat(this.currentX, this.y); // Draw the bat at the center
	}
	this.checkContact = function(gc_X, gc_Y)
	{
		let d = dist( gc_X, gc_Y, this.currentX, this.y )
		if(d<50) {
			return true;
		}
		return false;
	}
}


