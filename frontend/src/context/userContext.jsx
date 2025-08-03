import React from "react";
import { useEffect , useState } from "react";
import axiosInstance from "../utils/axiosAuth";
import { API_PATHS } from "../utils/apiPath";

export const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState();

  useEffect(()=> {
    // Check if user is already set
    if(user) return
    
    // Fetch user data from the server
    const accessToken = localStorage.getItem("token");

    // If no access token, set loading to false and return
    if(!accessToken) {
      setLoading(false);
      return;
    }; 
    const fetchUser = async () => {
      try {
        const response = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE);
        setUser(response.data);
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        clearUser()
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [user]);
  
  // Function to update user data and store token in localStorage
  const updateUser = (userData) => {
  setUser(userData);
  localStorage.setItem("token", userData.token);
  setLoading(false); 
   };
   
   // Function to clear user data and remove token from localStorage
   const clearUser = () => { 
    setUser(null);
    localStorage.removeItem("token");
    setLoading(false);
   }

   return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
   )
}

export default UserProvider;