import { ActionMapConstraints } from "./action-constraints";
import { Immutable, StringKeysOf } from "./utils";

export type CaseReducers<ActionMap extends ActionMapConstraints<ActionMap>, State> = {
  [ActionType in StringKeysOf<ActionMap>]: [ActionMap[ActionType]] extends [void]
    ? Partial<State> | UnaryCaseReducer<State>
    : BinaryCaseReducer<ActionMap[ActionType], State>;
};

interface UnaryCaseReducer<State> {
  (state: Immutable<State>): Partial<State>
}

interface BinaryCaseReducer<Payload, State> {
  (payload: Immutable<Payload>, state: Immutable<State>): Partial<State>
}

export type UnknownCaseReducer<State> = Partial<State> | ((...args: any[]) => Partial<State>);