import { Dispatch, Unsubscribe, Reducer } from "redux";

declare module "redux-windowsize" {
  interface Action<T = any> {
    type: T;
  }

  interface AnyAction extends Action {
    [extraProps: string]: any;
  }

  interface Store<S = any, A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
    getState(): S;
    subscribe(listener: () => void): Unsubscribe;
    replaceReducer(nextReducer: Reducer<S, A>): void;
  }

  interface Measurements {
    width: string | number;
    height: string | number;
  }

  // actions
  export function setSize(height: number, width: number): void;
  export function setSizeArr(measurements: [number, number]): void;
  export function setHeight(height: number): void;
  export function setWidth(width: number): void;
  export function setRem(rem: string): void;
  export function reset(): void;
  export function setId(size: string): void;

  // utility
  export function listenResize(
    store: Store<any>,
    window: Window,
    waitMs: string | number,
    reducerPath?: string
  ): void;
  export function createSizeAction(window: Window): Dispatch<AnyAction>;
  export function listenSize(
    dispatch: Dispatch<AnyAction>,
    window: Window,
    waitMs: string | number
  ): void;
  export function listenHeight(
    dispatch: Dispatch<AnyAction>,
    window: Window,
    waitMs: string | number
  ): void;
  export function listenWidth(
    dispatch: Dispatch<AnyAction>,
    window: Window,
    waitMs: string | number
  ): void;
  export function createRemAction(window: Window);

  // selectors
  export const REDUCER_KEY: string;
  export function getWindowSize(state: object): Measurements;
  export function getWindowHeight(height: string | number): void;
  export function getWindowHeightMax(height: string | number): void;
  export function getWindowWidth(width: string | number): void;
  export function getWindowWidthMax(width: string | number): void;
  export function getHeightWidth(measurements: Measurements): void;
  export function getHeightWidthMax(
    measurements: Measurements,
    maxValues?: Measurements
  ): void;
}
