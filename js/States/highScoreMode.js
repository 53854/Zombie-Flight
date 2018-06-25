/* ZombieSpawntimer & progession*/
var zombieSpawntimer;
var progess;
var nextWave;
var highScoreModeBeginn;

/* initializing play state*/
var infinitState = {

    create: function(){

        /* Preparing level*/
        createTestLevel3();
        zombieSpawntimer = game.time.now + 15000;
        progess = 1;

        /* Configuring player with 2 balloons and 2 lifes*/
        playerConfig(game.world.left + 100, game.world.bottom -200, 2, 3);

        /* Configuring game mode*/
        highscoreMode = true;
        highScoreModeBeginn = game.time.now;

        /* Setting up UI after all required elements are created*/
        setUi();

        /* Dev & debug controlls*/
        cKey.onDown.add(resetScore, this);
        xKey.onDown.add(toggleMapDebug, this);
        vKey.onDown.add(resetLevel, this, 0, "testLevel3");
        bKey.onDown.add(switchLevel, this, 0, "highScoreEnd");

    },
    
    update: function(){
        
        /* Watch for player input and keep player collisions in check*/
        playerMove();
        updateUi();

        respawnZombies();
    },

}

function respawnZombies(){
    if(!anyZombiesAlive() || game.time.now > zombieSpawntimer){

        nextWave = 20000 * progess;

        zombieSpawntimer = game.time.now + nextWave;
        
        if(nextWave > 10000){progess -= 0.05;}

        zombieConfig(2, game.world.left + 100, game.world.top + 100, 50);
        zombieConfig(2, game.width - 200, game.world.top + 100, 50);

    }
}