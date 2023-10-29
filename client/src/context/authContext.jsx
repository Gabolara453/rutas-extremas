import React, { useState, useEffect, createContext, useContext } from "react";
import { auth, storage } from "../firebase/firebase.config";
import { userExists, logout_User, login_User } from "./auth.backend.js";
import { useNavigate } from "react-router-dom";
import { 
  // createUserWithEmailAndPassword,
  // signInWithEmailAndPassword, 
  GoogleAuthProvider, 
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";


export const authContext = createContext();

export const useAuth = () => {
  const context = useContext(authContext);
  if(!context){
    console.log("error creating auth context")
  }
  return context;
};

export function AuthProvider ({children}) {
  const navigate = useNavigate();

  // const [error, setError] = useState("");
  const [user, setUser] = useState("");
  // const [firestore, setFirestore] = useState("");
  
  const [state, setState] = useState(0);
  const [userName, setUserName] = useState("");
  const [phto, setPhto] = useState("");
  const [accesstkn, setaccsTkn] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");

  useEffect(() => {
    const suscribed = onAuthStateChanged(auth, async (currentUser) => {
      if(!currentUser){
        console.log("no hay usuario suscrito");
        setUser("");
        setState(0);
      }else{
        setState(1);
        setUser(currentUser);
        setId(currentUser.uid)
        setUserName(currentUser.displayName);
        setEmail(currentUser.email)
        setPhto(currentUser.photoURL)
        setaccsTkn(currentUser.accessToken);
        const exists = await userExists(currentUser.uid);

        if (exists.success === true){
          setState(2);
        }
      }
    })
    return () => suscribed()
  }, [navigate])


  const registerWithGoogle = async() => {
    const responseGoogle = new GoogleAuthProvider();
    const response = await signInWithPopup(auth, responseGoogle)
    if (response) {
      onAuthStateChanged(auth, async (user) => {
        if(user){
          const exists = await userExists(user.uid);
          console.log(exists);

          if (exists.success === true){
            setState(2);
            console.log("Ya tienes un Usuario Existente!");
            await login_User(user.uid, user.accessToken);
            navigate("/home");
          } else {
            setState(0);
            console.log("no estas registrado");
            navigate("/register");
          }
        } else {
          setState(0);
          await signOut(auth);
          console.log("no estas logueado");
          navigate("/home");
        }
        
      })
    }
  }


  const logout = async () => {
    await logout_User(user.uid);
    setState(0);
    setUser("");
    const response = await signOut(auth);
    console.log(response);
  };

  // const setPostImages = async (uid, img, file) => {
  //   try{
  //     const imageRef = ref(storage, `images/${uid}/${img}`);
  //     const resUpload = await uploadBytes(imageRef, file);
  //     return resUpload;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  const setPostImages = async (imageList, id) => {
    try{
      const urls = [];

      for (let i = 0; i < imageList.length; i++) {
        const image = imageList[i];
        const imageName = `image_${i + 1}.jpg`;
        const imageRef = ref(storage, `images/${id}/${imageName}`);

        await uploadBytes(imageRef, image)

        const imageUrl = await getDownloadURL(imageRef);

        urls.push(imageUrl);
      }
      return urls;

    } catch (error) {
      console.error(error);
    }
  }
  const getUrlImages = async (path) => {
    try {
      const imageRef = ref(storage, path);
      const url = await getDownloadURL(imageRef);
      return url;
    } catch (error) {
      console.error(error)
    }
  }

  return ( 
    <authContext.Provider value={{ registerWithGoogle, logout, setPostImages, getUrlImages, state, user, id, userName, email, phto, accesstkn }}>
      { children }
    </authContext.Provider>
  )
};
