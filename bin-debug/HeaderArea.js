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
var HeaderArea = (function (_super) {
    __extends(HeaderArea, _super);
    function HeaderArea() {
        return _super.call(this) || this;
    }
    /**
     * 生成用户头像，分数
     */
    HeaderArea.prototype.renderArea = function () {
        var touxiang = Util.createBitmapByName('touxiang_png');
        touxiang.width = this.stage.stageWidth / 6;
        touxiang.height = this.stage.stageWidth / 6;
        touxiang.x = 20;
        touxiang.y = 20;
        this.addChild(touxiang);
        //提示信息
        this.userName = new egret.TextField;
        this.addChild(this.userName);
        this.userName.size = 28;
        this.userName.x = this.stage.stageWidth / 6 + 30;
        this.userName.y = 45;
        this.userName.textAlign = egret.HorizontalAlign.LEFT;
        this.userName.textColor = 0xffffff;
        this.userName.type = egret.TextFieldType.DYNAMIC;
        this.userName.lineSpacing = 6;
        this.userName.multiline = true;
        this.userName.text = "开心消消消\n测试小demo";
        //得分
        this.userScoreLabel = new egret.TextField;
        this.addChild(this.userScoreLabel);
        this.userScoreLabel.size = 30;
        this.userScoreLabel.x = this.stage.stageWidth / 2 + 50;
        this.userScoreLabel.y = 45;
        this.userScoreLabel.textAlign = egret.HorizontalAlign.LEFT;
        this.userScoreLabel.textColor = 0xffffff;
        this.userScoreLabel.type = egret.TextFieldType.DYNAMIC;
        this.userScoreLabel.lineSpacing = 6;
        this.userScoreLabel.multiline = true;
        this.userScoreLabel.text = "得分：";
        this.userScore = new egret.TextField;
        this.addChild(this.userScore);
        this.userScore.size = 30;
        this.userScore.x = this.stage.stageWidth / 2 + 150;
        this.userScore.y = 45;
        this.userScore.textAlign = egret.HorizontalAlign.LEFT;
        this.userScore.textColor = 0xffffff;
        this.userScore.type = egret.TextFieldType.DYNAMIC;
        this.userScore.lineSpacing = 6;
        this.userScore.multiline = true;
        this.userScore.text = "0";
    };
    HeaderArea.prototype.countUp = function (length, score, interval) {
        if (score === void 0) { score = ""; }
        if (interval === void 0) { interval = 150; }
        var This = this;
        var _loop_1 = function (i) {
            egret.setTimeout(function () {
                This.userScore.text = (Number(This.userScore.text) + i * 10).toString();
            }, i, interval * i);
        };
        for (var i = 1; i <= length; i++) {
            _loop_1(i);
        }
    };
    HeaderArea.prototype.updateScore = function (evt) {
        evt._headerArea.countUp(evt._sameTypeCellsNum);
    };
    return HeaderArea;
}(egret.DisplayObjectContainer));
__reflect(HeaderArea.prototype, "HeaderArea");
//# sourceMappingURL=HeaderArea.js.map