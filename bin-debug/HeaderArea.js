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
        var _this = _super.call(this) || this;
        _this.configData = RES.getRes("config_json");
        return _this;
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
        this.userScoreLabel.y = 95;
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
        this.userScore.y = 95;
        this.userScore.textAlign = egret.HorizontalAlign.LEFT;
        this.userScore.textColor = 0xffffff;
        this.userScore.type = egret.TextFieldType.DYNAMIC;
        this.userScore.lineSpacing = 6;
        this.userScore.multiline = true;
        this.userScore.text = "0";
        this.targetScore = new egret.TextField;
        this.addChild(this.targetScore);
        this.targetScore.size = 30;
        this.targetScore.x = this.stage.stageWidth / 2 + 50;
        this.targetScore.y = 45;
        this.targetScore.textAlign = egret.HorizontalAlign.LEFT;
        this.targetScore.textColor = 0xffffff;
        this.targetScore.type = egret.TextFieldType.DYNAMIC;
        this.targetScore.lineSpacing = 6;
        this.targetScore.multiline = true;
        this.targetScore.text = "过关分数：" + this.configData.levelConfig.level_1.finishScore;
    };
    /**
     * 判断是否过关，
     * 如果过关，生成过关的提示
     * */
    HeaderArea.prototype.isFinish = function (userScore) {
        if (userScore === void 0) { userScore = 0; }
        if (userScore > this.configData.levelConfig.level_1.finishScore) {
            //生成文字提示
            this.finishLabel = new egret.TextField;
            this.addChild(this.finishLabel);
            this.finishLabel.size = 30;
            this.finishLabel.x = this.stage.stageWidth / 2 + 50;
            this.finishLabel.y = 160;
            this.finishLabel.textAlign = egret.HorizontalAlign.LEFT;
            this.finishLabel.textColor = 0xF56C6C;
            this.finishLabel.type = egret.TextFieldType.DYNAMIC;
            this.finishLabel.lineSpacing = 6;
            this.finishLabel.multiline = true;
            this.finishLabel.text = "恭喜你，过关了";
            //重置游戏区域、过关分数、得分等信息
        }
    };
    HeaderArea.prototype.countUp = function (length, score, interval) {
        if (score === void 0) { score = ""; }
        if (interval === void 0) { interval = 150; }
        var This = this;
        var _loop_1 = function (i) {
            egret.setTimeout(function () {
                This.userScore.text = (Number(This.userScore.text) + i * 10).toString();
                if (i === length) {
                    This.isFinish(Number(This.userScore.text));
                }
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