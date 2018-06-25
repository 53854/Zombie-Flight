


/* Initializing menu state*/
var menuState ={

    create: function(){
        
        //Music
        if (!menuMusic.isPlaying){  menuMusic.play('',0,0.05,true); }
        else {menuMusic.volume = 0.05}

        //Menuscreen
        setMainMenu();
        //Selection
        
        //keystuff
    }
}