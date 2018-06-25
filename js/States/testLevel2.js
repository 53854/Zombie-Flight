/* initializing play state*/
var level2State = {

    create: function(){

        /* Preparing level*/
        //levelSetup();
        createTestLevel2();

        /* Configuring player with 2 balloons and 2 lifes*/
        playerConfig(game.world.left + 100, game.world.bottom -100, 2, playerLives);

        /* Setting up UI after all required elements are created*/
        setUi();

        /* Dev & debug controlls*/
        cKey.onDown.add(resetScore, this);
        xKey.onDown.add(toggleMapDebug, this);
        vKey.onDown.add(resetLevel, this, 0, "testLevel2");
        bKey.onDown.add(switchLevel, this, 0, "testLevel3");
    },
    
    update: function(){
        
        /* Watch for player input and keep player collisions in check*/
        playerMove();
        updateUi();

        if(!anyZombiesAlive()){
            game.state.start("testLevel3");
        }
    },

    render: function(){
        /* Debug stuff*/
        //game.debug.spriteInfo(player, game.world.left + 20, game.world.top + 80);
        //level.debug = true;
    }

}