import { generateRandomString } from '../react/generateRandomIndex'

export function assoc<K extends string>(key: K) {
  return <O extends object>(obj: O) => ({
    ...obj,
    [key]: generateRandomString(),
    // [key]: Math.random().toString(36).substring(2,15),
  }) as K extends keyof O ? (Omit<O, K> & Record<K, string>) : (O & Record<K, string>)
}
