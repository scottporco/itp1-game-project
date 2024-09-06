characterIsStill = (gameChar_x, gameChar_y, characterWidth, characterHeight) => {
    fill(150, 0, 0);
    rect(gameChar_x, gameChar_y, characterWidth, characterHeight);

    // Head
    fill(255, 220, 177);
    rect(gameChar_x, gameChar_y - 10, 25, 15);

    // Hair
    fill(0); // Black hair
    beginShape();
    vertex(gameChar_x, gameChar_y - 10);
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x + 5, gameChar_y - 15);
    vertex(gameChar_x + 10, gameChar_y - 20);
    vertex(gameChar_x + 15, gameChar_y - 15);
    vertex(gameChar_x + 18, gameChar_y - 20);
    vertex(gameChar_x + 23, gameChar_y - 10);
    endShape(CLOSE);

    // Eyes
    fill(0);
    ellipse(gameChar_x + 8, gameChar_y - 5, 3, 3);
    ellipse(gameChar_x + 17, gameChar_y - 5, 3, 3);

    // Mouth
    fill(255, 0, 0);
    ellipse(gameChar_x + 12.5, gameChar_y + 2, 5, 2);

    // Arms with hands
    fill(255, 0, 0);
    rect(gameChar_x - 5, gameChar_y + 10, 5, 25); // Left arm
    rect(gameChar_x + characterWidth, gameChar_y + 10, 5, 25); // Right arm

    // Hands
    fill(255, 220, 177);
    ellipse(gameChar_x - 2.5, gameChar_y + 35, 10, 10); // Left hand
    ellipse(gameChar_x + characterWidth + 2.5, gameChar_y + 35, 10, 10); // Left hand

    // Legs
    fill(150, 0, 0);
    rect(gameChar_x + 5, gameChar_y + characterHeight, 5, 10);
    rect(gameChar_x + 15, gameChar_y + characterHeight, 5, 10);
}
characterIsGoingRight = (gameChar_x, gameChar_y, characterWidth, characterHeight) =>{
    fill(150, 0, 0);
    push();
    translate(gameChar_x + 5, gameChar_y + characterHeight); // Right leg position
    rotate(PI / 8); // Rotate the right leg
    rect(0, -9, 5, 20);
    pop();

    push();
    translate(gameChar_x + 15, gameChar_y + characterHeight); // Right leg position
    rotate(-PI / 8); // Rotate the right leg
    rect(0, -7, 5, 20);
    pop();

    // Arms with hands in walking right pose
    fill(255, 0, 0);
    push();
    translate(gameChar_x + characterWidth + 1, gameChar_y + 10); // Right arm position
    rotate(-PI / 1.1); // Rotate the right arm up
    rect(0, 0, 5, 25);
    pop();

    // Body
    fill(150, 0, 0);
    rect(gameChar_x, gameChar_y, characterWidth, characterHeight);

    // Head
    fill(255, 220, 177);
    rect(gameChar_x, gameChar_y - 10, 25, 15);

    // Hair
    fill(0); // Black hair
    beginShape();
    vertex(gameChar_x, gameChar_y - 10);
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x + 5, gameChar_y - 15);
    vertex(gameChar_x + 10, gameChar_y - 20);
    vertex(gameChar_x + 15, gameChar_y - 15);
    vertex(gameChar_x + 18, gameChar_y - 20);
    vertex(gameChar_x + 23, gameChar_y - 10);
    endShape(CLOSE);

    // Eyes
    fill(0);
    // ellipse(gameChar_x + 8, gameChar_y - 5, 3, 3);
    ellipse(gameChar_x + 17, gameChar_y - 5, 3, 3);

    // Mouth
    fill(255, 0, 0);
    ellipse(gameChar_x + 20, gameChar_y + 2, 10, 2);

    // Arms with hands in walking right pose
    fill(255, 0, 0);
    push();
    translate(gameChar_x + 10, gameChar_y + 18); // right arm position
    rotate(-PI / 6); // Rotate the right arm up
    rect(-10, -13, 5, 25);
    pop();

    // Hands
    fill(255, 220, 177);
    ellipse(gameChar_x + 31, gameChar_y - 15, 10, 10); // right hand

    fill(255, 220, 177);
    ellipse(gameChar_x + characterWidth - 14, gameChar_y + 35, 10, 10); // Right hand
}
characterIsGoingLeft = (gameChar_x, gameChar_y, characterWidth, characterHeight) => {
    fill(150, 0, 0);
    push();
    translate(gameChar_x + 5, gameChar_y + characterHeight); // Left leg position
    rotate(PI / 8); // Rotate the left leg
    rect(0, -9, 5, 20);
    pop();

    push();
    translate(gameChar_x + 15, gameChar_y + characterHeight); // Right leg position
    rotate(-PI / 8); // Rotate the right leg
    rect(0, -7, 5, 20);
    pop();

    // Arms with hands in walking left pose
    fill(255, 0, 0);
    push();
    translate(gameChar_x + 5, gameChar_y); // Left arm position
    rotate(-PI / 9); // Rotate the left arm up
    rect(-10, -13, 5, 25);
    pop();
    // Hands
    fill(255, 220, 177);
    ellipse(gameChar_x - 6, gameChar_y - 10, 10, 10); // Left hand

    // Body
    fill(150, 0, 0);
    rect(gameChar_x, gameChar_y, characterWidth, characterHeight);

    // Head
    fill(255, 220, 177);
    rect(gameChar_x, gameChar_y - 10, 25, 15);

    // Hair
    fill(0); // Black hair
    beginShape();
    vertex(gameChar_x, gameChar_y - 10);
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x + 5, gameChar_y - 15);
    vertex(gameChar_x + 10, gameChar_y - 20);
    vertex(gameChar_x + 15, gameChar_y - 15);
    vertex(gameChar_x + 18, gameChar_y - 20);
    vertex(gameChar_x + 23, gameChar_y - 10);
    endShape(CLOSE);

    // Eyes
    fill(0);
    ellipse(gameChar_x + 8, gameChar_y - 5, 3, 3);
    // ellipse(gameChar_x + 17, gameChar_y - 5, 3, 3);

    // Mouth
    fill(255, 0, 0);
    ellipse(gameChar_x + 6, gameChar_y + 2, 10, 2);

    // Arms with hands in walking left pose
    fill(255, 0, 0);
    push();
    translate(gameChar_x + characterWidth + 1, gameChar_y + 10); // Right arm position
    rotate(PI / 4); // Rotate the left arm up
    rect(0, 0, 5, 25);
    pop();

    fill(255, 220, 177);
    ellipse(gameChar_x + characterWidth - 15, gameChar_y + 30, 10, 10); // Right hand
}
characterIsJumpingRight=(gameChar_x, gameChar_y, characterWidth, characterHeight)=>{
    fill(150, 0, 0);
    push();
    translate(gameChar_x + 5, gameChar_y + characterHeight); // Left leg position
    rotate(PI / 8); // Rotate the left leg
    rect(0, -9, 5, 20);
    pop();

    push();
    translate(gameChar_x + 15, gameChar_y + characterHeight); // Right leg position
    rotate(PI / 9); // Rotate the right leg
    rect(0, -7, 5, 20);
    pop();

    // Arms with hands in jumping pose
    fill(255, 0, 0);
    push();
    translate(gameChar_x - 8, gameChar_y - 10); // Left arm position
    rotate(-PI / 11); // Rotate the left arm up
    rect(0, 0, 5, 25);
    pop();

    push();
    translate(gameChar_x + characterWidth + 1, gameChar_y - 10); // Right arm position
    rotate(PI / 11); // Rotate the right arm up
    rect(0, 0, 5, 25);
    pop();

    // Hands
    fill(255, 220, 177);
    ellipse(gameChar_x - 6, gameChar_y - 10, 10, 10); // Left hand
    ellipse(gameChar_x + characterWidth + 4, gameChar_y - 13, 10, 10); // Right hand

    // Body
    fill(150, 0, 0);
    rect(gameChar_x, gameChar_y, characterWidth, characterHeight);

    // Head
    fill(255, 220, 177);
    rect(gameChar_x, gameChar_y - 10, 25, 15);

    // Hair
    fill(0); // Black hair
    beginShape();
    vertex(gameChar_x, gameChar_y - 10);
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x + 5, gameChar_y - 15);
    vertex(gameChar_x + 10, gameChar_y - 20);
    vertex(gameChar_x + 15, gameChar_y - 15);
    vertex(gameChar_x + 18, gameChar_y - 20);
    vertex(gameChar_x + 23, gameChar_y - 10);
    endShape(CLOSE);

    // Eyes
    fill(0);
    // ellipse(gameChar_x + 8, gameChar_y - 5, 3, 3);
    ellipse(gameChar_x + 17, gameChar_y - 5, 3, 3);

    // Mouth
    fill(255, 0, 0);
    ellipse(gameChar_x + 20, gameChar_y + 2, 10, 2);
}
characterIsJumpingLeft=(gameChar_x, gameChar_y, characterWidth, characterHeight)=>{
    fill(150, 0, 0);
    push();
    translate(gameChar_x + 5, gameChar_y + characterHeight); // Left leg position
    rotate(-PI / 8); // Rotate the left leg
    rect(0, -9, 5, 20);
    pop();

    push();
    translate(gameChar_x + 15, gameChar_y + characterHeight); // Right leg position
    rotate(-PI / 8); // Rotate the right leg
    rect(0, -7, 5, 20);
    pop();

    // Arms with hands in jumping pose
    fill(255, 0, 0);
    push();
    translate(gameChar_x - 8, gameChar_y - 10); // Left arm position
    rotate(-PI / 11); // Rotate the left arm up
    rect(0, 0, 5, 25);
    pop();

    push();
    translate(gameChar_x + characterWidth + 1, gameChar_y - 10); // Right arm position
    rotate(PI / 11); // Rotate the right arm up
    rect(0, 0, 5, 25);
    pop();

    // Hands
    fill(255, 220, 177);
    ellipse(gameChar_x - 6, gameChar_y - 10, 10, 10); // Left hand
    ellipse(gameChar_x + characterWidth + 4, gameChar_y - 13, 10, 10); // Right hand

    // Body
    fill(150, 0, 0);
    rect(gameChar_x, gameChar_y, characterWidth, characterHeight);

    // Head
    fill(255, 220, 177);
    rect(gameChar_x, gameChar_y - 10, 25, 15);

    // Hair
    fill(0); // Black hair
    beginShape();
    vertex(gameChar_x, gameChar_y - 10);
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x + 5, gameChar_y - 15);
    vertex(gameChar_x + 10, gameChar_y - 20);
    vertex(gameChar_x + 15, gameChar_y - 15);
    vertex(gameChar_x + 18, gameChar_y - 20);
    vertex(gameChar_x + 23, gameChar_y - 10);
    endShape(CLOSE);

    // Eyes
    fill(0);
    ellipse(gameChar_x + 8, gameChar_y - 5, 3, 3);
    // ellipse(gameChar_x + 17, gameChar_y - 5, 3, 3);

    // Mouth
    fill(255, 0, 0);
    ellipse(gameChar_x + 6, gameChar_y + 2, 10, 2);
}
characterIsPlummeting = (gameChar_x, gameChar_y, characterWidth, characterHeight) => {
    fill(255, 0, 0);
    push();
    translate(gameChar_x - 8, gameChar_y - 10); // Arm position
    rotate(-PI / 11); // Rotate the arm up
    rect(0, 0, 5, 25);
    pop();

    push();
    translate(gameChar_x + characterWidth + 1, gameChar_y - 10); // Right arm position
    rotate(PI / 11); // Rotate the arm up
    rect(0, 0, 5, 25);
    pop();

    // Hands
    fill(255, 220, 177);
    ellipse(gameChar_x - 6, gameChar_y - 10, 10, 10); // Left hand
    ellipse(gameChar_x + characterWidth + 4, gameChar_y - 10, 10, 10); // Right hand

    // Legs in jumping pose
    fill(150, 0, 0);
    push();
    translate(gameChar_x + 5, gameChar_y + characterHeight); // Left leg position
    rotate(PI / 8); // Rotate the left leg
    rect(0, -9, 5, 20);
    pop();

    push();
    translate(gameChar_x + 15, gameChar_y + characterHeight); // Right leg position
    rotate(-PI / 8); // Rotate the right leg
    rect(0, -7, 5, 20);
    pop();

    // Body
    fill(150, 0, 0);
    rect(gameChar_x, gameChar_y, characterWidth, characterHeight);

    // Head
    fill(255, 220, 177);
    rect(gameChar_x, gameChar_y - 10, 25, 15);

    // Hair
    fill(0); // Black hair
    beginShape();
    vertex(gameChar_x, gameChar_y - 10);
    vertex(gameChar_x + 2, gameChar_y - 20);
    vertex(gameChar_x + 5, gameChar_y - 15);
    vertex(gameChar_x + 10, gameChar_y - 20);
    vertex(gameChar_x + 15, gameChar_y - 15);
    vertex(gameChar_x + 18, gameChar_y - 20);
    vertex(gameChar_x + 23, gameChar_y - 10);
    endShape(CLOSE);

    // Eyes
    fill(0);
    ellipse(gameChar_x + 8, gameChar_y - 5, 3, 3);
    ellipse(gameChar_x + 17, gameChar_y - 5, 3, 3);

    // Mouth
    fill(255, 0, 0);
    ellipse(gameChar_x + 12.5, gameChar_y + 2, 5, 2);
}

drawBat = (x, y) => {
	// Draw body (smaller)
	fill(50);
	ellipse(x, y, 30, 50); // Main body

	// Draw head (smaller)
	fill(50);
	ellipse(x, y - 30, 20, 20); // Head

	// Draw wings (smaller)
	fill(80);
	// Left wing
	beginShape();
	vertex(x - 15, y - 5);
	bezierVertex(x - 60, y - 30, x - 60, y + 30, x - 15, y + 5);
	endShape(CLOSE);
	
	// Right wing
	beginShape();
	vertex(x + 15, y - 5);
	bezierVertex(x + 60, y - 30, x + 60, y + 30, x + 15, y + 5);
	endShape(CLOSE);

	// Draw eyes (smaller)
	fill(255, 0, 0);
	ellipse(x - 6, y - 30, 3, 3); // Left eye
	ellipse(x + 6, y - 30, 3, 3); // Right eye

	// Draw ears (smaller)
	fill(50);
	triangle(x - 10, y - 35, x - 3, y - 40, x - 15, y - 40); // Left ear
	triangle(x + 10, y - 35, x + 3, y - 40, x + 15, y - 40); // Right ear
  }