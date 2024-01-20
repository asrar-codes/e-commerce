import { Query } from "appwrite";
import { db } from "./auth";
import { data } from "autoprefixer";
import { toast } from "react-toastify";

export async function getUserCart(documentID) {
  try {
    const data = await db.getDocument(
      [import.meta.env.VITE_APPWRITE_DATABASE_ID],
      [import.meta.env.VITE_APPWRITE_COLLECTION_ID],
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
      [import.meta.env.VITE_APPWRITE_COLLECTION_ID],
      [`${documentID}`],
      data
    );

    return res;
  } catch (error) {
    console.log(error);
  }
  return null;
}
