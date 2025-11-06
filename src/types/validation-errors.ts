type FlattenKeys<T> = {
  [K in keyof T]-?: T[K] extends unknown[]
    ? K & string
    : T[K] extends object
    ? `${K & string}.${Extract<FlattenKeys<T[K]>, string>}` | (K & string)
    : K & string
}[keyof T & string]

export type ValidationErrors<T> = Partial<Record<FlattenKeys<T>, string>>
