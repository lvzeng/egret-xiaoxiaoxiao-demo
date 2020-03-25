class GameArea extends egret.DisplayObjectContainer {

	public gameSound: GameSound = new GameSound()

	//元素方块的宽高
	private cellWidthHeight: number = GameData.stageWidth / 10

	//游戏区域上下左右边界
	private gameAreaLimit = {
		top: 0,
		right: 0,
		bottom: 0,
		left: 0
	}

	//用于保存游戏区域全部元素方块的二维数组
	private imgArry: any[][] = []

	//用于保存每次点击元素方块后，寻找到的与被点击元素相同type的元素方块
	private sameTypeCells: any[] = []

	//用于保存每次点击方块的typeIndex
	private cellTypeIndex: number = 99

	//用于标示寻找相同元素的过程是否结束
	private timer: egret.Timer
	private sameTypeCellsLength: number = 0

	public constructor() {
		super()
	}

	/**
	 * renderArea生成10*10的游戏区域
	 */
	public renderArea() {

		this.imgArry = []
		for (let i = 0; i <= 9; i++) {
			let row: any[] = []
			for (let j = 0; j <= 9; j++) {
				let rIndex = Util.randomNum(1, 8)
				let RiconName = 'cell-' + rIndex + '_png'
				let rIcon = Util.createBitmapByName(RiconName)
				rIcon.width = this.cellWidthHeight
				rIcon.height = this.cellWidthHeight
				rIcon.x = j * this.cellWidthHeight
				rIcon.y = this.stage.stageHeight - this.stage.stageWidth + (i - 1) * this.cellWidthHeight
				rIcon.touchEnabled = true
				let rItem = {
					icon: rIcon,
					typeIndex: rIndex,
					rowIndex: i,
					colIndex: j,
					x: j * this.cellWidthHeight,
					y: this.stage.stageHeight - this.stage.stageWidth + (i - 1) * this.cellWidthHeight,
					isRemove: false
				}
				row.push(rItem)
				this.addChild(rIcon)
				rIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					//点击元素方块时播放点击音乐
					this.gameSound.loadClickSound()
					this.cellTypeIndex = rItem.typeIndex
					this.handleClickCell(rItem)
					this.time()
				}, this)
				if (i === 0 && j === 0) {
					this.gameAreaLimit.left = rIcon.x
					this.gameAreaLimit.top = rIcon.y
				}
				if (i === 9 && j === 9) {
					this.gameAreaLimit.right = rIcon.x
					this.gameAreaLimit.bottom = rIcon.y
				}
			}
			this.imgArry.push(row)
		}
		// console.log(this.imgArry)
	}

	/**
	 * 判断给定坐标的方块上下左右是否有与它相同 typeIndex 的方块，
	 * 如果有，并且四周的方块还未放入 sameTypeCells 数组，则放入
	 * 根据当前点击方块的x，y坐标进行上下左右查找
	 */
	private handleClickCell(rItem: any): void {

		let flag = false

		//先判断当前坐标的方块是否存在于sameTypeCells
		for (let k = 0; k < this.sameTypeCells.length; k++) {
			if (this.sameTypeCells[k].rowIndex === rItem.rowIndex && this.sameTypeCells[k].colIndex === rItem.colIndex) {
				flag = true
				break
			}
		}
		if (!flag && rItem.typeIndex === this.cellTypeIndex && rItem.typeIndex != 99) {
			this.sameTypeCells.push(rItem)
			//上
			if (rItem.y > this.gameAreaLimit.top) {
				if (this.findCellByXy(rItem.x, rItem.y - this.cellWidthHeight)) {
					this.handleClickCell(this.findCellByXy(rItem.x, rItem.y - this.cellWidthHeight))
				}
			}
			//下
			if (rItem.rowIndex < this.gameAreaLimit.bottom) {
				if (this.findCellByXy(rItem.x, rItem.y + this.cellWidthHeight)) {
					this.handleClickCell(this.findCellByXy(rItem.x, rItem.y + this.cellWidthHeight))
				}
			}
			//左
			if (rItem.colIndex > this.gameAreaLimit.left) {
				if (this.findCellByXy(rItem.x - this.cellWidthHeight, rItem.y)) {
					this.handleClickCell(this.findCellByXy(rItem.x - this.cellWidthHeight, rItem.y))
				}
			}
			//右
			if (rItem.colIndex < this.gameAreaLimit.right) {
				if (this.findCellByXy(rItem.x + this.cellWidthHeight, rItem.y)) {
					this.handleClickCell(this.findCellByXy(rItem.x + this.cellWidthHeight, rItem.y))
				}
			}
		}
	}
	/**
	 * 根据x，y值查找对应的元素方块
	 */
	private findCellByXy(x: number, y: number) {
		let targetItem
		let flag = false
		for (let i = 0; i <= 9; i++) {
			if (flag) {
				break
			}
			for (let j = 0; j <= 9; j++) {
				if (!this.imgArry[i][j].isRemove && this.imgArry[i][j].x === x && this.imgArry[i][j].y === y) {
					targetItem = this.imgArry[i][j]
					flag = true
					break
				}
			}
		}
		return targetItem
	}

	/**
	 * 
	 */

	private time() {
		if (!this.timer) {
			this.timer = new egret.Timer(50, 0)
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this)
		}
		this.timer.start()
	}

	private timerFunc() {
		if (this.sameTypeCellsLength != this.sameTypeCells.length) {
			this.sameTypeCellsLength = this.sameTypeCells.length
		} else {
			this.timer.stop()

			if (this.sameTypeCells.length > 1) {
				let colRowIndexNumObj = {
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
				}
				for (let k = 0; k < this.sameTypeCells.length; k++) {
					colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].removeNum += 1
					colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].removeCells.push(this.sameTypeCells[k].colIndex)
					if (this.sameTypeCells[k].colIndex < colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].startIndex) {
						colRowIndexNumObj.row[this.sameTypeCells[k].rowIndex].startIndex = this.sameTypeCells[k].colIndex
					}
					colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].removeNum += 1
					colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].removeCells.push(this.sameTypeCells[k].rowIndex)
					if (this.sameTypeCells[k].rowIndex < colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].startIndex) {
						colRowIndexNumObj.col[this.sameTypeCells[k].colIndex].startIndex = this.sameTypeCells[k].rowIndex
					}
				}
				for (let k = 0; k < this.sameTypeCells.length; k++) {
					// egret.Tween.get(this.sameTypeCells[k].icon)
					// 	.to({ scaleX: 1.2, scaleY: 1.2 }, 200, egret.Ease.cubicInOut)
					// 	.to({ scaleX: 0.1, scaleY: 0.1 }, 200, egret.Ease.cubicInOut)
					this.removeChild(this.sameTypeCells[k].icon)
					this.sameTypeCells[k].isRemove = true
					for (let i = 9; i >= 0; i--) {
						for (let j = 9; j >= 0; j--) {
							// if (this.imgArry[i][j].colIndex === this.sameTypeCells[k].colIndex && this.imgArry[i][j].rowIndex === this.sameTypeCells[k].rowIndex) {
							// 	egret.Tween.get(this.sameTypeCells[k].icon)
							// 		.to({ scaleX: 1.2, scaleY: 1.2 }, 200, egret.Ease.cubicInOut)
							// 		.to({ scaleX: 0.1, scaleY: 0.1 }, 200, egret.Ease.cubicInOut)
							// 		.call(() => {
							// 			this.removeChild(this.imgArry[i][j].icon)
							// 			this.imgArry[i][j].isRemove = true
							// 		})
							// 	// this.removeChild(this.imgArry[i][j].icon)
							// 	// this.imgArry[i][j].isRemove = true
							// } else 
							if (this.imgArry[i][j].colIndex === this.sameTypeCells[k].colIndex && this.imgArry[i][j].rowIndex < this.sameTypeCells[k].rowIndex) {
								egret.Tween.get(this.imgArry[i][j].icon)
									.to({ y: this.imgArry[i][j].icon.y - 13 }, 200, egret.Ease.sineIn)
									.to({ y: this.imgArry[i][j].icon.y + colRowIndexNumObj.col[j].removeNum * this.cellWidthHeight }, 500, egret.Ease.sineIn)
								// .call(() => {
								// 	this.imgArry[i][j].y = this.imgArry[i][j].icon.y + colRowIndexNumObj.col[j].removeNum * this.cellWidthHeight
								// })
								this.imgArry[i][j].y = this.imgArry[i][j].icon.y + colRowIndexNumObj.col[j].removeNum * this.cellWidthHeight
							}
						}
					}
				}
			}
			this.sameTypeCellsLength = 0
			this.sameTypeCells = []
		}
	}
}