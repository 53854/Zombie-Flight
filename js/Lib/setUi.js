/* Script to manage general ingame UI tasks and handle global highscores*/
/* Setting UI groups*/
var playerLivesUI;
var p1Score;

/* Setting up Ui variables*/
var playerScoreText;
var localHighScoreText;
//var globalHighScoreText; //If leaderboards implemented

/* Setting up UI element containers*/
var pauseButton;
var uiTextStyle;

/* highscore bool to remember whether local highscore has been broken*/
var brokeLocalHgihscore = false;

function setUi() {

    /*Setting back palyer score if undefined to preven errors */
    if (p1Score == undefined) {
        p1Score = 0;
    }

    var uiTextStyle = {
        font: "25pt Agency FB",
        fill: "#fff"
    };

    /* creating Ui groups*/
    playerLivesUI = game.add.group();

    playerScoreText = game.add.text(game.world.left + 20, 20, "SCORE: " + p1Score, uiTextStyle);
    highScoreText = game.add.text(game.world.centerX - 100, 20, "BEST: " + localBest, uiTextStyle);

    /* creating pause "button" text*/
    pauseText = game.add.text(game.width - 150, 20, 'PAUSE', uiTextStyle);
    pauseText.inputEnabled = true;
    pauseText.events.onInputUp.add(pauseGame, this);

    /* And binding pause to escape key - userfriendly*/
    escKey.onDown.add(pauseGame, this);

    /* Initiation player lives element*/
    addLifeDisplay(playerLives)
}

function addLifeDisplay(Lifes) {
    for (var i = 0; i < Lifes; i++) {
        var life = playerLivesUI.create(game.world.left + 20 + 25 * i, playerScoreText.y + playerScoreText.height + 10, "balloon");
    }
}

function updateUi() {
    /* Updating player highscore text*/
    playerScoreText.setText("SCORE: " + p1Score);

    /* updating local highscore text if beat*/
    if (p1Score >= localBest) {
        localBest = p1Score;
        highScoreText.setText("BEST: " + localBest);
    }
}

function updateLocalHighscores() {
    if (localBest > Number(localStorage.localBest)) {
        localStorage.localBest = localBest;
        beatLocalHgihscore = true;

    } else beatLocalHgihscore = false;
}

function setLocalHighscore() {
    if (localStorage.localBest) {
        localBest = Number(localStorage.localBest);
    } else {
        localStorage.localBest = localBest;
    }
}