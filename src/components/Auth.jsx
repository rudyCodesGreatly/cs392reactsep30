// Auth.jsx
import React, { useEffect, useState } from "react";
import { auth, googleProvider, db } from "../utilities/firebaseConfig";
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

const Auth = ({ setUserRole }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // State to hold user role

    const signInWithGoogle = async () => {
        try {
            const result = await signInWithPopup(auth, googleProvider);
            setUser(result.user);

            const userRef = doc(db, "users", result.user.uid);
            const userDoc = await getDoc(userRef);

            if (!userDoc.exists()) {
                // Set default role as "user" if new
                await setDoc(userRef, {
                    roles: "user",
                    email: result.user.email,
                    displayName: result.user.displayName,
                });
                setRole("user");
                setUserRole("user");
            } else {
                const userRole = userDoc.data().roles;
                setRole(userRole);
                setUserRole(userRole);
            }
        } catch (error) {
            console.error("Error during Google sign-in", error);
        }
    };

    const handleSignOut = () => {
        signOut(auth).then(() => {
            setUser(null);
            setRole(null);
            setUserRole(null);
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setUser(user);
                const userDoc = await getDoc(doc(db, "users", user.uid));
                if (userDoc.exists()) {
                    const userRole = userDoc.data().roles;
                    setRole(userRole);
                    setUserRole(userRole);
                }
            } else {
                setUser(null);
                setRole(null);
                setUserRole(null);
            }
        });
        return () => unsubscribe();
    }, [setUserRole]);

    return (
        <div className="absolute top-4 right-4">
            {user ? (
                <div className="flex items-center space-x-2">
                    <span className="text-gray-700">Role: {role}</span>
                    <button
                        onClick={handleSignOut}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Sign Out
                    </button>
                </div>
            ) : (
                <button
                    onClick={signInWithGoogle}
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Sign in with Google
                </button>
            )}
        </div>
    );
};

export default Auth;
