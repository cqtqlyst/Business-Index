import { auth } from './firebase';

export const checkAuthState = () => {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged(user => {
      if (user) {
        resolve(user);
      } else {
        resolve(null);
      }
    });
  });
};
