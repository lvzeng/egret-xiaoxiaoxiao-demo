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
var GameTools = (function (_super) {
    __extends(GameTools, _super);
    function GameTools(gameArea) {
        var _this = _super.call(this) || this;
        _this.gameArea = gameArea;
        return _this;
    }
    //生成刷新按钮、锤子
    GameTools.prototype.generateTools = function () {
        var _this = this;
        var shuaxin = Util.createBitmapByName('shuaxin_png');
        shuaxin.width = this.stage.stageWidth / 12;
        shuaxin.height = this.stage.stageWidth / 12;
        shuaxin.x = 30;
        shuaxin.y = 150;
        shuaxin.touchEnabled = true;
        shuaxin.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.scale(shuaxin);
            _this.gameArea.restart();
        }, this);
        this.addChild(shuaxin);
        var chuiziN = Util.createBitmapByName('chuizi-normal_png');
        chuiziN.width = this.stage.stageWidth / 12;
        chuiziN.height = this.stage.stageWidth / 12;
        chuiziN.x = 120;
        chuiziN.y = 150;
        chuiziN.touchEnabled = true;
        chuiziN.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeChild(chuiziN);
            _this.addChild(chuizi);
            GameTools.chuiziActive = true;
        }, this);
        this.addChild(chuiziN);
        var chuizi = Util.createBitmapByName('chuizi_png');
        chuizi.width = this.stage.stageWidth / 12;
        chuizi.height = this.stage.stageWidth / 12;
        chuizi.x = 120;
        chuizi.y = 150;
        chuizi.touchEnabled = true;
        chuizi.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
            _this.removeChild(chuizi);
            _this.addChild(chuiziN);
            GameTools.chuiziActive = false;
        }, this);
    };
    //生成刷新和锤子道具可用的次数
    GameTools.prototype.scale = function (target, isLoop) {
        if (isLoop === void 0) { isLoop = false; }
        var tw = egret.Tween.get(target, { loop: isLoop });
        tw.to({ scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.cubicInOut)
            .to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.cubicInOut);
    };
    //锤子道具是否激活
    GameTools.chuiziActive = false;
    return GameTools;
}(egret.DisplayObjectContainer));
__reflect(GameTools.prototype, "GameTools");
//# sourceMappingURL=GameTools.js.map