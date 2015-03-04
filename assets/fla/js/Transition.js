(function (lib, img, cjs) {

var p; // shortcut to reference prototypes

// library properties:
lib.properties = {
	width: 1024,
	height: 768,
	fps: 30,
	color: "#FFFFFF",
	manifest: []
};



// symbols:



(lib.Tween4 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhxmBGpMAAAiNRMDjNAAAMAAACNRg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-727.1,-452.1,1454.4,904.3);


(lib.Tween3 = function() {
	this.initialize();

	// Layer 1
	this.shape = new cjs.Shape();
	this.shape.graphics.f("#000000").s().p("EhxmBGpMAAAiNRMDjNAAAMAAACNRg");

	this.addChild(this.shape);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-727.1,-452.1,1454.4,904.3);


(lib.Tween1 = function() {
	this.initialize();

	// Layer 1
	this.text = new cjs.Text("loading", "bold 96px 'Nunito'", "#FFFFFF");
	this.text.textAlign = "center";
	this.text.lineHeight = 98;
	this.text.lineWidth = 594;
	this.text.setTransform(-2,-91);

	this.addChild(this.text);
}).prototype = p = new cjs.Container();
p.nominalBounds = new cjs.Rectangle(-298.9,-91,598,170.1);


// stage content:
(lib.Transition = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{hidden:0,onTransitionOut:1,onTransitionOut_stop:11,transitionLoop:12,transitionLoop_loop:32,onTransitionIn:33,onTransitionIn_stop:45});

	// loading text
	this.instance = new lib.Tween1("synched",0);
	this.instance.setTransform(510,343);
	this.instance.alpha = 0;
	this.instance._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance).wait(12).to({_off:false},0).to({alpha:1},8).to({startPosition:0},5).to({alpha:0},6).wait(15));

	// Layer 1
	this.instance_1 = new lib.Tween3("synched",0);
	this.instance_1.setTransform(1769.5,388.1);
	this.instance_1._off = true;

	this.instance_2 = new lib.Tween4("synched",0);
	this.instance_2.setTransform(587.2,388.1);
	this.instance_2._off = true;

	this.timeline.addTween(cjs.Tween.get(this.instance_1).wait(1).to({_off:false},0).wait(1).to({x:1442.8},0).wait(1).to({x:1177.3},0).wait(1).to({x:977.1},0).wait(1).to({x:836.9},0).wait(1).to({x:744.5},0).wait(1).to({x:686.1},0).wait(1).to({x:649.8},0).wait(1).to({x:626.8},0).wait(1).to({x:611},0).wait(1).to({x:598.7},0).to({_off:true},1).wait(34));
	this.timeline.addTween(cjs.Tween.get(this.instance_2).wait(12).to({_off:false},0).wait(20).to({startPosition:0},0).to({x:-739.2},13).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = null;

})(lib = lib||{}, images = images||{}, createjs = createjs||{});
var lib, images, createjs;