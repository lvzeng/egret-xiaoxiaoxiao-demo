class HeaderArea extends egret.DisplayObjectContainer {

	public userName: egret.TextField

	public constructor() {
		super()
	}

	/**
	 * 生成用户头像
	 */
	public renderArea() {
		let touxiang = Util.createBitmapByName('touxiang_png')
		touxiang.width = this.stage.stageWidth / 6
		touxiang.height = this.stage.stageWidth / 6
		touxiang.x = 20
		touxiang.y = 20
		this.addChild(touxiang)

		/// 提示信息
		this.userName = new egret.TextField;
		this.addChild(this.userName);

		this.userName.size = 28;
		this.userName.x = this.stage.stageWidth / 6 + 30
		this.userName.y = 45;
		this.userName.textAlign = egret.HorizontalAlign.LEFT;
		this.userName.textColor = 0xffffff;
		this.userName.type = egret.TextFieldType.DYNAMIC;
		this.userName.lineSpacing = 6;
		this.userName.multiline = true;

		this.userName.text =
			"开心消消消\n测试小demo";
	}
}