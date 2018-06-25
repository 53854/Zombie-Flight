/* initializing play state*/
var playState = {

    create: function(){

        /* Preparing level*/
        //levelSetup();
        createTileMap();

        /* Configuring player with 2 balloons and 2 lifes*/
        playerConfig( 2, 2);

        /* Setting up UI after all required elements are created*/
        setUi();
    },
    
    update: function(){

        /* Watch for player input and keep player collisions in check*/
        playerMove();
        updateUi();
    },

    render: function(){
        //debug stuff
    }

}