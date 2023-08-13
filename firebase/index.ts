import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import {
  getAuth,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB_XyJqr16fD33Vx_c7JoNcqwyHbELKG3Q",
  authDomain: "social-media-7cc3d.firebaseapp.com",
  projectId: "social-media-7cc3d",
  storageBucket: "social-media-7cc3d.appspot.com",
  messagingSenderId: "275296910536",
  appId: "1:275296910536:web:ed6479abb9cd2516b9f9fd",
  measurementId: "G-5PQV1CTFT5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);
const provider = new FacebookAuthProvider();
const loginByFacebook = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // The signed-in user info.
      const user = result.user;

      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const credential = FacebookAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      console.log("login by facebook", {
        user,
        accessToken,
      });
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = FacebookAuthProvider.credentialFromError(error);
      // ...
    });
};
const providerGoogle = new GoogleAuthProvider();
const loginByGoogle = () => {
  const objResult = {
    user: {
      email: "",
      photoURL: "",
      middleName: "",
      firstName: "",
      lastName: "",
    },
    token: "",
  };
  signInWithPopup(auth, providerGoogle)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      objResult.token = credential?.accessToken || "";
      // The signed-in user info.
      objResult.user.email = result.user.email || "";
      objResult.user.photoURL = result.user.photoURL || "";

      const userName = result.user.displayName || "";
      // const name = spliceUsername(userName);
      // objResult.user.firstName = name.firstName;
      // objResult.user.middleName = name.middleName;
      // objResult.user.lastName = name.lastName;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  return objResult;
};
const logout = () => {
  signOut(auth)
    .then(() => {
      // Sign-out successful.
    })
    .catch((error) => {
      // An error happened.
    });
};

const uploadMedia = async (file: any, fileName: string) => {
  const storageRef = ref(storage, `${fileName}`);
  // Create file metadata including the content type
  /** @type {any} */
  const metadata = {
    contentType: "image/jpeg",
  };
  // Upload the file and metadata
  await uploadBytesResumable(storageRef, file, metadata);
  return getDownloadURL(storageRef);
};
export { loginByFacebook, loginByGoogle, logout, uploadMedia };
