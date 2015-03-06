(function()
{
    //Import classes
    var AssetUtils = include('pbskids.createjs.AssetUtils'),
        BasePanel = include('pbskids.createjs.BasePanel'),
        Container = include('createjs.Container'),
        SpriteUtils = include('pbskids.createjs.SpriteUtils');

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
         * The constructed game stage
         * @property {createjs.Container} skin
         */
        this.skin = new lib.Game();
        this.addChild(this.skin);
        /**
         * A public reference to 'this' for the scaling system
         * @property {createjs.Container} scalingPanel
         */
        this.scalingPanel = this;

        this.backButton = SpriteUtils.createSoundButton.call(this, 'BackButton');
        this.backButton.x = 315;
        this.backButton.y = 175;
        this.addChild(this.backButton);

        this.replayButton = SpriteUtils.createSoundButton.call(this, 'ReplayButton');
        this.replayButton.x = 433;
        this.replayButton.y = 175;
        this.addChild(this.replayButton);

        this.nextButton = SpriteUtils.createSoundButton.call(this, 'NextButton');
        this.nextButton.x = 602;
        this.nextButton.y = 176;
        this.addChild(this.nextButton);

        this.srcButton = SpriteUtils.createSoundButton.call(this, 'src');
        this.srcButton.x = 200;
        this.srcButton.y = 320;
        this.addChild(this.srcButton);

        this.numbersButton = SpriteUtils.createSoundButton.call(this, 'numbers');
        this.numbersButton.x = 875;
        this.numbersButton.y = 45;
        this.addChild(this.numbersButton);

        this.soundId = new createjs.Text("Click Replay", "32px Arial", "#000000");
        this.soundId.x = 260;
        this.soundId.y = 390;
        this.addChild(this.soundId);

        this.numberId = new createjs.Text("1", "32px Arial", "#000000");
        this.numberId.x = 895;
        this.numberId.y = 114;
        this.addChild(this.numberId);


    

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