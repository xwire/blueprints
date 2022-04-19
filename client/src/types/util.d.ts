export type Function<T, V> = (data: T) => V;
export type Callback<T> = Function<T, void>;