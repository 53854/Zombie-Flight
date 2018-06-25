var gameOverState = {
    create: function(){
        updateLocalHighscores();

        if (!menuMusic.isPlaying){  menuMusic.play('',0,0.05,true); }
        else {menuMusic.volume = 0.05}

        var gameOverZombie = game.add.sprite(game.world.centerX-150, game.world.centerY , "zombieload");
        gameOverZombie.anchor.setTo(0.5);
        gameOverZombie.scale.setTo(0.2, 0.2);

        var gameOverText = game.add.text(game.world.centerX + 50, game.world.centerY, "RIP", {font: "50px Agency FB", fill: "#ffffff"});

        var backText = game.add.text( game.world.centerX, game.height - 100, "press space to get back", {font: "25px Agency FB", fill: "#fff"});

        spaceKey.onDown.addOnce(this.restart, this);
    },

    restart: function(){
        backToMenu();
    }
}
