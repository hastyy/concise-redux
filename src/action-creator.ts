import { Action } from "./types/action";
import { ActionMapConstraints } from "./types/action-constraints";
import { StringKeysOf } from "./types/utils";

export function ActionCreator<ActionMap extends ActionMapConstraints<ActionMap>>() {
  return function actionFactory<
    ActionType extends StringKeysOf<ActionMap>,
    Payload extends ActionMap[ActionType]
  >(
    type: ActionType,
    /**
     * We use the tuple syntax to check the Payload type because, by default, conditional types distribute over unions.
     * With this syntax the union type becomes atomic in the sense that the condition is
     * checked against the whole type instead of its parts.
     * This is necessary for the cases where Payload can be a union type, e.g., if it is a nullable type.
     * More info: https://stackoverflow.com/questions/51365467/issue-with-union-types-and-conditional-types
     */
    ...payload: [Payload] extends [void] ? [] : [Payload]
  ): Action<ActionType, Payload> {
    /**
     * The return type of actionFactory is a conditional type.
     * This works great for consuming code.
     * However, the compiler is not able to match the return type from the function body. This is a design limitation.
     * Because of this limitation, we need a type assertion / cast.
     * More info: https://github.com/microsoft/TypeScript/issues/24929
     */
    return (payload.length === 0
      ? { type }
      : { type, payload: payload[0] }) as Action<ActionType, Payload>;
  }
}