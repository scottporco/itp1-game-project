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
		createPlatforms(-200, floorPos_y - 80, 200),
		
		createPlatforms(100, floorPos_y - 80, 200),
		createPlatforms(325, floorPos_y - 160, 200),
		createPlatforms(525, floorPos_y - 240, 200),
		createPlatforms(1100, floorPos_y - 75, 75),
		createPlatforms(1285, floorPos_y - 100, 75),

	);

	enemies.push(
		new Enemy(90, floorPos_y+15, 50),
		new Enemy(800, floorPos_y+15, 100), 
		new Enemy(1000, floorPos_y+15, 200),
		new Enemy(1290, floorPos_y+15, 200) 
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
			if(game_lives > 1)
			{
				enemyContact.play();
				isPlummeting = true;
				gameChar_y += 300;
				noLoop(); 
				tryAgain(); // restart game,
				break;
			}else {
				gameOver(); // trigger game over modal
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
			gameChar_y -= 150;
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
	if (dist(gameChar_x, gameChar_y, t_collectable.x_pos, t_collectable.y_pos) < t_collectable.size+10) {
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
			if (game_lives > 1) {
				fallDownCanyon.play();
				noLoop(); 
				tryAgain(); // restart game
				return true;
			} else{
				gameOver(); // trigger game over modal
			}
		}
	}
}

function gameOver(){
		noLoop();
		// CREATE MODAL BOX WITH INSTRUCTIONS
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
		// PLAY LEVEL FAILED SOUND
		// KILL DRAW LOOP
		levelFailed.play();
		
		// IF BUTTON IS PRESSED RESTART GAME
		button.mousePressed(()=>{
			startGame();
			loop();
		})
}

let LevelComplete = () => {

	noLoop();
	levelWon.play();

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
		loop();
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
		flagPoll.isReached = true;
	}
}

function tryAgain() {
	deductLives(1);
	keyCode = '';
	isLeft=false;
	isRight=false;
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
		x_pos: 3000
	}

	button.hide();
}


function createPlatforms(x,y,length) 
{
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
				
				let d = this.y - gc_Y-50;
				
				if(d >= 0 && d < 5) {
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

		} 
		else if(this.currentX < this.x )
		{
			this.inc = 1;
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


