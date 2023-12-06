// import { AuthProvider } from "./context/authContext.js";
// import FormFirebaseLogin from "./pages/form.firebase.js";
import { useAuth } from "./context/authContext";
import HomeUsers from "./pages/home.users";
import HomePublic from "./pages/home.public";
// import { useNavigate } from "react-router-dom";
import React from "react";

function App() {
  const auth = useAuth();
  // const navigate = useNavigate();

  // console.log(auth.id)

  if(auth.state === 2) {
    return (
      <HomeUsers />
    )
  } 


  return (
    <div >
      <HomePublic /> 
    </div>
  );
}

export default App;
