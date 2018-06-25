var endState = {
    create: function(){
        var endText = game.add.text(game.world.centerX, game.world.centerY, "RIP", {font: "50px Arial", fill: "#ffffff"});

        var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        spaceKey.onDown.addOnce(this.restart, this);
    },

    restart: function(){
        game.state.start("menu");
    }
}