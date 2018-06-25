/* Script to manage general ingame UI tasks and handle global highscores*/
/* Setting UI groups*/
var playerLifes;

/* Setting up Ui variables*/
var playerScoreText;
var localHighScoreText;
//var globalHighScoreText; //If leaderboards implemented

function setUi(){

    /* creating Ui groups*/
    playerLifes = game.add.group();

    playerScoreText = game.add.text(20, 20, "Score: " +  p1Score, {fill: "#fff"});
    highScoreText = game.add.text(game.world.centerX - 100, 20, "Best: " +  localBest, {fill: "#fff"});

    addLifeDisplay(player.health)
}

function addLifeDisplay(Lifes){
    for (var i = 0; i < Lifes; i++){
        var life = playerLifes.create(20 + 25*i, playerScoreText.y + playerScoreText.height, "star");
    }
}

function updateUi(){
    /* Updating player highscore text*/
    playerScoreText.setText("Score: " +  p1Score);

    /* updating local highscore text if beat*/
    if (p1Score >= localBest){
        localBest = p1Score;
        highScoreText.setText("Best: " +  localBest);
    }
}

function updateLocalHighscores(){
    if(localBest > Number(localStorage.localBest)){
        localStorage.localBest = localBest;
    }
}

function setLocalHighscore(){
    if (localStorage.localBest) {
        localBest = Number(localStorage.localBest);
    } else {
        localStorage.localBest = localBest;
    }
}