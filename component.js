// Main global variables
let s;
let ctx;
let canvas;
let scl = 10;

// Set frame per second
function frame(d) {
  var ms = d*10;
  return new Promise(resolve => setTimeout(resolve, ms));
}
// Setup and run just 1 time in first game loaded
function setup(){
    // Set canvas
    canvas = document.getElementById("play");
    ctx = canvas.getContext("2d");
    // Set size of canvas
    ctx.canvas.width  = 800;
    ctx.canvas.height = 400;
    
    // Check is keyboard keydown
    document.addEventListener("keydown", keyboard, false);
    // Snake object
    s = new Snake();   
    
    // Call loop function
    loop();
}
function keyboard(e){
    if(e.keyCode === 38){
        // Is Up key pressed?
        s.dir(0,-1);
    } else if(e.keyCode === 40){
        // Is Down key pressed?
        s.dir(0, 1);
    } else if(e.keyCode == 39){
        // Is Right key pressed?
        s.dir(1,0)
    } else if(e.keyCode == 37){
        // Is Left key pressed?
        s.dir(-1, 0);
    }
}
// loop everytime
async function loop(){
    // Call is snake in death position
    s.death();
    // Update position snake
    s.update();
    // Draw Snake
    s.show();
    // Waiting until done
    await frame(10);
    // Refresh canvas 
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Call function loop
    loop();
}

setup();