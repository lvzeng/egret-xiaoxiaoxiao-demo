class GameSound extends egret.DisplayObjectContainer {

	public constructor() {
		super()
	}
	/**
	 * 生成背景音乐
	 */
	public loadBgSound(): void {
		let sound: egret.Sound = new egret.Sound()
		let play = () => {
			sound.play(0, 0)
			this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, play, this)
		}
		//sound 加载完成监听
		sound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
			this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, play, this)
		}, this);

		sound.load("resource/assets/sound/tempMusic.mp3");

	}

	/**
	 * 生成点击音乐
	 */

	private clickSound: egret.Sound

	public loadClickSound(): void {

		if (!this.clickSound) {
			this.clickSound = new egret.Sound()
			//sound 加载完成监听
			this.clickSound.addEventListener(egret.Event.COMPLETE, function (e: egret.Event) {
				this.clickSound.play(0, 1)
			}, this);

			this.clickSound.load("resource/assets/sound/click.mp3");
		} else {
			this.clickSound.play(0, 1)
		}

	}



}