var r, g, b;
var mX, mY, pmX, pmY, ppmX, ppmY;
var drawing = false;
var isDarkMode = false;
var pointCounter = 0;

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function setup() {
  canvas = createCanvas(displayWidth, displayHeight);
  canvas = createCanvas(windowWidth, windowHeight);
  canvas.position(0, 0);
  canvas.style('z-index', '-1');
  
  frameRate(300);
  smooth();
  background(255); // Set initial background color to white
  textFont('Courier'); // Set the font to Courier

  // Event listener for Dark Mode
  document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
}

function draw() {

  if (drawing) {
  console.log(isDarkMode);

    noStroke();
    fill(255, 30); // Adjusted fill to achieve fading out effect
    rect(0, 0, width, height); // Draw a semi-transparent white rectangle to create fading out effect

    var Abs = abs(pmouseX - mouseX) % 30;
    strokeWeight(random(1, Abs/3));
    var lineColor = color(random(0, 100), random(0, 100), random(0, 100)); // Darker lines
    stroke(lineColor);
    
    // Calculate random offset within a smaller range
    var offsetX = random(-width/6.5, width/6.5);
    var offsetY = random(-height/6.5, height/6.5);
    
    // Ensure endpoints remain within canvas boundaries
    if (pointCounter % 18 === 0) {
      mX = mouseX;
      mY = mouseY;
    } else {
      mX = constrain(pmX + offsetX, 0, width);
      mY = constrain(pmY + offsetY, 0, height);
    }

    // Draw a small black dot at the intersection
    fill(0); // Black color for the dot
    ellipse(mX, mY, 5, 5);
    textAlign(CENTER, CENTER);
    textSize(12); // Font size
    if (random(1) > 0.7) {
      text(mX.toFixed(6) + ", " + mY.toFixed(6), mX, mY - 10); // Text above m point
    }
    // Draw lines to form a triangle
    line(pmX, pmY, mX, mY);
    
    if ((random(1) > 0.5)) {
      if (random(1) > 0.2) {
        line(ppmX, ppmY, mX, mY);
      } else {
        noFill();
        bezier(pmX, pmY, pmX + random(-width, width), pmY + random(-height, height), mX + random(-width, width), mY + random(-height, height), mX, mY);
      }
    }
    fill(0); // Black color for the text
    textAlign(CENTER, CENTER);
    textSize(12); // Font size
    
    
    // Update previous points
    ppmX = pmX;
    ppmY = pmY;
    pmX = mX;
    pmY = mY;
    pointCounter++;
  }
}

function mousePressed() {
  drawing = true;
  pmX = mouseX;
  pmY = mouseY;
  ppmX = mouseX;
  ppmY = mouseY;
  prevIntersectionX = mouseX;
  prevIntersectionY = mouseY;
}

function mouseReleased() {
  drawing = false;
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode; // Toggle dark 
  console.log('elo');
  var container = document.getElementById("body");
  if (isDarkMode) {
    container.classList.add("invert"); // Add invert class
  } else {
    container.classList.remove("invert"); // Remove invert class
  }
}

