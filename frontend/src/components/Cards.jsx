//profile info cards 

import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/userContext";
import { cardStyles } from "./landingPageStyle";
import { useContext } from "react";

export const ProfileInfoCards = () => { 
  const navigate = useNavigate();
  
  const {user, clearUser} = useContext(UserContext);
  
  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear()
    clearUser();
    navigate("/");
  };

  return (
    user && ( 
      <div className={cardStyles.profileCard}>
        <div className={cardStyles.profileInitialsContainer}>
          <span className={cardStyles.profileInitialsText}>{user.name ? user.name.charAt(0).toUpperCase() : ""}</span>
        </div>
         <div>
            <div className={cardStyles.profileName}>
              {user.name || ''}
            </div>
            <button className={cardStyles.logoutButton} onClick={handleLogout}>Logout</button>
         </div>
      </div>
    )
  )
} 

