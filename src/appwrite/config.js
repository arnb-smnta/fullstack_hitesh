import { Client, Databases, Storage, Query, ID } from "appwrite";

import conf from "../conf/conf";

export class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);
    this.databases = new Databases(this.clien);
    this.bucket = new Storage(this.client);
  }

  async getPost(slug) {
    try {
      return (
        await this,
        databases.getDocument(
          conf.appwriteDatabaseId,
          conf.appwriteCollectionId,
          slug
        )
      ); //slug is id i dont understand
    } catch (error) {
      console.log("APPwrite Service :: getPost()", error);
      return false;
    }
  }

  async getPosts(queries = [Query.equal("status", ["active"])]) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("APPWRITE services :: getPosts()", error);
      return false;
    }
  }
  async createPost({ title, slug, featuredImage, status, userId }) {
    try {
      this.databases.createDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
          userId,
        }
      );
    } catch (error) {
      console.log("Appwrite Service :: Error in createPost", error);
    }
  }
  async updatepost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
    } catch (error) {
      console.log("App Write Service :: updatePost()", error);
      return false;
    }
  }
  async updatepost(slug) {
    try {
      await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug
      );
      return true;
    } catch (error) {
      console.log("App Write Service :: DeletePost()", error);
      return false;
    }
  }

  //THIS IS WHERE WE ARE USING THE STORAGE FILES

  async uploadFile(file) {
    try {
      return await this.bucket.createFile(
        conf.appwriteBucketId,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log("APPWRITE SERVICES :: UPLOADFILE()", error);
    }
  }

  async uploadFile(fileId) {
    try {
      return await this.bucket.deleteFileFile(conf.appwriteBucketId, fileId);
    } catch (error) {
      console.log("APPWRITE SERVICES :: DeleteFile()", error);
    }
  }

  async getfilePreview(fileId) {
    try {
      return (await this.bucket.getFilePreview(conf.appwriteBucketId, fileId))
        .href;
    } catch (error) {
      console.log("APPWRITE SERVICES :: getfilePreview()", error);
    }
  }
}

const service = new Service();

export default service;

//const client = new Client();

//const databases = new Databases(client);

//client
// .setEndpoint("https://cloud.appwrite.io/v1") // Your API Endpoint
//.setProject("5df5acd0d48c2"); // Your project ID
