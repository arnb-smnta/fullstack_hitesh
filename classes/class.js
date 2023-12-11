class User {
  constructor(username, email, password) {
    this.username = username;
    this.emailemail;
    this.password = password;
  }

  encryptPassword() {
    return `${this.password}abc`;
  }
}

const chai = new User("chai", "chai@gmail.com", "123");
