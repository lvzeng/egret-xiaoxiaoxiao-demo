class GameTools extends egret.DisplayObjectContainer {

	//锤子道具是否激活
	public static chuiziActive: boolean = false

	private gameArea

	public constructor(gameArea) {
		super()

		this.gameArea = gameArea
	}

	//生成刷新按钮、锤子
	public generateTools() {

		let shuaxin = Util.createBitmapByName('shuaxin_png')
		shuaxin.width = this.stage.stageWidth / 12
		shuaxin.height = this.stage.stageWidth / 12
		shuaxin.x = 30
		shuaxin.y = 150
		shuaxin.touchEnabled = true
		shuaxin.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.scale(shuaxin)
			this.gameArea.restart()
		}, this)
		this.addChild(shuaxin)

		let chuiziN = Util.createBitmapByName('chuizi-normal_png')
		chuiziN.width = this.stage.stageWidth / 12
		chuiziN.height = this.stage.stageWidth / 12
		chuiziN.x = 120
		chuiziN.y = 150
		chuiziN.touchEnabled = true
		chuiziN.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.removeChild(chuiziN)
			this.addChild(chuizi)
			GameTools.chuiziActive = true
		}, this)
		this.addChild(chuiziN)

		let chuizi = Util.createBitmapByName('chuizi_png')
		chuizi.width = this.stage.stageWidth / 12
		chuizi.height = this.stage.stageWidth / 12
		chuizi.x = 120
		chuizi.y = 150
		chuizi.touchEnabled = true
		chuizi.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
			this.removeChild(chuizi)
			this.addChild(chuiziN)
			GameTools.chuiziActive = false
		}, this)


	}

	//生成刷新和锤子道具可用的次数


	private scale(target: egret.Bitmap, isLoop: boolean = false) {
		let tw: egret.Tween = egret.Tween.get(target, { loop: isLoop })
		tw.to({ scaleX: 1.2, scaleY: 1.2 }, 300, egret.Ease.cubicInOut)
			.to({ scaleX: 1, scaleY: 1 }, 300, egret.Ease.cubicInOut)

	}

}