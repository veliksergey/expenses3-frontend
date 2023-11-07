import type { Ref } from 'vue';
import { useState } from '#build/imports';

const cats: {id: number, name: string}[] = [];

export const useCount = (): Ref<number> => {
  return useState('counter', () => Math.round(Math.random() * 1000));
}

export const useCategories = () => {
  return useState('categories', () => cats);
}

export const addCategory = () => {
  cats.push({
    id: 0,
    name: 'TEST',
  });
}