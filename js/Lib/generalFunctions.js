/* functions used by multiple enteties*/


/* Creating a wrapper function because "game.world.wrap(player.body, etc..) was "not a function*/
function wrappper(sprite, padding){

    /* vertical collision and map floor check*/
    if ( sprite.y < game.world.bounds.y - padding){
        sprite.velocity.y = 100;
    }
    else if(sprite.y > game.world.bounds.bottom - 63 - sprite.height){
        sprite.y = game.world.bounds.bottom - 64 - sprite.height;
    }

    /* wrapping the sprite "around the world" bounds*/
    if (sprite.x + padding/2 < game.world.bounds.x){
        sprite.x = game.world.bounds.right + padding/2;
    }
    else if (sprite.x - padding/2 > game.world.bounds.right){
        sprite.x = game.world.bounds.left - padding/2;
    }
}

/* Probability solution*/
function fiftyFifty(probability){
    if(Math.random() > probability){
        return true
    }
    else{
        return false
    }
}


/* Add and dispaly score gains*/
/* p1Score => "Player - 1 - score*/
function p1ScoreAdd(origin, points){

    var pointsText = game.add.text(origin.x, origin.y, points, { font: "20px Arial", fill: "#ff4f78", align: "center" });
    game.physics.enable(pointsText);
    pointsText.body.allowGravity = false;
    pointsText.body.velocity.setTo(0, -100);
    
    game.time.events.add(1000, function(){pointsText.destroy();}, this);

    p1Score += points;
}





/* DEV AND DEBUG FUNCTIONS*/
function resetScore(){
    console.log(localStorage.localBest);
    localStorage.localBest = 0;
    localBest = 0;
}

function toggleMapDebug(){
    
    testLevel.debug = false;
    console.log(testLevel.debug);
    /*if(testLevel.debug){}
    else{testLevel.debug = true;}*/
    
}

function resetLevel(key, level){
    p1Score = 0;
    game.state.start(level);
}

function switchLevel(key, nextLevel){
    p1Score = 0;
    game.state.start(nextLevel);
}