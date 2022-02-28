import { IZapAction } from "./zap-action.model";
import { IZapState } from "./zap-state.model";
import { IZapTrigger } from "./zap-trigger.model";

export interface IZap {
  id: string;
  name: string;
  description?: string;
  trigger: IZapTrigger;
  states: IZapState[];
  actions: IZapAction[];
}
