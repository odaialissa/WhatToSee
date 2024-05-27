import React from 'react'

export default function MovieCard({idx, movietitle, poster, IMDBid, user, userList, comparedWith, comparedList}) {
  return (
    <>
     <article key={idx} className="movie-card">
        <img src={poster} alt={movietitle} />
        <a href={`https://www.imdb.com/title/${IMDBid}/`}>{movietitle}</a>
        {user && userList && <p className='list-info'>{user}, liste: {userList}</p>}
        {comparedWith && comparedList && <p className='list-info'>{comparedWith}, liste: {comparedList}</p>}
    </article>
    </>
  )
}
