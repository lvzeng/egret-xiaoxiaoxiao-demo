var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Util = (function () {
    function Util() {
    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
    Util.createBitmapByName = function (name) {
        var result = new egret.Bitmap();
        var texture = RES.getRes(name);
        result.texture = texture;
        return result;
    };
    /**
     * 生成 min <= r <= max 的随机数
     */
    Util.randomNum = function (minNum, maxNum) {
        var Range = maxNum - minNum;
        var Rand = Math.random();
        var num = minNum + Math.round(Rand * Range);
        return num;
    };
    return Util;
}());
__reflect(Util.prototype, "Util");
//# sourceMappingURL=Util.js.map