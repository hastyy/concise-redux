import { IndexableObject } from "./utils";

export type ActionMapConstraints<ActionMap> = IndexableObject & Required<ActionMap>;