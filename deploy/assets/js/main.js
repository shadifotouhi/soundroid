(function()
{
    //Import classes
    var AssetUtils = include('pbskids.createjs.AssetUtils'),
        BasePanel = include('pbskids.createjs.BasePanel'),
        Container = include('createjs.Container');

    /**
     * Panel contains all of the visual elements for the Game state
     * @class cloudkid.GamePanel
     * @extends pbskids.createjs.BasePanel
     */
    var GamePanel = function()
    {
        BasePanel.call(this);
    };

    //Super prototype
    var s = BasePanel.prototype;

    //Extend the base panel
    var p = extend(GamePanel, BasePanel);

    /**
     * Setup the state, this happens on each state entering
     */
    p.setup = function()
    {
        /**
         * A public reference to 'this' for the scaling system
         * @property {createjs.Container} scalingPanel
         */
        this.scalingPanel = this;

        /**
         * The constructed game stage
         * @property {createjs.Container} skin
         */
        this.skin = new lib.Game();
        this.addChild(this.skin);
    };

    /**
     * Un-setup the panel when exiting the state
     */
    p.teardown = function()
    {
        AssetUtils.remove(
            this,
            this.skin);

        this.skin = null;

        //If scaling the panel directly using the "this.scalingPanel = this"
        //the panel's scale needs to be reset or it will start at the wrong 
        //scale on manager.refresh()
        this.scaleX = this.scaleY = 1;
        this.x = this.y = 0;
    };

    /**
     * Don't use after this
     */
    p.destroy = function()
    {
        this.scalingPanel = null;
        s.destroy.call(this);
    };

    //Assign to namespace
    namespace('cloudkid').GamePanel = GamePanel;
}());
(function()
{
    //Import classes
    var AssetUtils = include('pbskids.createjs.AssetUtils'),
        BasePanel = include('pbskids.createjs.BasePanel'),
        Bitmap = include('createjs.Bitmap'),
        DwellTimer = include('pbskids.createjs.DwellTimer'),
        SpriteUtils = include('pbskids.createjs.SpriteUtils');

    /**
     * Panel contains all of the visual elements for the title state
     * @class cloudkid.TitlePanel
     * @extends pbskids.createjs.BasePanel
     */
    var TitlePanel = function()
    {
        BasePanel.call(this);
    };

    //Super prototype
    var s = BasePanel.prototype;

    //Extend the base panel
    var p = extend(TitlePanel, BasePanel);

    /**
     * Setup the state, this happens on each state entering
     */
    p.setup = function()
    {
        this.background = new Bitmap(images.TitleBackground);
        this.background.name = 'TitleBackground';
        this.addChildAt(this.background, 0);
        DwellTimer.create(this.background);

        this.playButton = SpriteUtils.createSoundButton.call(this, 'PlayButton');
        var data = this.game.config.sprites.playButton;
        this.playButton.x = data.x;
        this.playButton.y = data.y;
        this.addChild(this.playButton);
    };

    /**
     * Un-setup the panel when exiting the state
     */
    p.teardown = function()
    {
        AssetUtils.remove(
            this,
            this.background,
            this.playButton);

        this.background = null;
        this.playButton = null;
    };

    //Assign to namespace
    namespace('cloudkid').TitlePanel = TitlePanel;
}());
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
        this.panel.background.on("click", this.onPlay);
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
(function()
{
    // Library depencencies
    var ListTask = include('springroll.ListTask'),
        Game = include('pbskids.createjs.Game');

    /**
     * The main class of the game
     * @class soundroid
     * @extends pbskids.createjs.Game
     */
    var soundroid = function()
    {
        Game.call(this,
        {
            fps: 24,
            name: 'soundroid', // Name of the game
            state: 'title', // Initial state
            debug: true
        });

        //Callback to add the states
        this.once('addStates', _onAddStates.bind(this));

        //Concatenate create.js manifests if needed
        this.once('statesReady', _onStatesReady.bind(this));

        //If the transition has assets that need to loaded,
        this.once("manifestLoaded", _onManifestLoaded.bind(this));

        // Creates the transition here rather than object merge
        // if transition assets need to be loaded
        this.once("initStates", _onInitStates.bind(this));

        // Log out the qeury options
        if (true && pbskids.DebugOptions)
        {
            pbskids.DebugOptions
                .string('state', 'title, game')
                .boolean('mute', 'mute all sounds')
                .log();
        }
    };

    // Extend the base game class
    var p = extend(soundroid, Game);

    /**
     * Add the states for this games
     * @method _onAddStates
     * @private
     */
    var _onAddStates = function()
    {
        this.addStates(
        {
            title: new cloudkid.TitleState(),
            game: new cloudkid.GameState()
        });
    };

    /**
     * Load bitmap assets need for the transition
     * @method _onManifestLoaded
     * @private
     */
    var _onManifestLoaded = function(taskManager)
    {
        // the loaded deploy/assets/config/manifest.json,
        // a concatenated file of the manifests object found
        // in all the assets/fla/js/*.js files that createjs exported
        this.createJSManifests = this.manifests;

        // configManifests are elements placed manually in the 
        // deploy/assets/ folders (eg PlayButton.jpg) and referenced 
        // in src/cloudkid/config/manifests.json 
        this.configManifests = this.config.manifests;

        /**
         Example manifest concatentation:
         The game has a in-state reward animation that lives
         in it's own .fla and needs it's assets loaded along with the
         main Game.fla's assets on GameState.js load
         note: manifests are converted to all lowercase
         
            this.configManifests.game = this.configManifests.game.concat(
                this.createJSManifests.rewardanimation,
                this.createJSManifests.otheranimation
            );
            
         */

        var transitionAssets = this.manifests.transition;
        if (transitionAssets.length)
        {
            taskManager.addTask(
                new ListTask(
                    "transitionAssets",
                    transitionAssets,
                    _onAdditionalAssetsLoaded
                )
            );
        }
    };

    /**
     * Add additional assets to the image dictionary
     * @method _onAdditionalAssetsLoaded
     * @private
     */
    var _onAdditionalAssetsLoaded = function(results)
    {
        for (var id in results)
        {
            images[id] = results[id].content;
        }
    };

    /**
     * After images for transition are loaded,
     * Set the transition to the appropriate createjs.Lib
     * @method _onInitStates
     * @private
     */
    var _onInitStates = function()
    {
        this.transition = new lib.Transition();
    };

    /**
     * Add additional .fla manifests to any state's inherent manifest
     * @method _onStatesReady
     * @private
     */
    var _onStatesReady = function()
    {
        if (true)
        {
            this.tracker.on('track', function(data)
            {
                Debug.log(data.event_data);
            });
        }
    };

    // Assign to namespace
    namespace('cloudkid').soundroid = soundroid;

    // Create the app
    window.app = new soundroid();

}());

//# sourceMappingURL=main.js.map