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


        //list of all of the sounds
        this.sounds = [];
    };

    //Super prototype
    var s = BaseState.prototype;

    //Extend the base state
    var p = extend(GameState, BaseState);

    /**
     * After assets are loaded and state is fully entered
     */


    p.enterDone = function()
    {

        for(var key in Sound.instance._sounds)
        {
            this.sounds.push(key);
        }

        this.game.player.play(
            this.sounds
            );
        
    };


    p.exit = function()
    {
        s.exit.call(this);
    };

    //Assign to namespace
    namespace('cloudkid').GameState = GameState;
}());