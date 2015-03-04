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
            debug: DEBUG
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
        if (DEBUG && pbskids.DebugOptions)
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
        if (DEBUG)
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
