// AuthContext.js
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect( () => {
    // Function to check if the user is logged in on the server
    const checkLoggedInStatus = async () => {
      try {
        // Make a server request to check if the user is logged in
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/api/user/loginstatus`,
          { withCredentials: true }
        );
        if(response.status===200){
        setFirstName(response.data.firstName);
        setIsLoggedIn(true);
        }
      } catch (error) {
        // If the server returns an error (e.g., 401 Unauthorized), it means the user is not logged in
        setIsLoggedIn(false);
      }
      finally{
        setInitialLoading(false);
      }
      
    };

    // Check if the user is logged in when the component mounts
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
