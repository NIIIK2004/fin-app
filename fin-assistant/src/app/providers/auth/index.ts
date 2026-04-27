import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { firebaseApp } from "../firebase";

const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

export const registerWithEmail = async (
    email: string,
    password: string,
) => {
    return await createUserWithEmailAndPassword(
        auth,
        email,
        password,
    )
}

export const loginWithEmail = async (
    email: string,
    password: string
) => {
    return await signInWithEmailAndPassword(
        auth,
        email,
        password
    )
}

export const loginWithGoogle = async () => {
    return await signInWithPopup(
        auth,
        googleProvider
    )
}

export const logoutUser = async () => {
    return await signOut(auth);
};

export { auth };