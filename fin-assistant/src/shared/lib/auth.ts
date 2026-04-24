import { signInAnonymously } from "firebase/auth";
import { auth } from "../../app/providers/firebase";


export const loginAnonymous = async () => {
    await signInAnonymously(auth);
};

export const getCurrentUser = () => {
    return auth.currentUser;
};