// AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect( () => {
    const checkLoggedInStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/loginstatus`,
          { withCredentials: true }
        );
        if(response.status===200){
        setFirstName(response.data.firstName);
        console.log(response.data.firstName)
        setIsLoggedIn(true);
        }
      } catch (error) {
        const name = error.response.data.firstName;

        if(!name){
          setFirstName("?");
        }
        else{
          setFirstName(name);
        }
        
        setIsLoggedIn(false);
      }
      finally{
        setInitialLoading(false);
      }
      
    };

    checkLoggedInStatus();
  }, []);

  useEffect(() => {
    console.log("isLoggedIn:", isLoggedIn);
  }, [isLoggedIn]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, firstName, setFirstName, initialLoading}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
