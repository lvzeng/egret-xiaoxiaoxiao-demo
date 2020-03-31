class HeaderArea extends egret.DisplayObjectContainer {

	public userName: egret.TextField

	//用户在当前关卡所得的分数
	private userScoreLabel: egret.TextField
	private userScore: egret.TextField

	public constructor() {
		super()
	}

	/**
	 * 生成用户头像，分数
	 */
	public renderArea() {
		let touxiang = Util.createBitmapByName('touxiang_png')
		touxiang.width = this.stage.stageWidth / 6
		touxiang.height = this.stage.stageWidth / 6
		touxiang.x = 20
		touxiang.y = 20
		this.addChild(touxiang)

		//提示信息
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
		this.userName.text = "开心消消消\n测试小demo";

		//得分
		this.userScoreLabel = new egret.TextField;
		this.addChild(this.userScoreLabel);
		this.userScoreLabel.size = 30;
		this.userScoreLabel.x = this.stage.stageWidth / 2 + 50
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
		this.userScore.x = this.stage.stageWidth / 2 + 150
		this.userScore.y = 45;
		this.userScore.textAlign = egret.HorizontalAlign.LEFT;
		this.userScore.textColor = 0xffffff;
		this.userScore.type = egret.TextFieldType.DYNAMIC;
		this.userScore.lineSpacing = 6;
		this.userScore.multiline = true;
		this.userScore.text = "0";
	}

	private countUp(length: number, score: string = "", interval: number = 150): void {
		let This = this
		for (let i = 1; i <= length; i++) {
			egret.setTimeout(function () {
				This.userScore.text = (Number(This.userScore.text) + i * 10).toString()
			}, i, interval * i)
		}
	}

	public updateScore(evt: ViewManageEvent) {
		evt._headerArea.countUp(evt._sameTypeCellsNum)
	}
}