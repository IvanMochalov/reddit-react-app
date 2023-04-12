import React from "react";

function pickFromSyntheticEvent<T extends HTMLElement>() {
  return <K extends keyof T>(key: K) =>
  <E extends ((t: T[K]) => void)>(fn: E) =>
  (e: React.SyntheticEvent<T>) =>
  fn(e.currentTarget[key]);
};

export const getValue = pickFromSyntheticEvent<HTMLInputElement>()('value');
export const getChecked = pickFromSyntheticEvent<HTMLInputElement>()('checked');

function compose<U>(...fns: Function[]) {
  return <E,>(initialValue: any): U =>
    fns.reduceRight((previousValue, fn) => fn(previousValue), initialValue);
}

function pipe<U>(...fns: Function[]) {
  return <E,>(initialValue: any): U =>
    fns.reduce((previousValue, fn) => fn(previousValue), initialValue);
}

function pick<K extends string>(prop: K) {
  return <O extends Record<K, any>>(obj: O) => obj[prop]
}

function isEqual<T>(left: T) {
  return <E extends T>(right: E) => left === right;
}

const comments = [{id: 22, text: 'text One'},{id: 44, text: 'text Two'}];

const createFilterBy = (prop: string) => (id: number) => pipe(pick(prop), isEqual(id), cond)

const filterWithId = createFilterBy('id');
const filterWithValue = createFilterBy('value');

const filterComments = comments.filter(filterWithId(22));

function cond(b: boolean) {
  return !b;
}

const getValueNumber = pipe<number>(
  pick('currentTarget'),
  pick('value'),
  parseInt
)
