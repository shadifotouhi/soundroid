(function()
{
    //Import classes
    var BaseState = include('pbskids.createjs.BaseState');

    /**
     * The logic for the title state
     * @class cloudkid.TitleState
     * @extends pbskids.createjs.BaseState
     */
    var TitleState = function()
    {
        BaseState.call(this, new cloudkid.TitlePanel(), 'game');
        this.onPlay = this.onPlay.bind(this);
    };

    // Super prototype
    var s = BaseState.prototype;

    // Extend the base class
    var p = extend(TitleState, BaseState);

    /**
     * When the transition is done playing and we're fully in
     */
    p.enterDone = function()
    {
        this.panel.playButton.on("click", this.onPlay);
        this.panel.background.cursor = "pointer";
    };

    /**
     * Handler when the play button is clicked
     */
    p.onPlay = function()
    {
        //Don't play music while in dev mode, only as
        //a courtesy to the developer
        this.manager.next();
    };

    /**
     * When the state exists
     */
    p.exit = function()
    {
        this.panel.background.cursor = null;
        this.panel.background.off("click", this.onPlay);
        this.panel.playButton.off("click", this.onPlay);

        s.exit.call(this);
    };

    //Assign to namespace
    namespace("cloudkid").TitleState = TitleState;
}());