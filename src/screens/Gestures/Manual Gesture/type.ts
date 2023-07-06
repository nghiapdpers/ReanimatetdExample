export const enum STATE {
  'UNDIFINED',
  'START',
  'MOVE',
  'END',
}

export const enum DIRECTION {
  'UNDIFINED',
  'DIAGONAL',
  'TOP_TO_BOTTOM',
  'BOTTOM_TO_TOP',
  'LEFT_TO_RIGHT',
  'RIGHT_TO_LEFT',
}

export type PanDoubleGestureHandlerType = {
  id: number;
  current_x?: number;
  current_y?: number;
  target_x?: number;
  target_y?: number;
  state: STATE;
};

export type PanGestureType = {
  direction: DIRECTION;
  state: STATE;
};
