var winState = {
    create: function(){
        updateLocalHighscores();

        background = game.add.image(0,0, 'bg3');
        background.scale.setTo(2, 2);

        if (!menuMusic.isPlaying){  menuMusic.play('',0,0.05,true); }
        else {menuMusic.volume = 0.05}

        /* Setting up conditional win text*/
        var winText;

        if(beatLocalHgihscore){
            /* text if player beat local highscore*/
            winText = game.add.text(game.world.centerX, game.world.centerY,
                "You beat the bad guys!"
                + "\n" + 
                "AND broke the highscore!"
                + "\n" + 
                "Score: " + p1Score,
                { font: "40px Agency FB", fill: "#ff0044", align: "center" });
           winText.anchor.setTo(0.5, 0.5);
        } else {
            /* text if player "just" beat the game*/
            winText = game.add.text(game.world.centerX, game.world.centerY,
                "You beat the bad guys!"
                + "\n" + 
                "Highscore : " + p1Score,
                { font: "65px Arial", fill: "#ff0044", align: "center" });
            winText.anchor.setTo(0.5, 0.5);
        }
        
        spaceKey.onDown.addOnce(this.restart, this);

        var backText = game.add.text( game.world.centerX, game.height - 100, "press space to get back", {fill: "#fff"});

         
    },

    restart: function(){
        backToMenu();
    }
}