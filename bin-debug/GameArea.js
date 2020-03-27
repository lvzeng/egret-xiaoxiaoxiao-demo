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
var GameArea = (function (_super) {
    __extends(GameArea, _super);
    function GameArea() {
        var _this = _super.call(this) || this;
        _this.gameSound = new GameSound();
        _this.configData = RES.getRes("config_json");
        //元素方块的宽高
        _this.cellWidthHeight = GameData.stageWidth / 10;
        //游戏区域上下左右边界
        _this.gameAreaLimit = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        };
        //用于保存游戏区域全部元素方块的二维数组
        _this.imgArry = [];
        //用于保存每次点击元素方块后，寻找到的与被点击元素相同type的元素方块
        _this.sameTypeCells = [];
        //用于保存每次点击方块的typeIndex
        _this.cellTypeIndex = 99;
        _this.sameTypeCellsLength = 0;
        /**
         * 根据当前方块的y值，判断是否需要进行下移
         * 如果需要下移，计算出需要下移的距离
         */
        _this.colObj = {};
        return _this;
    }
    /**
     * renderArea生成10*10的游戏区域
     */
    GameArea.prototype.renderArea = function () {
        var _this = this;
        this.imgArry = [];
        for (var i = 0; i <= 9; i++) {
            var row = [];
            var _loop_1 = function (j) {
                var rIndex = Util.randomNum(this_1.configData.cellImgMinIndex, this_1.configData.cellImgMaxIndex);
                var RiconName = 'cell-' + rIndex + '_png';
                var rIcon = Util.createBitmapByName(RiconName);
                rIcon.width = this_1.cellWidthHeight;
                rIcon.height = this_1.cellWidthHeight;
                rIcon.x = j * this_1.cellWidthHeight;
                rIcon.y = this_1.stage.stageHeight - this_1.stage.stageWidth + (i - 1) * this_1.cellWidthHeight;
                rIcon.touchEnabled = true;
                var rItem = {
                    icon: rIcon,
                    typeIndex: rIndex,
                    rowIndex: i,
                    colIndex: j,
                    x: j * this_1.cellWidthHeight,
                    y: this_1.stage.stageHeight - this_1.stage.stageWidth + (i - 1) * this_1.cellWidthHeight,
                    isRemove: false,
                    hasYMove: false,
                    hasXMove: false
                };
                row.push(rItem);
                this_1.addChild(rIcon);
                rIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    //点击元素方块时播放点击音乐
                    _this.gameSound.loadClickSound();
                    _this.cellTypeIndex = rItem.typeIndex;
                    _this.handleClickCell(rItem);
                    _this.time();
                }, this_1);
                if (i === 0 && j === 0) {
                    this_1.gameAreaLimit.left = rIcon.x;
                    this_1.gameAreaLimit.top = rIcon.y;
                }
                if (i === 9 && j === 9) {
                    this_1.gameAreaLimit.right = rIcon.x;
                    this_1.gameAreaLimit.bottom = rIcon.y;
                }
            };
            var this_1 = this;
            for (var j = 0; j <= 9; j++) {
                _loop_1(j);
            }
            this.imgArry.push(row);
        }
    };
    /**
     * 判断给定坐标的方块上下左右是否有与它相同 typeIndex 的方块，
     * 如果有，并且四周的方块还未放入 sameTypeCells 数组，则放入
     * 根据当前点击方块的x，y坐标进行上下左右查找
     */
    GameArea.prototype.handleClickCell = function (rItem) {
        var flag = false;
        //先判断当前坐标的方块是否存在于sameTypeCells
        for (var k = 0; k < this.sameTypeCells.length; k++) {
            if (this.sameTypeCells[k].rowIndex === rItem.rowIndex && this.sameTypeCells[k].colIndex === rItem.colIndex) {
                flag = true;
                break;
            }
        }
        if (!flag && rItem.typeIndex === this.cellTypeIndex && rItem.typeIndex != 99) {
            this.sameTypeCells.push(rItem);
            //上
            if (rItem.y > this.gameAreaLimit.top) {
                if (this.findCellByXy(rItem.x, rItem.y - this.cellWidthHeight)) {
                    this.handleClickCell(this.findCellByXy(rItem.x, rItem.y - this.cellWidthHeight));
                }
            }
            //下
            if (rItem.rowIndex < this.gameAreaLimit.bottom) {
                if (this.findCellByXy(rItem.x, rItem.y + this.cellWidthHeight)) {
                    this.handleClickCell(this.findCellByXy(rItem.x, rItem.y + this.cellWidthHeight));
                }
            }
            //左
            if (rItem.colIndex > this.gameAreaLimit.left) {
                if (this.findCellByXy(rItem.x - this.cellWidthHeight, rItem.y)) {
                    this.handleClickCell(this.findCellByXy(rItem.x - this.cellWidthHeight, rItem.y));
                }
            }
            //右
            if (rItem.colIndex < this.gameAreaLimit.right) {
                if (this.findCellByXy(rItem.x + this.cellWidthHeight, rItem.y)) {
                    this.handleClickCell(this.findCellByXy(rItem.x + this.cellWidthHeight, rItem.y));
                }
            }
        }
    };
    /**
     * 根据x，y值查找对应的元素方块
     */
    GameArea.prototype.findCellByXy = function (x, y) {
        var targetItem;
        var flag = false;
        for (var i = 0; i <= 9; i++) {
            if (flag) {
                break;
            }
            for (var j = 0; j <= 9; j++) {
                if (!this.imgArry[i][j].isRemove && this.imgArry[i][j].x === x && this.imgArry[i][j].y === y) {
                    targetItem = this.imgArry[i][j];
                    flag = true;
                    break;
                }
            }
        }
        return targetItem;
    };
    GameArea.prototype.countCol = function () {
        for (var i = 0; i <= 9; i++) {
            this.colObj[i] = [];
        }
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                this.colObj[j].push(this.imgArry[i][j]);
            }
        }
    };
    GameArea.prototype.findYMoveNum = function (rItem) {
        var yMoveNum = 0;
        if (!rItem.isRemove) {
            for (var i = 0; i <= 9; i++) {
                if (this.colObj[rItem.colIndex][i].y > rItem.y && this.colObj[rItem.colIndex][i].isRemove && !this.colObj[rItem.colIndex][i].hasYMove) {
                    yMoveNum += 1;
                }
            }
        }
        return yMoveNum * this.cellWidthHeight;
    };
    GameArea.prototype.countColClear = function () {
        if (!this.colClearObj) {
            this.colClearObj = {};
            for (var i = 0; i <= 9; i++) {
                this.colClearObj[i] = {
                    isAllRemove: false,
                    hasXMove: false //整列是否已经移动过
                };
            }
        }
        for (var i = 0; i <= 9; i++) {
            var removeNum = 0;
            var hasAllXMove = 0;
            for (var j = 0; j <= 9; j++) {
                if (this.colObj[i][j].isRemove) {
                    removeNum += 1;
                }
                if (j === 0) {
                    this.colClearObj[i].x = this.colObj[i][j].x;
                }
                if (this.colObj[i][j].hasXMove) {
                    hasAllXMove += 1;
                }
            }
            if (removeNum === 10) {
                this.colClearObj[i].isAllRemove = true;
            }
            if (hasAllXMove === 10) {
                //如果该列的每一项都移动过，则整列移动过
                this.colClearObj[i].hasXMove = true;
            }
        }
    };
    GameArea.prototype.findXMoveNum = function (colItem) {
        var xMoveNum = 0;
        if (!colItem.isAllRemove) {
            for (var i = 0; i <= 9; i++) {
                if (this.colClearObj[i].x < colItem.x && this.colClearObj[i].isAllRemove && !this.colClearObj[i].hasXMove) {
                    xMoveNum += 1;
                }
            }
        }
        return xMoveNum * this.cellWidthHeight;
    };
    /**
     * 将方块设置为可点击或者是不可点击
     */
    GameArea.prototype.switchCellTouchEnabled = function (touchEnabled) {
        for (var i = 0; i <= 9; i++) {
            for (var j = 0; j <= 9; j++) {
                if (!this.imgArry[i][j].isRemove) {
                    this.imgArry[i][j].icon.touchEnabled = touchEnabled;
                }
            }
        }
    };
    GameArea.prototype.time = function () {
        if (!this.timer) {
            this.timer = new egret.Timer(50, 0);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        this.timer.start();
    };
    GameArea.prototype.timerFunc = function () {
        var _this = this;
        if (this.sameTypeCellsLength != this.sameTypeCells.length) {
            this.sameTypeCellsLength = this.sameTypeCells.length;
        }
        else {
            this.timer.stop();
            if (this.sameTypeCells.length > 1) {
                //移动开始后方块不可点击
                this.switchCellTouchEnabled(false);
                // let event: ViewManageEvent = new ViewManageEvent(ViewManageEvent.CELL_MOVE_START)
                // this.dispatchEvent(event);
                /************************* 一、先执行上方方块下移操作 ***************************/
                for (var k = 0; k < this.sameTypeCells.length; k++) {
                    // egret.Tween.get(this.sameTypeCells[k].icon)
                    // 	.to({ scaleX: 1.2, scaleY: 1.2 }, 200, egret.Ease.cubicInOut)
                    // 	.to({ scaleX: 0.1, scaleY: 0.1 }, 200, egret.Ease.cubicInOut)
                    this.removeChild(this.sameTypeCells[k].icon);
                    this.sameTypeCells[k].isRemove = true;
                }
                this.countCol();
                for (var i = 9; i >= 0; i--) {
                    for (var j = 0; j <= 9; j++) {
                        var moveY = this.findYMoveNum(this.imgArry[i][j]);
                        if (moveY > 0) {
                            this.imgArry[i][j].y += moveY;
                            egret.Tween.get(this.imgArry[i][j].icon)
                                .to({ y: this.imgArry[i][j].icon.y - 13 }, 200, egret.Ease.sineIn)
                                .to({ y: this.imgArry[i][j].icon.y + moveY }, 500, egret.Ease.sineIn);
                        }
                    }
                }
                //确保每个方块在上方方块计算移动距离时只使用一次
                for (var k = 0; k < this.sameTypeCells.length; k++) {
                    this.sameTypeCells[k].hasYMove = true;
                }
                /************************* 二、再执行右方方块左移操作 ***************************/
                this.countColClear();
                for (var i = 0; i <= 9; i++) {
                    for (var j = 0; j <= 9; j++) {
                        var moveX = this.findXMoveNum(this.imgArry[i][j]);
                        if (moveX > 0) {
                            this.imgArry[i][j].x -= moveX;
                            egret.Tween.get(this.imgArry[i][j].icon)
                                .to({ x: this.imgArry[i][j].icon.x - moveX }, 300, egret.Ease.sineIn)
                                .call(function () {
                                // this.switchCellTouchEnabled(true)
                            });
                        }
                    }
                }
                //确保每列方块在右方整列方块计算移动距离时只使用一次
                for (var k = 0; k < this.sameTypeCells.length; k++) {
                    this.sameTypeCells[k].hasXMove = true;
                }
                // 移动结束后方块恢复可点击
                setTimeout(function () {
                    _this.switchCellTouchEnabled(true);
                }, 500);
            }
            this.sameTypeCellsLength = 0;
            this.sameTypeCells = [];
        }
    };
    return GameArea;
}(egret.DisplayObjectContainer));
__reflect(GameArea.prototype, "GameArea");
//# sourceMappingURL=GameArea.js.map