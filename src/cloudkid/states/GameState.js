(function()
{
    //Import classes
    var BaseState = include('pbskids.createjs.BaseState'),
        SpriteUtils = include('pbskids.createjs.SpriteUtils');

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
        this._onPlayHelp = this._onPlayHelp.bind(this);
    };

    //Super prototype
    var s = BaseState.prototype;

    //Extend the base state
    var p = extend(GameState, BaseState);

    /**
     * Add custom tasks to the list of preload tasks
     * @param {array} tasks The list of task to preload
     */


    p.addTasks = function(tasks)
    {
        SpriteUtils.addSpritesRequest(
            this.config.spriteManifests.game,
            this.panel,
            tasks,
            'assets/images/sprites/');
    };

    /**
     * After assets are loaded and state is fully entered
     */


    /*p.enterDone = function()
    {
        this.game.messenger.on('playHelp', this._onPlayHelp);
        _tracker = this.game.tracker;
    };

    /**
     * Listens for playHelp message fired by the Help button
     * on the Kraken site/PBS app.
     */


    p._onPlayHelp = function()
    {
        // this.game.tracker.clickHelp(
        //     game_specific_tracking_paramter_1,
        //     game_specific_tracking_paramter_2
        // );
    };

    /**
     *
     */


    p.exitStart = function()
    {
        this.game.messenger.off('playHelp', this._onPlayHelp);
    };

    /**
     * When the state exists
     */
    p.exit = function()
    {
        s.exit.call(this);
    };

    //Assign to namespace
    namespace('cloudkid').GameState = GameState;
}());