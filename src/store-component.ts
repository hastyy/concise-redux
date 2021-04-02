import { ActionCreator } from "./action-creator";
import { UnknownAction } from "./types/action";
import { ActionMapConstraints } from "./types/action-constraints";
import { ActionUnion } from "./types/action-union";
import { UnknownCaseReducer, CaseReducers } from "./types/case-reducers";

export function storeComponent<
  ActionMap extends ActionMapConstraints<ActionMap>,
  State
>({
  initialState,
  caseReducers,
}: StoreComponentParams<ActionMap, State>) {
  return {
    initialState: Object.freeze(initialState),
    ActionCreator: ActionCreator<ActionMap>(),
    reducer: (state = initialState, action: ActionUnion<ActionMap>) => {
      const caseReducer = caseReducers[action.type];
      return caseReducer
        ? apply(caseReducer, state, action)
        : state;
    }
  };
}

function apply<State>(
  caseReducer: UnknownCaseReducer<State>,
  state: State,
  action: UnknownAction
): State {
  return {
    ...state,
    ...(typeof caseReducer === 'function'
      ? action.payload === undefined
        ? caseReducer(state)
        : caseReducer(action.payload, state)
      : caseReducer)
  }
}

interface StoreComponentParams<ActionMap extends ActionMapConstraints<ActionMap>, State> {
  initialState: State,
  caseReducers: CaseReducers<ActionMap, State>
}
