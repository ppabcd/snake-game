class Snake{
    constructor(){
        // X position
        this.x = 0;
        // Y position
        this.y = 0;
        
        // X speed x+xspeed (0/1)
        this.xspeed=1;
        // Y speed y+yspeed (0/1)
        this.yspeed=0;
        // Food location
        this.food = {};
        // Total tail
        this.total = 1;
        // Tail location
        this.tail = [];
        
        // Pick Food Location
        this.pickLocation();
    }
    // Pick food location
    pickLocation(){
        // Get food x position
        this.food.x = Math.floor(Math.floor(Math.random()*canvas.width)/scl)*scl;
        // Get food y possition
        this.food.y = Math.floor(Math.floor(Math.random()*canvas.height)/scl)*scl;
    }
    // Death snake
    death(){
        // Check tail position
        for (var i = 0; i < this.tail.length; i++) {
         var pos = this.tail[i];
         if(Math.abs(this.x - pos.x) < 1 && Math.abs(this.y - pos.y)<1){
            //  Set to 1
             this.total = 1;
            //  Set tail position
             this.tail = [];
         }
        }
    }
    // Maximum snake
    maximum(){
        if(this.x > canvas.width-scl){
            this.x = Math.floor(canvas.width/scl)*scl-scl;
        }
        if(this.y > canvas.height-scl){
            this.y = Math.floor(canvas.height/scl)*scl-scl;
        }
        if(this.x < 0){
            this.x = 0;
        }
        if(this.y < 0){
            this.y = 0;
        }
    }
    // Is snake eat food?
    eat(){
        if(Math.abs(this.x - this.food.x) < 1 && Math.abs(this.y - this.food.y)<1){
            return true;
        }
        return false;
    }
    // Update logic
    update(){
        // If tail and total same value
        if(this.tail.length === this.total){
            for (var i = 0; i < this.tail.length-1; i++) {
                this.tail[i] = this.tail[i+1];
            }
        }
        
        // Debug tails
        // console.log(JSON.stringify(this.tail));
        
        // Create tail position in end array
        this.tail[this.total-1] = {};
        this.tail[this.total-1].x = this.x;
        this.tail[this.total-1].y = this.y;   
        
        // Position x with speed * scl
        this.x = this.x + this.xspeed*scl;
        // Position x with speed * scl
        this.y = this.y + this.yspeed*scl;
        
        // Check is maximum location?
        this.maximum();
        // Check is snake eat food?
        if(this.eat()){
            // Change food location
            this.pickLocation();
            // Add tail total
            this.total++;
        }
    }
    // Drawing Time >,<
    show(){
        // Draw every tail
        for(var i=0; i<this.tail.length; i++){
            ctx.beginPath();
            ctx.rect(this.tail[i].x, this.tail[i].y, scl,scl);
            ctx.fillStyle = "#FF0000";
            ctx.fill();
            ctx.closePath();
        }
        
        // Draw food
        ctx.beginPath();
        ctx.rect(this.food.x, this.food.y, scl,scl);
        ctx.fillStyle = "#0000FF";
        ctx.fill();
        ctx.closePath();
    }
    dir(x,y){
        // Change position snake
        this.xspeed = x;
        this.yspeed= y;
    }
}