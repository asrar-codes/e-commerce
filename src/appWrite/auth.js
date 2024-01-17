import { Client, Account, Databases } from "appwrite";
const client = new Client()
  .setEndpoint("https://cloud.appwrite.io/v1")
  .setProject("65a24cbcbbfb7836a62d");

export const account = new Account(client);
export const db = new Databases(client);
