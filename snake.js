 let ctx = document.getElementById('canvas').getContext('2d');
 let dir,score,food,bodyPart;
 let step = 20; //speed
 let gameLoop ;
 let grid = {
        width: 500/step, //canvas width divided by the step
        height: 500/step //canvas height divided by the step
    };
 let snake = {
        body: [
            {x:0,y:0},
            {x:20,y:0},
            {x:40,y:0}
        ]
    };


 let keysDown = {};
 window.addEventListener('keydown', kbdHandler);
 window.addEventListener('keyup', kbdHandler);

 function kbdHandler() {
     if (event.type == 'keydown')
         keysDown[event.code] = true;
     else if (event.type == 'keyup')
         delete keysDown[event.code];
 }

 function navigateSnake() {
     if (keysDown["ArrowLeft"] && dir != "right") {
         dir = "left";
     }
     else if (keysDown["ArrowRight"]&& dir != "left") {
         dir = "right";
     }
     else if (keysDown["ArrowUp"] && dir != "down") {
         dir = "up";
     }
     else if (keysDown["ArrowDown"] && dir != "up") {
         dir = "down";
     }
 }



 //document.addEventListener("keydown",function (e) {
 //       let key = e.keyCode;
 //       console.log(key)
 //       if(key === 37 && dir != "right") dir = "left";
 //       else if(key === 38 && dir != "down") dir = "up";
 //       else if(key === 39 && dir != "left") dir = "right";
 //       else if(key === 40 && dir != "up") dir = "down";
 //});



 function init() {
        snake = {
            body: [
                {x:0,y:0},
                {x:20,y:0},
                {x:40,y:0}
            ]
        };
        dir = 'right';
        score = 0;
        createFood();
    }
 init();
 function checkCollisionWithWall(bodyPart) {
        if(bodyPart.x > 480) bodyPart.x = 0;
        else if (bodyPart.x < 0) bodyPart.x = 480;
        else if (bodyPart.y > 480) bodyPart.y = 0;
        else if (bodyPart.y < 0) bodyPart.y = 480;

    }
 function checkCollisionWithBody(bodyPart) {
        if(bodyPart.x == snake.head.x && bodyPart.y == snake.head.y ){
            gameOver();
        }
    }
 function checkCollisionWithFood(head){
        if(head.x == food.x && head.y == food.y){
            score++;
            addBodyPart();
            createFood();
        }
    }
 function addBodyPart() {
        snake.head = snake.body[snake.body.length-1];//the most right one
        let newPart = {};
        if(dir == 'right'){
            newPart = {
                x:snake.head.x + step,
                y:snake.head.y
            }
        }
        else if(dir == 'left'){
            newPart = {
                x:snake.head.x - step,
                y:snake.head.y
            }
        }
        else if(dir == 'up'){
            newPart = {
                x:snake.head.x ,
                y:snake.head.y - step
            }

        }
        else if(dir == 'down'){
            newPart = {
                x:snake.head.x ,
                y:snake.head.y + step
            }
        }
        snake.body.push(newPart);
    }
 function createFood() {
        let foodX = Math.floor(Math.random()*(grid.width));
        let foodY = Math.floor(Math.random()*(grid.height));
        food = {x:foodX*step,y:foodY*step};

        //food might appear on the body of the snake
        for(let i = 0; i < snake.body.length; i ++){
            bodyPart = snake.body[i];
            if(food.x == bodyPart.x && food.y == bodyPart.y){
                createFood();
            }
        }

    }
 function gameOver() {
        clearInterval(gameLoop);
        reMenu.style.zIndex = "1";
        let displayScore = document.getElementById('score');
        displayScore.innerHTML= "YOUR SCORE: " + score;
    }
 function reset() {
        clearInterval(gameLoop);
        reMenu.style.zIndex = "-1";
        gameLoop = setInterval(draw,100);
        init();
    }
 function move() {
        snake.body.shift(); //deleteBodyPart
        addBodyPart();
    }
 function draw() {
        ctx.clearRect(0,0,555,555);
        ctx.fillStyle = "lightgrey";
        navigateSnake();
        snake.head = snake.body[snake.body.length-1];
        checkCollisionWithFood(snake.head);
        for(let i = 0; i < snake.body.length; i ++){
            bodyPart = snake.body[i];
            checkCollisionWithWall(bodyPart);
            //check 'i' because head is part of the body
            if(i < snake.body.length-2){
                checkCollisionWithBody(bodyPart);
            }
            ctx.fillRect(bodyPart.x,bodyPart.y,19,19);
        }
        ctx.fillStyle = "yellow";
        ctx.fillRect(food.x,food.y,19,19);
        move();
    }
 gameLoop = setInterval(draw,80);
