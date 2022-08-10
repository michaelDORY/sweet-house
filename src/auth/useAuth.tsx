import {
  useEffect,
  useState,
  useContext,
  createContext,
  FC, ReactNode,
} from "react";
import {useRouter} from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "./initFirebase";
import {removeTokenCookie, setTokenCookie} from "./tokenCookies";

initFirebase()

interface IAuthContextValue {
  user: firebase.User | null;
  authenticated: boolean;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextValue>({
  authenticated: false,
  logout: () => {
  },
  user: null
})

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: FC<AuthProviderProps> = (props) => {
  const {children} = props;

  const [user, setUser] = useState<firebase.User | null>(null)
  const router = useRouter()

  useEffect(() => {
    const cancelAuthListener = firebase.auth().onIdTokenChanged(async (user) => {
      if (user) {
        setTokenCookie(await user.getIdToken())
        setUser(user)
      } else {
        removeTokenCookie()
        setUser(null)
      }
    })

    return () => cancelAuthListener()
  }, [])

  const logout = async () => {
    try {
      await firebase.auth().signOut()
      await router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <AuthContext.Provider value={{user, authenticated: !!user, logout}}>
      {children}
    </AuthContext.Provider>
  )
}

const useAuth = () => useContext(AuthContext)

export default useAuth
