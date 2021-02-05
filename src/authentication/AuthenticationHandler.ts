export const fakeAuth = {
  isAuthenticated() {
    const result =
      localStorage.getItem('kravbank') &&
      localStorage.getItem('kravbank') === 'loggedIn';
    if (result) {
      return true;
    }
    return false;
  },
  authenticate(cb: () => void) {
    const result = setTimeout(cb, 100); // fake async
    if (result) {
      localStorage.setItem('kravbank', 'loggedIn');
      return true;
    }
  },
  signout(cb: () => void) {
    localStorage.removeItem('kravbank');
    setTimeout(cb, 100);
  }
};
