import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteUrl);
    this.account = new Account(this.client);
  }
  async createAccount({ email, password, name }) {
    try {
      const useraccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
      if (useraccount) {
        try {
          return this.login(emai, password);
        } catch (error) {
          throw error;
        }
      } else {
        return useraccount;
      }
    } catch (error) {
      throw error;
    }
  }
  async login({ email, password }) {
    const loggedinuser = await this.account.createEmailSession(email, password);
    return loggedinuser;
  }
  async getCurrentUser() {
    try {
      return await this.account.get;
    } catch (error) {
      console.log("Appwrite Service :: get current user ", error);
    }
  }
  async logout() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      console.log("Appwrite Service :: logout ", err);
    }
  }
}

const authService = new AuthService();

export default authService;
/*const client = new Client();

const account = new Account(client);

client
  .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
  .setProject("5df5acd0d48c2"); // Your project ID*/
