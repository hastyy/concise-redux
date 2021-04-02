/**
 * We use the tuple syntax to check the Payload type because, by default, conditional types distribute over unions.
 * With this syntax the union type becomes atomic in the sense that the condition is
 * checked against the whole type instead of its parts.
 * This is necessary for the cases where Payload can be a union type, e.g., if it is a nullable type.
 * More info: https://stackoverflow.com/questions/51365467/issue-with-union-types-and-conditional-types
 */
export type Action<Type extends string, Payload> = Readonly<[Payload] extends [void]
  ? { type: Type }
  : { type: Type, payload: Payload }>;

export interface UnknownAction {
  type: string
  payload?: unknown
}