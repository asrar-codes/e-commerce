import { Query } from "appwrite";
import { db } from "./auth";
import { data } from "autoprefixer";
import { toast } from "react-toastify";

export async function getUserCart(documentID) {
  try {
    const data = await db.getDocument(
      [import.meta.env.VITE_APPWRITE_DATABASE_ID],
      [import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID],
      [`${documentID}`]
    );
    return data;
  } catch (error) {
    console.log(error);
  }
  return null;
}

// update user cart
export async function updateUserCart(documentID, data) {
  try {
    const res = await db.updateDocument(
      [import.meta.env.VITE_APPWRITE_DATABASE_ID],
      [import.meta.env.VITE_APPWRITE_COLLECTION_USERS_ID],
      [`${documentID}`],
      data
    );

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
}

// function to get orders collection/document

export async function getOrdersCollection(userId) {
  try {
    const res = await db.getDocument(
      [import.meta.env.VITE_APPWRITE_DATABASE_ID],
      [import.meta.env.VITE_APPWRITE_COLLECTION_ORDERS_ID],
      [userId]
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
}
// function to create orders collection/document

export async function createOrderDocument(userId, data) {
  try {
    const res = await db.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      import.meta.env.VITE_APPWRITE_COLLECTION_ORDERS_ID,
      userId,
      data
    );
  } catch (error) {
    toast.error(error.message);
    console.log(error);
  }
  return null;
}

// function to update orders collection/document

export async function updateOrdersCollection(data, userId) {
  console.log(data);
  try {
    const res = await db.updateDocument(
      [import.meta.env.VITE_APPWRITE_DATABASE_ID],
      [import.meta.env.VITE_APPWRITE_COLLECTION_ORDERS_ID],
      [userId],
      data
    );
    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
}
