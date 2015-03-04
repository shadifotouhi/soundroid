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