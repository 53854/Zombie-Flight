/* functions used by multiple enteties*/

/* Creating a wrapper function because "game.world.wrap(player.body, etc..) was "not a function*/
function horizontalWrap(sprite, padding){
    if (sprite.x + 16 < game.world.bounds.x){
        sprite.x = game.world.bounds.right + padding;
    }
    else if (sprite.x - padding > game.world.bounds.right){
        sprite.x = game.world.bounds.left - padding;
    }
    if ( sprite.y < game.world.bounds.y - padding){
        sprite.velocity.y = 100;
    }
}

/* Probability generator*/
function fiftyFifty(probability){
    if(Math.random() > probability){
        return true
    }
    else{
        return false
    }
}