import firebaseui from "firebaseui";
import { useState, useEffect } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import "firebase/auth";

const uiConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [{
    provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    requireDisplayName: false
  }]
}

const FirebaseAuth = () => {
  const [renderAuth, setRenderAuth] = useState(false)

  useEffect(() => {
    setRenderAuth(true);
  }, [])

  return (
    <div className='mt-16'>
      {
        renderAuth && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
      }
    </div>
  )
}

export default FirebaseAuth
