var highScoreEndState = {
    create: function(){
        updateLocalHighscores();

        if (!menuMusic.isPlaying){  menuMusic.play('',0,0.05,true); }
        else {menuMusic.volume = 0.05}

        background = game.add.image(0,0, 'bg3');
        background.scale.setTo(2, 2);

        /* Text styling for highScoreEnd*/
        var highScoreTextStyle = { font: "45px Agency FB", fontWeight: "bolder", fill: "#ff4f78", align: "center" };

        /* Setting up highScore & survial time text*/
        var winText;
        var survivalSeconds = (game.time.now - highScoreModeBeginn) / 1000; //Converting phaser mil(?) seconds to seconds
        var survivalTime = survivalSeconds.toFixed(2) + " seconds.."; //getting a .2 decimal string

        /* If survived for long enough, display time is converted to minutes*/
        if(survivalSeconds > 60){
            survivalTime = (survivalSeconds / 60).toFixed(2); " minutes...";
        }

        if(beatLocalHgihscore){
            /* text if player beat local highscore*/
            winText = "NEW HIGHSCORE: " + p1Score + "\n" + "You survived for: " + survivalTime;
        } else {
            /* text if player "just" srvived*/
            winText = "You survived!" + "\n" + "for: " + survivalTime + "\n" + "Highscore : " + p1Score;
        }
        
        var survivalText = game.add.text(game.world.centerX, game.world.centerY, winText.toUpperCase(), highScoreTextStyle);
        survivalText.anchor.setTo(0.5, 0.5);

        var backText = game.add.text( game.world.centerX, game.height - 100, "press space to get back", {fill: "#fff"});
        
        spaceKey.onDown.addOnce(this.restart, this);
    },

    restart: function(){
        backToMenu();
    }
}