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

        /* Collision check with terrain & spikes*/
        game.physics.arcade.overlap(this, collisionLayer, this.regulateParent, this.checkEmptyTile, this);
        game.physics.arcade.overlap(this, spikes, this.pop, this.checkEmptyTile, this);

        /* if a belongs to a zombie, it pops on contact with palyers :C*/
        if(this.zombieBalloon){
            game.physics.arcade.collide(this, zombies, this.regulateParent, null, this);
            game.physics.arcade.collide(this, player, this.pop, null, this);
        }
        /* and vice a versa*/
        else{game.physics.arcade.collide(this, zombies, this.pop, null, this);}


        /* Debug stuff*/
        //game.debug.body(this);
    }

    /* Force parent to react to balloons colliders*/
    regulateParent(object1, object2){
        object1.parent.body.velocity.y = 100;
    }

    pop(object1, object2){
        hit.play("",0,0.8, false);
        /* Workaround of asynchronous updates*/
        if(this.parent != undefined)
            /* Adding score if player kills enemy balloon*/{
            if (this.zombieBalloon){
                p1ScoreAdd(object1.parent, 50);
    
                //Allways blasting only the player (like in original game)
                if(!object2.parent == undefined){
                    this.popBlast(object2);
                }
            }
            else{
                this.popBlast(object1.parent);
                game.camera.shake(0.03, 200);
            }
        
            //console.log(" - pop -"); //play pop animation
            this.destroy;
            this.parent.removeChild(this);
        } 
    }

    popBlast(target){
        /* Simulating "blast" from balloon*/

        if(target.body.velocity.x > 0){
            target.body.velocity.x = -80;
        }
        else { target.body.velocity.x = 80;}

        if (target.body.velocity.y > 0){
            target.body.velocity.y = 80;
        }
        else { target.body.velocity.y = -80;}
    }

    /* Not triggering on empty (transparent) tiles*/
    checkEmptyTile(object1, object2){
        if (object2.index != -1){
            return true;
        }
        else { return false;}
    }
}