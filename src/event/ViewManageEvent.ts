class ViewManageEvent extends egret.Event {

	public static CELL_MOVE_START: string = "cell_move_start"
	public static CELL_MOVE_OVER: string = "cell_move_over"

	public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
		super(type, bubbles, cancelable);
	}
}