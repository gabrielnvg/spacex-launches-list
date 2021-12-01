import { Launches } from '../types/launches';

const isImplemented = typeof localStorage !== 'undefined';

const isKeyStored = (key: string) =>
  Boolean(isImplemented && localStorage.getItem(key));

const storageService = {
  set: (key: string, value: Launches) =>
    isImplemented && localStorage.setItem(key, JSON.stringify(value)),

  remove: (key: string) => isImplemented && localStorage.removeItem(key),

  has: (key: string) => isKeyStored(key),

  get: (key: string) => {
    if (isKeyStored(key)) {
      return JSON.parse(localStorage.getItem(key) || '{}');
    }
    return null;
  },
};

export const storageKeys = {
  favouriteLaunches: 'spacex-launches-list.favourite-launches',
};

export default storageService;
