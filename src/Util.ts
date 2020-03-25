class Util {
	public constructor() {
	}

	/**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     */
	public static createBitmapByName(name: string): egret.Bitmap {
		let result = new egret.Bitmap();
		let texture: egret.Texture = RES.getRes(name);
		result.texture = texture;
		return result;
	}

	/**
     * 生成 min <= r <= max 的随机数
     */
	public static randomNum(minNum: number, maxNum: number): number {
		let Range = maxNum - minNum;
		let Rand = Math.random();
		let num = minNum + Math.round(Rand * Range);
		return num;
	}

}