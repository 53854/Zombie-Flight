/* Setting up a level*/
function levelSetup(){
    /* Grouping and configuring platforms*/
    platforms = game.add.group();
    platforms.enableBody = true;

    /* Level setup*/
    var ground = platforms.create(0, game.world.height - 64, "ground");
    ground.scale.setTo(4, 2);
    ground.body.immovable = true;
    ground.body.allowGravity = false;

    var plato = platforms.create(200, 300, "ground");
    plato.scale.setTo(1, 2);
    plato.body.immovable = true;
    plato.body.allowGravity = false;

    zombieConfig(3, 350, 250, 50);
}

