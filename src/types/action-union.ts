import { Action } from "./action";
import { ActionMapConstraints } from "./action-constraints";
import { StringKeysOf } from "./utils";

export type ActionUnion<ActionMap extends ActionMapConstraints<ActionMap>> = {
  [ActionType in StringKeysOf<ActionMap>]: Action<ActionType, ActionMap[ActionType]>;
}[StringKeysOf<ActionMap>];
