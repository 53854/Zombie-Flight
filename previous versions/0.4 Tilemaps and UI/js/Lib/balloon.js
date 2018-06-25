/* Extended phaser.sprite with extra functions, 
creating a class for balloons so they can be reused esier later*/

/* Creating a ballon class for enemies*/
class balloon extends Phaser.Sprite{

    constructor(game, x, y, key, zombieBalloon) {
        super(game, x, y, key);
        
        /* Setting standart frame & anchor*/
        this.anchor.setTo(0.5, 0.5);
        this.frame = 0;
        /* enabling physics for collision and overlapping*/
        game.physics.arcade.enable(this);
        this.enableBody = true;
        this.body.immovable = true;
        this.body.allowGravity = false;
        this.body.bounce.setTo(1, 1);

        /* Boolean that indicates whether balloon belongs to zombies or players*/
        this.zombieBalloon = zombieBalloon;

        /*  Adding pop animation -pfoof-*/
        //this.animations.add('pop', [0, 1, 3, 4], 10, true);
    }

    /* Checks collision & triggers Pop Balloon  :c*/
    balloonCollision(){

        game.debug.body(this);

        /* Collision check with terrain*/
        game.physics.arcade.overlap(this, level, this.regulateParent, this.checkEmptyTile, this);

        /* if a belongs to a zombie, it pops on contact with palyers :C*/
        if(this.zombieBalloon){
            game.physics.arcade.collide(this, zombies, this.regulateParent, null, this);
            game.physics.arcade.collide(this, player, this.pop, null, this);
        }
        /* and vice a versa*/
        else{game.physics.arcade.collide(this, zombies, this.pop, null, this);}

    }

    /* Force parent to react to balloons colliders*/
    regulateParent(object1, object2){
        object1.parent.body.velocity.y = 100;
    }

    pop(object1, object2){
        /* Adding score if player kills enemy balloon*/                  
        if (this.zombieBalloon){
            p1ScoreAdd(50); 
            
            //Allways blasting only the player (like in original game)
            this.popBlast(object2);
        }
        else{
            this.popBlast(object1.parent);
        }
        
    
        //console.log(" - pop -"); //play pop animation
        this.parent.removeChild(this);
        this.destroy;
    }

    popBlast(target){
        /* Simulating "blast" from balloon*/
        if(target.body.velocity.x > 0){
            target.body.velocity.x = -80;
        }
        else { target.body.velocity.x = 80;}

        if (target.body.velocity.y > 0){
            target.body.velocity.y = 100;
        }
        else { target.body.velocity.y = -100;}
    }

    checkEmptyTile(object1, object2){
        if (object2.index != -1){
            return true;
            console.log("HIT")
        }
        else { return false;}
    }
}