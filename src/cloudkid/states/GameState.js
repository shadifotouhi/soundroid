(function()
{
    //Import classes
    var BaseState = include('pbskids.createjs.BaseState'),
        SpriteUtils = include('pbskids.createjs.SpriteUtils'),
        Sound = include('springroll.Sound');

    /**
     * Saved access to the Progress Tracker
     * @param {pbskids.createjs.ProgressTracker} tracker
     */
    var _tracker;

    /**
     * The logic for the title state
     * @class cloudkid.TitleState
     * @extends pbskids.createjs.BaseState
     */
    var GameState = function()
    {
        BaseState.call(this, new cloudkid.GamePanel(), 'title', 'title');


        //list of all of the soundIDs
        this.soundIDs = [];
        this.selector = 0;
    };


    ///Super prototype
    var s = BaseState.prototype;

    //Extend the base state
    var p = extend(GameState, BaseState);

    /**
     * After assets are loaded and state is fully entered
     */


    p.enterDone = function()
    {
        for(var soundID in Sound.instance._sounds)
        {
            this.soundIDs.push(soundID);
        }

        this.panel.nextButton.on("click", this.nextSound.bind(this));
        this.panel.replayButton.on("click", this.replaySound.bind(this));
        this.panel.backButton.on("click", this.previousSound.bind(this));
        
        this.playSound(this.soundIDs[this.selector]);
    };



    p.playSound = function(soundAlias)
    {
        this.game.player.play(soundAlias);
        this.panel.soundId.text = soundAlias;


        var currentNumber = this.selector + 1;

        this.panel.numberId.text = currentNumber + '/' + this.soundIDs.length;
    };


    p.nextSound = function()
    {
        if (this.selector < this.soundIDs.length - 1)
            this.selector++;
        else
            this.selector = 0;

        this.playSound(this.soundIDs[this.selector]);

    };

    p.previousSound = function()
    {
        if (this.selector > 0)
            this.selector--;
        else
            this.selector = this.soundIDs.length - 1;

         this.playSound(this.soundIDs[this.selector]);
    };

    p.replaySound = function()
    {
        this.playSound(this.soundIDs[this.selector]);
    };


    p.exit = function()
    {
        s.exit.call(this);
    };

    //Assign to namespace
    namespace('cloudkid').GameState = GameState;
}());