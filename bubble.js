function Ball(){
	this.x;
	this.y;
	this.dx=getRandom(-5,5);
	this.dy=getRandom(-5,5);
	this.dead=false;
	this.element;
	
	var width = 800;
	var height = 400;
	
	var that = this;
	
	this.init = function() {
		this.createBall();
	};

	this.createBall = function(){		
		var ball = document.createElement("div");
		ball.className = "ball";
		ball.style.height = "20px";
		ball.style.width="20px";
		ball.style.borderRadius = "10px";
		ball.style.backgroundColor = "#" + getRandom (0, 999999);
		ball.style.position = "absolute";
		ball.style.top = that.x = getRandom(0 ,380);
		ball.style.left = that.y = getRandom(0,780);
		
		this.element = ball;
		
		that.addToDom(ball);
	 };
	 
	 this.addToDom=function(ball){
		background.appendChild(ball);	 
	 };
	 
	 this.removeFromDom = function() {
	 	background.removeChild(that.element);
	 };
	 
	 this.checkCollision = function(enemy) {
		if( that.x == enemy.x){
			that.dead=true;
			enemy.dead=true;			
		}
	 	
	 };
	 
	 this.updateFrame = function() {
		that.x += that.dx;
		that.y += that.dy;
				
		if(that.x>(height-20)|| that.x<20){
			that.dx=that.dx*-1;
		}
		if(that.y>(width-20)||that.y<20){
			that.dy=that.dy*-1;
		}
		 
		that.element.style.top = that.x + "px";
		that.element.style.left = that.y + "px";
	 }
}

function getRandom(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Game() {
	var maxBalls = 10;
	var ballList = [];
	var that = this;
	
	this.init = function() {
		that.createBalls();
		
		setInterval(that.gameLoop, 50);
	};
	
	this.createBalls = function() {
		for (var i=0; i<maxBalls; i++) {
			var ball = new Ball();
			ball.init();
			ballList.push(ball);
		}
		
	};
	
	this.gameLoop = function() {
		that.moveBalls();
		that.checkCollision();
		//that.removeFromDom();
		that.removeFromList();
	};
	
	this.moveBalls = function() {
		for (var i=0; i<ballList.length; i++) {
			var ball = ballList[i];
			ball.updateFrame();
		}
	};
	this.removeFromList = function() {
		var tempList=ballList
		for(i=0;i<tempList.length;i++){
			if(tempList[i].dead){
				
				//ballList.splice(i);
				
			}
		}
	}
	
	this.removeFromDom=function(){
		for(i = 0; i < ballList.length; i++){
			var ball=ballList[i];
			if(ball.dead){
					ball.removeFromDom();
			}
		}
	};
	
	this.checkCollision = function() {
		for (var i = 0; i < ballList.length; i++){			
			var ball=ballList[i];
			//console.log(ball);
			for (var j = 0; j <= i-1; j++){
				var enemy=ballList[j];
				if(i==j || ball.dead || enemy.dead){
					continue;
				}else{					
					ball.checkCollision(enemy);
				}
			} 
		}
		
	};
}

var game = new Game();
game.init();