var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var GameSound = (function (_super) {
    __extends(GameSound, _super);
    function GameSound() {
        return _super.call(this) || this;
    }
    /**
     * 生成背景音乐
     */
    GameSound.prototype.loadBgSound = function () {
        var _this = this;
        var sound = new egret.Sound();
        var play = function () {
            sound.play(0, 0);
            _this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, play, _this);
        };
        //sound 加载完成监听
        sound.addEventListener(egret.Event.COMPLETE, function (e) {
            this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, play, this);
        }, this);
        sound.load("resource/assets/sound/tempMusic.mp3");
    };
    GameSound.prototype.loadClickSound = function () {
        if (!this.clickSound) {
            this.clickSound = new egret.Sound();
            //sound 加载完成监听
            this.clickSound.addEventListener(egret.Event.COMPLETE, function (e) {
                this.clickSound.play(0, 1);
            }, this);
            this.clickSound.load("resource/assets/sound/click.mp3");
        }
        else {
            this.clickSound.play(0, 1);
        }
    };
    return GameSound;
}(egret.DisplayObjectContainer));
__reflect(GameSound.prototype, "GameSound");
//# sourceMappingURL=GameSound.js.map