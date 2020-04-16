class Main extends eui.UILayer {


    protected createChildren(): void {
        super.createChildren();

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
        })

        egret.lifecycle.onPause = () => {
            egret.ticker.pause();
        }

        egret.lifecycle.onResume = () => {
            egret.ticker.resume();
        }

        //inject the custom material parser
        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());


        this.runGame().catch(e => {
            console.log(e);
        })
    }

    private async runGame() {
        await this.loadResource()
        this.createGameScene();

    }

    private async loadResource() {
        try {
            const loadingView = new LoadingUI();
            this.stage.addChild(loadingView);
            // await RES.loadConfig("https://static.adwangmai.com/game/wxgame-test/xiaoxiaoxiao_wxgame_remote/resource/default.res.json", "https://static.adwangmai.com/game/wxgame-test/xiaoxiaoxiao_wxgame_remote/resource/");
            await RES.loadConfig("resource/default.res.json", "resource/");
            await this.loadTheme();
            await RES.loadGroup("preload", 0, loadingView);
            this.stage.removeChild(loadingView);
        }
        catch (e) {
            console.error(e);
        }
    }

    private loadTheme() {
        return new Promise((resolve, reject) => {
            // load skin theme configuration file, you can manually modify the file. And replace the default skin.
            //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
            // let theme = new eui.Theme("https://static.adwangmai.com/game/wxgame-test/xiaoxiaoxiao_wxgame_remote/resource/default.thm.json", this.stage);
            let theme = new eui.Theme("resource/default.thm.json", this.stage);
            theme.addEventListener(eui.UIEvent.COMPLETE, () => {
                resolve();
            }, this);

        })
    }

    private textfield: egret.TextField;
    /**
     * 创建场景界面
     * Create scene interface
     */
    protected createGameScene(): void {
        // let sky = this.createBitmapByName("bg_jpg");
        // this.addChild(sky);
        // let stageW = this.stage.stageWidth;
        // let stageH = this.stage.stageHeight;
        // sky.width = stageW;
        // sky.height = stageH;
        //生成游戏整体背景
        this.createBg()

        GameData.stageWidth = this.stage.stageWidth;
        GameData.stageHeight = this.stage.stageHeight;

        //加载背景音乐
        let gameSound = new GameSound()
        this.addChild(gameSound)
        gameSound.loadBgSound()

        //生成头部区域
        let headerArea: HeaderArea = new HeaderArea()
        this.addChild(headerArea)
        headerArea.renderArea()

        //生成游戏区域
        let gameArea: GameArea = new GameArea(headerArea)
        this.addChild(gameArea)
        gameArea.renderArea()

        //生成道具区域
        let gameTools: GameTools = new GameTools(gameArea)
        this.addChild(gameTools)
        gameTools.generateTools()

    }
    /**
     * 根据name关键字创建一个Bitmap对象。name属性请参考resources/resource.json配置文件的内容。
     * Create a Bitmap object according to name keyword.As for the property of name please refer to the configuration file of resources/resource.json.
     */
    private createBitmapByName(name: string): egret.Bitmap {
        let result = new egret.Bitmap();
        let texture: egret.Texture = RES.getRes(name);
        result.texture = texture;
        return result;
    }

    /**
     * 创建游戏纯色背景
     */
    private createBg(): void {
        let shape: egret.Shape = new egret.Shape()
        shape.graphics.beginFill(0x483D8B)
        shape.graphics.lineStyle(2, 0x483D8B)
        shape.graphics.drawRect(0, 0, this.stage.stageWidth, this.stage.stageHeight)
        shape.graphics.endFill()
        this.addChild(shape)
    }
}
