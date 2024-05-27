import React, { useEffect, useState } from 'react';
import { useUser } from '../hooks/UserContext'; // Importer useUser-hooken
import { Link, useNavigate } from 'react-router-dom';
import { FaSmileWink, FaStar, FaHeart, FaSadTear } from "react-icons/fa";
import  WishlistFetchResult from './FetchResultsComponents/WishlistFetchResult'
import  FavoriteListFetchResult from './FetchResultsComponents/FavoriteListFetchResult';
import { fetchUsersAsFriends } from '../../sanity/services/userServices';


export default function Home() {
  // Bruk useUser-hooken for å få tilgang til den globale tilstanden
   const { loggedInUser, friendsList, setFriendsList} = useUser();
   
   const [friend, setFriend] = useState("")
   const [friendId, setFriendId] = useState("")

   const navigate = useNavigate()
   const getUsersAsFriends = async (loggedInUser) => {
      const data = await fetchUsersAsFriends(loggedInUser)
      setFriendsList(data)
   }

   const handleClick = (friend, friendId) => {
      navigate("/dashboard", {state: {friend, friendId}})
   }
   
   
   useEffect(() => {
      getUsersAsFriends(loggedInUser)
   }, [loggedInUser])
   

  // Sjekk om brukeren er logget inn ved å se etter brukerinformasjon
  // Hvis brukeren er logget inn, vis Dashboard-innholdet
if (loggedInUser) {
   return (
      <>
      <main>
         <h2>Hei, {loggedInUser} <FaSmileWink /></h2>
         <section className="friends-section">
            <h3>Se sammen med: </h3>
               {
                  friendsList?.map((friend, idx) => (
                     <button
                        key={idx}
                        onClick={() => handleClick(friend.username, friend._id)}>{friend.username}</button>
                  ))
               }
         </section>
         <section className="movieLists-section">
               <section className="favorite-list">
                  <h4> <FaStar /> Ditt favorittliste</h4>
                     <FavoriteListFetchResult />
               </section>
               <span className='divider'></span>
               <section className="wish-list">
                  <h4> <FaHeart /> Ditt ønskeliste</h4>
                     <WishlistFetchResult/>
               </section>
         </section>
      </main>
      </>
   );
} else {

    // Hvis brukeren ikke er logget inn, vis feilmelding
   return (
      <>
         <main>
            <section className='login-err-msg'>
               <h2 className='oops'>Ooops ! <FaSadTear /></h2>
               <p className='error-msg'>403 - Du kan ikke få tilgang til denne siden fordi du ikke er logget inn.</p>
               <Link to={"/"}>Logg inn</Link>
            </section>

      </main>
      </>
   );
}
}


