class GameArea extends egret.DisplayObjectContainer {

	public gameSound: GameSound = new GameSound()

	//用于保存游戏区域全部元素方块的二维数组
	private imgArry: any[][] = []
	private copyImgArry: any[][] = []

	//用于保存每次点击元素方块后，寻找到的与被点击元素相同type的元素方块
	private sameTypeCells: any[] = []

	//用于保存每次点击方块的typeIndex
	private cellTypeIndex: number = 99

	//用于标示寻找相同元素的过程是否结束
	private timer: egret.Timer
	private sameTypeCellsLength: number = 0

	//用于保存每次点击消除的元素信息


	public constructor() {
		super()
	}

	/**
	 * renderArea生成10*10的游戏区域
	 */
	public renderArea() {

		this.imgArry = []
		this.copyImgArry = []
		for (let i = 0; i <= 9; i++) {
			let row: any[] = []
			let copyRow: any[] = []
			for (let j = 0; j <= 9; j++) {
				let rIndex = Util.randomNum(1, 8)
				let RiconName = 'cell-' + rIndex + '_png'
				let rIcon = Util.createBitmapByName(RiconName)
				rIcon.width = this.stage.stageWidth / 10
				rIcon.height = this.stage.stageWidth / 10
				rIcon.x = (j) * this.stage.stageWidth / 10
				rIcon.y = this.stage.stageHeight - this.stage.stageWidth + (i - 1) * this.stage.stageWidth / 10
				rIcon.touchEnabled = true
				let rItem = {
					icon: rIcon,
					typeIndex: rIndex,
					rowIndex: i,
					colIndex: j,
					newRowIndex: i,
					isRemove: false
				}
				let copyRItem = {
					icon: rIcon,
					typeIndex: rIndex,
					rowIndex: i,
					colIndex: j,
				}
				row.push(rItem)
				copyRow.push(copyRItem)
				this.addChild(rIcon)
				rIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, () => {
					//点击元素方块时播放点击音乐
					this.gameSound.loadClickSound()
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

					this.cellTypeIndex = rItem.typeIndex
					this.handleClickCell(rItem)
					this.time()
				}, this)
			}
			this.imgArry.push(row)
			this.copyImgArry.push(copyRow)
		}
		// console.log(this.imgArry)
	}

	/**
	 * 判断给定坐标的方块上下左右是否有与它相同 typeIndex 的方块，
	 * 如果有，并且四周的方块还未放入 sameTypeCells 数组，则放入
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
			if (rItem.rowIndex >= 1) {
				this.handleClickCell(this.imgArry[rItem.rowIndex - 1][rItem.colIndex])
			}
			//下
			if (rItem.rowIndex <= 8) {
				this.handleClickCell(this.imgArry[rItem.rowIndex + 1][rItem.colIndex])
			}
			//左
			if (rItem.colIndex >= 1) {
				this.handleClickCell(this.imgArry[rItem.rowIndex][rItem.colIndex - 1])
			}
			//右
			if (rItem.colIndex <= 8) {
				this.handleClickCell(this.imgArry[rItem.rowIndex][rItem.colIndex + 1])
			}
		}
	}

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
					this.removeChild(this.sameTypeCells[k].icon)
					for (let i = 9; i >= 0; i--) {
						for (let j = 9; j >= 0; j--) {
							if (this.imgArry[i][j].colIndex === this.sameTypeCells[k].colIndex && this.imgArry[i][j].rowIndex < this.sameTypeCells[k].rowIndex) {
								egret.Tween.get(this.imgArry[i][j].icon)
									.to({ y: this.imgArry[i][j].icon.y - 13 }, 200, egret.Ease.sineIn)
									.to({ y: this.imgArry[i][j].icon.y + colRowIndexNumObj.col[j].removeNum * this.stage.stageWidth / 10 }, 500, egret.Ease.sineIn)
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