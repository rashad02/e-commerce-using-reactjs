import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";


const config = {
        apiKey: "AIzaSyBdFN6Q0n_G1Aaofsyl8soUXXO9DmdqAOQ",
        authDomain: "all-in-one-f5b76.firebaseapp.com",
        databaseURL: "https://all-in-one-f5b76.firebaseio.com",
        projectId: "all-in-one-f5b76",
        storageBucket: "",
        messagingSenderId: "527322579367",
        appId: "1:527322579367:web:0f3114d84e92fd12db7682",
        measurementId: "G-TSEY6M8ZED"  
};

export const createUserProfileDocument = async(userAuth, additionalData) => {
        if(!userAuth) return false;

        const userRef = firestore.doc(`users/${userAuth.uid}`);

        const snapShot = await userRef.get();

        if(!snapShot.exists) {
                const { displayName, email } = userAuth,
                        createdAt = new Date();
                
                try{
                        await userRef.set({
                                displayName,
                                email,
                                createdAt,
                                ...additionalData
                        })
                } catch(error){
                        console.log(error);
                }
        }
        return userRef;
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();


const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});

export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;




