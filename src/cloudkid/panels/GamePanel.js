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