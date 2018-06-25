/* initializing play state*/
var level3State = {

    create: function(){

        /* Preparing level*/
        //levelSetup();
        createTestLevel3();

        /* Configuring player with 2 balloons and 2 lifes*/
        playerConfig(game.world.left + 100, game.world.bottom -200, 2, playerLives);

        /* Setting up UI after all required elements are created*/
        setUi();

        /* Dev & debug controlls*/
        cKey.onDown.add(resetScore, this);
        xKey.onDown.add(toggleMapDebug, this);
        vKey.onDown.add(resetLevel, this, 0, "testLevel3");
        bKey.onDown.add(switchLevel, this, 0, "testLevel1");
    },
    
    update: function(){
        
        /* Watch for player input and keep player collisions in check*/
        playerMove();
        updateUi();

        if(!anyZombiesAlive()){
            game.state.start("win");
        }
    },

    render: function(){
        /* Debug stuff*/
        //game.debug.spriteInfo(player, game.world.left + 20, game.world.top + 80);
        //level.debug = true;
    }

}

