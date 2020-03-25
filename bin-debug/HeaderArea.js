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
     * 生成用户头像
     */
    HeaderArea.prototype.renderArea = function () {
        var touxiang = Util.createBitmapByName('touxiang_png');
        touxiang.width = this.stage.stageWidth / 6;
        touxiang.height = this.stage.stageWidth / 6;
        touxiang.x = 20;
        touxiang.y = 20;
        this.addChild(touxiang);
        /// 提示信息
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
        this.userName.text =
            "开心消消消\n测试小demo";
    };
    return HeaderArea;
}(egret.DisplayObjectContainer));
__reflect(HeaderArea.prototype, "HeaderArea");
//# sourceMappingURL=HeaderArea.js.map