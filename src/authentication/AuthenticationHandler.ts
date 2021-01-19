export const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb: () => void) {
    const result = setTimeout(cb, 100); // fake async
    if (result) {
      this.isAuthenticated = true;
      localStorage.setItem('kravbank', 'loggedIn');
      return true;
    } else {
      this.isAuthenticated = false;
    }
  },
  signout(cb: () => void) {
    localStorage.removeItem('kravbank');
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

/*class AuthenticationHandler2 {
  token = 'kravbank';
  password = 'a3MDsBSWmFjLRpT';
  username = 'oakley@carruthers.com';
  tokenValue = 'loggedIn';

  isAuthenticated() {
    return (
      localStorage.getItem(this.token) &&
      this.tokenValue === localStorage.getItem(this.token)
    );
  }

  authenticate() {
    if (username === this.username && password === this.password) {
      localStorage.setItem(this.token, this.tokenValue);
      return true;
    }
    return false;
  }

  // Successful logOut returns true, otherwise false
  logOut() {
    if (localStorage.getItem(this.token)) {
      localStorage.removeItem(this.token);
      return true;
    }
    return false;
  }
}

export const auth = new AuthenticationHandler2();*/
