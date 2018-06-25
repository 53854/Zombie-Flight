
/* Initializing boot state*/
var bootState = {

    /* Preload asset to use as loading screen*/
    preload: function(){
        game.load.image("zombieload", "assets/Web/zombieload.png");
    },

    create: function() {
        
        /* Booting up physics engine*/
        game.physics.startSystem(Phaser.Physics.ARCADE);

        /* Starting load state*/   
        game.state.start("load");
    }
}