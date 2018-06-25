/* Setting up zombie group*/
var zombies;

/* Spawning the zombies for a given level*/
/* Attach function to level config*/
function zombieConfig(amount, spawnPositionX, spawnPositionY, spawnOffset){

    /* Adding zombie group*/
    zombies = game.add.group();

    for (var i = 0; i < amount; i++){
        var zombie = new zobbie(game, spawnPositionX + i * spawnOffset, spawnPositionY, game.time.now);
        zombie.name = "zobbie" + i;

        /* Adds a balloon to the zombie, but just one, i didn't have too many...  neither did balloon fight*/
        var bal = new balloon(game, 0, 0 - zombie.height, "star", true);
        zombie.addChild(bal);
        zombie.hasBalloon = true;
    }
}

/* Extended phaser.sprite with extra functions, creating a class for enemies so they can be used esier later*/
/* has own update loop, auto called by phaser update tho*/

/* Creating a zombie class for enemies*/
class zobbie extends Phaser.Sprite{

    constructor(game, x, y, spawntime) {
        super(game, x, y, "zombie");
        
        /* Setting standart frame & anchor for the zombie*/
        this.anchor.setTo(0.5, 0.5);
        this.frame = 2;
        /* enabling physics and collision for zombies*/
        game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.maxVelocity.setTo(250, 250);
        this.body.bounce.x = 0.8;

        /*  Adding zombie animations*/
        this.animations.add('left', [0, 1], 10, true);
        this.animations.add('right', [2, 3], 10, true);

        /* Name is actually unnecessary, but even zombies deserve names... or ids*/
        /* value declaration for aggression, balloon-possesion and sleep time*/
        this.name = "Seb";
        this.hasBalloon = false;
        this.aggression = 0.1; //it's the first level, cmon
        this.awaken = spawntime + 2000;

        /* time counters to trigger repeatable timed eventes (//prvent clusterfuck ai action)*/
        this.actiontimer = 0;
        this.flyTimer = 0;

        /* Spawns as non flying zombie, which is nice*/
        this.zombieFlying = false;

        zombies.add(this);
    }

    /* Automatically called by world.update*/
    update(){
        /* Check for ballon first*/
        this.checkBalloon();

        /* Collision check with terrain or other zombies*/
        game.physics.arcade.collide(this, [platforms, zombies]);
        game.physics.arcade.collide(this.children, [platforms, zombies]);

        /* Checking player collision for kills*/
        game.physics.arcade.collide(this, player, this.dies, null, this);

        /* Blocks zombie movement for "awaken" time, //Takes some time to blow up a balloon*/
        if(game.time.now > this.awaken){
            this.zombieAwake()
        }

        /* keeping horizontal wrapping, animation handling and horizontal verlocity mangement always active*/
        this.zombieAirCheck();
        horizontalWrap(this.body, 16);
        this.zombieTired();
        this.zombieAnimationHandler();
    }

    
    /* Checks for balloon, then checks ballon collision, rsresets balloon to self & then checks for balloon pop trigger*/
    checkBalloon(){
        if (this.children.length > 0){ //checks for balloon
            this.getChildAt(0).balloonCollision(); //balloon collision checks
        }
        else {this.zombieLoseBalloon()};
    }

    /* Event triggerd when own balloon is destroyed*/
    zombieLoseBalloon(){
        /* Setting accesible balloon variable to false*/
        this.hasBalloon = false;

        /*lowering gravity to "glide" to the ground*/
        this.body.gravity.y = 200;
        this.body.velocity.setTo (this.body.velocity.x , 200);

        /* Setting new awake time (in 15sec), which will cause the update to skip movement & putting zombie back to sleep*/
        /* Allow to get new balloon*/
        this.awaken = game.time.now + 15000;

        //maybe fall animation

        //or get a new balloon
    }

    /* Controlls when zombies are allowed to move an when they are idle*/
    zombieAwake(){
        /* zombie movement*/
        this.zombieAction();
        this.zombieFly();
    }

    
    /* Zombies take breaks between their actions, but when they get to act, this is what they do*/
    zombieAction(){
        if(game.time.now > this.actiontimer){ // timed event which is permanently checked

            /* fiftyFifty here actually used as a 50% chance*/
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
        if (game.time.now > this.flyTimer && this.hasBalloon){
            
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
        if (fiftyFifty(0.5)){ this.body.velocity.x += 50;}
        else{ this.body.velocity.x -= 50;}
    }

    /* Slows zombies while on the ground // also nice and slightly sliding (into your dms)*/
    zombieTired(){
        if (this.zombieFlying == false){
            if(this.body.velocity.x > 5 || this.body.velocity.x < -5){
                this.body.velocity.x = this.body.velocity.x * 0.9;
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
        /* chance to hunt player depends on aggression of zombie.... and if he as a balloon*/
        if(fiftyFifty(1 - this.aggression) && this.hasBalloon){
            if(this.x > player.x){ this.body.velocity.x = -50;}
            else{ this.body.velocity.x = 50;}

            if(this.y > player.y){this.body.velocity.y =-100;}
            else{ this.body.velocity.y = 50;}
        }
    }

    /* Simple animation hander, so zombies don't walk the air*/
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

    /* if zombies don't have a balloon they die on collision ;c*/
    dies(object1, object2){
        if(!object1.hasBalloon){
            p1ScoreAdd(100);
            this.pendingDestroy = true;;
        }
    }

    //controlls zombie flying bool
    zombieAirCheck(){
        if (this.body.touching.down){
            this.zombieFlying = false;
        }
    }
    
    /* in about 10 seconds zombies can blow up a new balloon*/
    zombieBlowNewBalloon(){
        game.time.events.add(game.time.now + 10000, function(){
            var newBal = new balloon(game, 0, 0 - this.height, "star", true);
            this.addChild(newBal);
            this.hasBalloon = true;

            this.gravity.y = 250;
        });
    }

}


