export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends Array<infer I>
    ? Array<DeepPartial<I>>
    : DeepPartial<T[P]>;
};
export type PartialWithRequired<T, RequiredKeys extends keyof T> = Partial<
  Omit<T, RequiredKeys>
> &
  Pick<T, RequiredKeys>;
