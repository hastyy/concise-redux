export type IndexableObject = Record<keyof never, any>;

export type StringKeysOf<T> = string & keyof T;

export type Primitive =
	| null
	| undefined
	| string
	| number
	| boolean
	| symbol
	| bigint;

export type Immutable<T extends IndexableObject> = {
  readonly [K in keyof T]: T[K] extends Primitive
    ? T[K]
    : Immutable<T[K]>
}