/* Extended phaser.sprite with extra functions, creating a class for enemies so they can be used esier later*/
/* has own update loop, auto called by phaser update tho*/


/* Spawning the zombies for a given level*/
/* Attach function to level config*/
function zombieConfig(amount, spawnPositionX, spawnPositionY, spawnOffset){

    /* Adding zombie group*/
    zombies = game.add.group();

    /* Set spawn position for first zombie*/
    var spawnX = spawnPositionX;
    var spawnY = spawnPositionY;
    var spawnOf = spawnOffset;

    for (var i = 0; i < amount; i++){
        var zombie = new zobbie(game, spawnX + i*spawnOf, spawnY, game.time.now);
        zombie.name = "zobbie" + i;
    }
}

/* Creating a zombie class for enemies*/
class zobbie extends Phaser.Sprite{

    constructor(game, x, y, spawntime) {
        super(game, x, y, "zombie");
        
        this.frame = 2;
        this.enableBody = true;
        game.physics.arcade.enable(this);
        this.body.bounce.x = 0.5;

        /*  Adding zombie animations*/
        this.animations.add('left', [0, 1], 10, true);
        this.animations.add('right', [2, 3], 10, true);

        this.name = "";
        this.awaken = spawntime + 4000;

        /* time counters to prvent clusterfuck ai action*/
        this.actiontimer = 0;
        this.flyTimer = 0;

        this.baloon = true;
        this.zombieFlying = false;

        zombies.add(this);
    }

    update(){ 

        /* Turning zombies direction on collision with terrain*/
        game.physics.arcade.collide(this, platforms, function(object1, object2){
            if(object1.body.touching.left || object2.body.touching.left){
                object2.body.velocity.x *= -1.001;
            }
        });

        /* Turning zombies direction on collision with each other*/
        game.physics.arcade.collide(this, zombies, function(object1, object2){
            if(object1.body.touching.left || object2.body.touching.left){
                object1.body.velocity.x *= -1.001;
                object2.body.velocity.x *= -1.001;
            }
        });

        /* Checking if one sprite is above the other to "kill balloon"*/
        game.physics.arcade.collide(this, player, function (object1, object2){
            //console.log("killcheck for :" + object1.name + " & " + object2.name);
            if(object1.body.touching.down && object2.body.touching.up){
                //console.log("killing " + object2.name);
                player.health -= 1;
            }
            else if(object1.body.touching.up && object2.body.touching.down){
                //console.log("killing " + object1.name);
                object1.destroy();
            }
            /* bouncing player off enemies*/
            else if (object1.body.touching.left || object2.body.touching.left){
                object1.body.velocity.x *= -1.001;
            }
        });

        /* Statement to freeze enemies for the first few seconds of the game*/
        if(game.time.now > this.awaken){
            /* Normal update loop*/
            this.zombieAction();
            this.zombieFly();
            this.zombieTired();
            this.zombieAnimationHandler();
            horizontalWrap(this.body, 16);
        }
    }

    zombieAction(){
        if(game.time.now > this.actiontimer){

            if (fiftyFifty(0.5)){
                this.zombieMove();
                this.actiontimer = game.time.now + 1000;
            }
            else if(fiftyFifty(0.5)){
                this.zombieHunt();
                this.actiontimer = game.time.now + 1000;
            }
        }
    }

    /* Flight function for zombies*/
    zombieFly(){
        if (game.time.now > this.flyTimer){
            
            if(!this.zombieFlying){
                this.body.velocity.y = -150;
                this.zombieFlying = true;
            }
            else if (this.body.velocity.y > 0 && fiftyFifty(0.5)){
                this.body.velocity.y = -80;
            }
            else if (this.body.velocity.y > -200 && this.body.velocity.y < 0){
                this.body.velocity.y *= 2;
            }
            this.flyTimer = game.time.now + 300;
        }
        if (this.body.touching.down){
            this.zombieFlying = false;
        }
        
    }

    /* Movement for zombies*/
    zombieMove(){
        if (this.body.touching.down && this.zombieFlying){
            this.zombieFlying = false;
        }

        if (fiftyFifty(0.5)){ this.body.velocity.x += 50;}
        else{ this.body.velocity.x -= 50;}
    }

    /* Slows zombies while on the ground // also nice and slightly sliding (in your dm's)*/
    zombieTired(){
        if (this.zombieFlying == false && game.time.now > this.actiontimer){
            if(this.body.velocity.x > 5 || this.body.velocity.x < -5){
                this.body.velocity.x = this.body.velocity.x * 0.95;
                if(this.body.velocity.x > 0){
                    this.animations.stop(); 
                    this.frame = 3; 
                }
                else if(this.body.velocity.x < 0){
                    this.animations.stop(); 
                    this.frame = 0;
                }
            }
            else {
                this.animations.stop();   
                this.body.velocity.x = 0;
                this.frame = 2; //idle frame
            }
        }
    }

    /* "Hunting" the player, moving towards him*/
    zombieHunt(){
        if(fiftyFifty(0.9)){
            if(this.x > player.x){ this.body.velocity.x = -50;}
            else{ this.body.velocity.x = 50;}

            if(this.y > player.y){this.body.velocity.y =-100;}
            else{ this.body.velocity.y = 50;}
        }
    }

    zombieAnimationHandler(){
        if (this.body.velocity.x > 0){
            if(this.zombieFlying == false){this.animations.play("right");}
            else {this.animations.stop(); this.frame = 2;}
        }
        else {
            if(this.zombieFlying == false){this.animations.play("left");}
            else {this.animations.stop(); this.frame = 1;}
        }
    }

}