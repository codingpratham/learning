import { atom, selector } from 'recoil';

export const networkAtom = atom({
  key: 'networkAtom',
  default: 12,
});

export const jobsAtom = atom({
  key: 'jobsAtom',
  default: 0,
});

export const messagingAtom = atom({
  key: 'messagingAtom',
  default: 2,
});

export const notificationAtom = atom({
  key: 'notificationAtom',
  default: 102,
});

export const totalcountSelector = selector({
  key: 'totalcountSelector',
  get: ({ get }) => {
    const networkCount = get(networkAtom);
    const jobCount = get(jobsAtom);
    const messagingCount = get(messagingAtom);
    const notificationCount = get(notificationAtom);

    return networkCount + jobCount + messagingCount + notificationCount;
  },
});
