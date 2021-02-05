const fakeAuth = {
  isAuthenticated(): boolean {
    const result =
      localStorage.getItem('kravbank') &&
      localStorage.getItem('kravbank') === 'loggedIn';
    if (result) {
      return true;
    }
    return false;
  },
  authenticate(cb: () => void): boolean {
    const result = setTimeout(cb, 100); // fake async
    if (result) {
      localStorage.setItem('kravbank', 'loggedIn');
      return true;
    }
    return false;
  },
  signout(cb: () => void): void {
    localStorage.removeItem('kravbank');
    setTimeout(cb, 100);
  }
};
export default fakeAuth;
