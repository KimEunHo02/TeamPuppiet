import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

function Auth (){
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSingup, setIsSingup] = useState(true)
    const [isLoggined, setIsLoggined] = useState(false);
    const auth = getAuth();
    useEffect(()=>{
        onAuthStateChanged(auth, (user) =>{
          if(user){
            setIsLoggined(true);
          }else{
            setIsLoggined(fasle);
          }
        })
    },[]);
    



    const signup = () => {  
        createUserWithEmailAndPassword(auth, email, password);
    }
}

    const singup = () => {
        signInWithEmailAndPassword(auth, email, password);
    }

export const Auth = () => {
    return (
        <div>
            {isLoggined ? "로그인됨" : "로그인 안됨"}
            <input placeholder = "Email..."/>
            <input placeholder = "Password..."/>
        </div>
    )
}