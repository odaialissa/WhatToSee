import React from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { useNavigate, Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { FaDisplay } from "react-icons/fa6";
import { BiSolidCameraMovie } from "react-icons/bi";

export default function Header() {
   const { loggedIn, loggedInUser, setLoggedIn, setLoggedInUser } = useUser(); // Bruk hooken for å få tilgang til den globale tilstanden

   const navigate = useNavigate();

   const handleLogOut = () => {
      localStorage.removeItem('loggedInUser');
      localStorage.removeItem('userId');
      setLoggedInUser(null);
      setLoggedIn(false);
      navigate("/");
   };

   return (
      <header>
         <nav>
            <h1>
               <Link to={"/home"}>
                  What To See?
               </Link>
            </h1>
            {loggedIn && (
               <ul>
                  <li className="menuItem">
                     <Link to={"/home"}>
                        <FaDisplay /> Hva skal jeg se?
                     </Link>
                  </li>
                  <li className="menuItem">
                     <Link to={"/genre"}>
                        <BiSolidCameraMovie/> Bla gjennom sjangere
                     </Link>
                  </li>
                  <li className="menuItem">
                     <FaUserCircle /> {loggedInUser}
                     <button onClick={handleLogOut}>Logg ut</button>
                  </li>
               </ul>
            )}
         </nav>
      </header>
   );
}
