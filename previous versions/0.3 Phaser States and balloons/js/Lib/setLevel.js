/* Setting up group for platforms*/
var platforms;

/* Setting up a level*/
function levelSetup(){

    /* Settin up gloabal gravity for the level*/
    game.physics.arcade.gravity.y = 250;

    /* Setting level background*/
    game.add.sprite(0,0, 'sky');

    /* Grouping and configuring platforms*/
    platforms = game.add.group();
    platforms.enableBody = true;

    /* Level strucutre setup*/
    var ground = platforms.create(0, game.world.height - 64, "ground");
    ground.scale.setTo(4, 2);
    ground.body.immovable = true;
    ground.body.allowGravity = false;

    var plato = platforms.create(200, 300, "ground");
    plato.scale.setTo(1, 2);
    plato.body.immovable = true;
    plato.body.allowGravity = false;
    plato.name = "plato";

    zombieConfig(3, 350, 250, 50);
}