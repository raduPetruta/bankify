'use server'

import { Account, ID, Permission, Role } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";



const {
    APPWRITE_DATABASE_ID: DATABASE_ID,
    APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
    APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;


export const signIn = async (userData: SignUpParams) => {
    try {
        const { account, database } = await createAdminClient();
        const response = await account.createEmailPasswordSession(userData.email, userData.password);
        
        if(response)
          return parseStringify(response) 
        else return null;
    } 
    catch (error) {
        console.error('Error', error)
    }
}

export const signUp = async (userData: SignUpParams) => {

    let newUserAccount;

    try {
        const { account, database } = await createAdminClient();

        newUserAccount = await account.create(
          ID.unique(), 
          userData.email, 
          userData.password, 
          `${userData.firstName} ${userData.lastName}`
        );

        if(!newUserAccount) throw new Error('Error creating user')

        const newUser = await database.createDocument(
            DATABASE_ID!,
            USER_COLLECTION_ID!,
            ID.unique(),
            {
                ...userData,
                userId: newUserAccount.$id
            },
            [
                Permission.read(Role.user(newUserAccount.$id)),  // User can read
                Permission.update(Role.user(newUserAccount.$id)), // User can update
                Permission.delete(Role.user(newUserAccount.$id))  // User can delete
            ]
        )

        const session = await account.createEmailPasswordSession(userData.email, userData.password);

        cookies().set("appwrite-session", session.secret, {
            path: "/",
            httpOnly: true,
            sameSite: "strict",
            secure: true,
        });
         
        return parseStringify(newUser);
    } 
    catch (error) {
        console.error('Error Signup', error);
        return null;
    }
}



export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const user = await account.get();
      return parseStringify(user);
    } 
    catch (error) {
      return null;
    }
}
