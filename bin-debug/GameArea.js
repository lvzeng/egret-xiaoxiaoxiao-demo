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
    //用于保存每次点击消除的元素信息
    function GameArea() {
        var _this = _super.call(this) || this;
        _this.gameSound = new GameSound();
        //用于保存游戏区域全部元素方块的二维数组
        _this.imgArry = [];
        _this.copyImgArry = [];
        //用于保存每次点击元素方块后，寻找到的与被点击元素相同type的元素方块
        _this.sameTypeCells = [];
        //用于保存每次点击方块的typeIndex
        _this.cellTypeIndex = 99;
        _this.sameTypeCellsLength = 0;
        return _this;
    }
    /**
     * renderArea生成10*10的游戏区域
     */
    GameArea.prototype.renderArea = function () {
        var _this = this;
        this.imgArry = [];
        this.copyImgArry = [];
        for (var i = 0; i <= 9; i++) {
            var row = [];
            var copyRow = [];
            var _loop_1 = function (j) {
                var rIndex = Util.randomNum(1, 8);
                var RiconName = 'cell-' + rIndex + '_png';
                var rIcon = Util.createBitmapByName(RiconName);
                rIcon.width = this_1.stage.stageWidth / 10;
                rIcon.height = this_1.stage.stageWidth / 10;
                rIcon.x = (j) * this_1.stage.stageWidth / 10;
                rIcon.y = this_1.stage.stageHeight - this_1.stage.stageWidth + (i - 1) * this_1.stage.stageWidth / 10;
                rIcon.touchEnabled = true;
                var rItem = {
                    icon: rIcon,
                    typeIndex: rIndex,
                    rowIndex: i,
                    colIndex: j,
                    newRowIndex: i,
                    isRemove: false
                };
                var copyRItem = {
                    icon: rIcon,
                    typeIndex: rIndex,
                    rowIndex: i,
                    colIndex: j,
                };
                row.push(rItem);
                copyRow.push(copyRItem);
                this_1.addChild(rIcon);
                rIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, function () {
                    //点击元素方块时播放点击音乐
                    _this.gameSound.loadClickSound();
                    // //执行消除和上方元素掉落行为
                    // this.removeChild(rIcon)
                    // for (let i = 9; i >= 0; i--) {
                    // 	for (let j = 9; j >= 0; j--) {
                    // 		if (imgArry[i][j].colIndex === rItem.colIndex && imgArry[i][j].rowIndex < rItem.rowIndex) {
                    // 			// imgArry[i][j].icon.y += this.stage.stageWidth / 10
                    // 			egret.Tween.get(imgArry[i][j].icon)
                    // 				.to({ y: imgArry[i][j].icon.y - 13 }, 200, egret.Ease.sineIn)
                    // 				.to({ y: imgArry[i][j].icon.y + this.stage.stageWidth / 10 }, 500, egret.Ease.sineIn)
                    // 		}
                    // 	}
                    // }
                    _this.cellTypeIndex = rItem.typeIndex;
                    _this.handleClickCell(rItem);
                    _this.time();
                }, this_1);
            };
            var this_1 = this;
            for (var j = 0; j <= 9; j++) {
                _loop_1(j);
            }
            this.imgArry.push(row);
            this.copyImgArry.push(copyRow);
        }
        // console.log(this.imgArry)
    };
    /**
     * 判断给定坐标的方块上下左右是否有与它相同 typeIndex 的方块，
     * 如果有，并且四周的方块还未放入 sameTypeCells 数组，则放入
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
            if (rItem.rowIndex >= 1) {
                this.handleClickCell(this.imgArry[rItem.rowIndex - 1][rItem.colIndex]);
            }
            //下
            if (rItem.rowIndex <= 8) {
                this.handleClickCell(this.imgArry[rItem.rowIndex + 1][rItem.colIndex]);
            }
            //左
            if (rItem.colIndex >= 1) {
                this.handleClickCell(this.imgArry[rItem.rowIndex][rItem.colIndex - 1]);
            }
            //右
            if (rItem.colIndex <= 8) {
                this.handleClickCell(this.imgArry[rItem.rowIndex][rItem.colIndex + 1]);
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
        if (this.sameTypeCellsLength != this.sameTypeCells.length) {
            this.sameTypeCellsLength = this.sameTypeCells.length;
        }
        else {
            this.timer.stop();
            if (this.sameTypeCells.length > 1) {
                var colRowIndexNumObj = {
                    row: {
                        0: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        1: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        2: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        3: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        4: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        5: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        6: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        7: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        8: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        9: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        }
                    },
                    col: {
                        0: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        1: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        2: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        3: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        4: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        5: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        6: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        7: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        8: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        },
                        9: {
                            startIndex: 99,
                            removeNum: 0,
                            removeCells: []
                        }
                    }
                };
                for (var k = 0; k < this.sameTypeCells.length; k++) {
                    colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].removeNum += 1;
                    colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].removeCells.push(this.sameTypeCells[k].colIndex);
                    if (this.sameTypeCells[k].colIndex < colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].startIndex) {
                        colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].startIndex = this.sameTypeCells[k].colIndex;
                    }
                    colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].removeNum += 1;
                    colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].removeCells.push(this.sameTypeCells[k].rowIndex);
                    if (this.sameTypeCells[k].rowIndex < colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].startIndex) {
                        colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].startIndex = this.sameTypeCells[k].rowIndex;
                    }
                }
                for (var k = 0; k < this.sameTypeCells.length; k++) {
                    this.removeChild(this.sameTypeCells[k].icon);
                    for (var i = 9; i >= 0; i--) {
                        for (var j = 9; j >= 0; j--) {
                            if (this.imgArry[i][j].colIndex === this.sameTypeCells[k].colIndex && this.imgArry[i][j].rowIndex < this.sameTypeCells[k].rowIndex) {
                                egret.Tween.get(this.imgArry[i][j].icon)
                                    .to({ y: this.imgArry[i][j].icon.y - 13 }, 200, egret.Ease.sineIn)
                                    .to({ y: this.imgArry[i][j].icon.y + colRowIndexNumObj.col[j].removeNum * this.stage.stageWidth / 10 }, 500, egret.Ease.sineIn);
                            }
                        }
                    }
                }
            }
            this.sameTypeCellsLength = 0;
            this.sameTypeCells = [];
        }
    };
    return GameArea;
}(egret.DisplayObjectContainer));
__reflect(GameArea.prototype, "GameArea");
//# sourceMappingURL=GameArea.js.map