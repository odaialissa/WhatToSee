import { client } from "../client";

export async function fetchFavoredMovies(loggedInUser) {

  try {
      const data = await client.fetch(
      `*[_type == "users" && username == $loggedInUser]{
        "favoredMovies": favoredMovies[]->{
        "movietitle": movietitle,
        "poster": poster,
        "IMDBid": IMDBid,
        "genres": genres[].genre
}
}`,{loggedInUser});
      return data
  } catch(error) {
      console.error("Error fetching favored films")
  }
}

export async function fetchWishListedMovies(loggedInUser) {
  try {
    const data = await client.fetch(
      `*[_type == "users" && username == $loggedInUser]{
          "wishlistedMovies": wishlistedMovies[]->{
          "movietitle": movietitle,
          "poster": poster,
          "IMDBid": IMDBid,
          "genres": genres[].genre
}
}`,{ loggedInUser });
    return data

  } catch (error) {
    console.error("Error fetching wishlisted movies");
  }
}


export async function fetchMovieListsOfUsers(loggedInUser, friend) {
  try {
    const data = await client.fetch(
      // fetching the favored lists of both users in order to compare them and find same movies
      `{
  $loggedInUser: *[_type == "users" && username == $loggedInUser]{
    "favoredMovies": favoredMovies[]->{
      "movietitle": movietitle,
      "poster": poster,
      "IMDBid": IMDBid
    },
    "wishlistedMovies": wishlistedMovies[]->{
      "movietitle": movietitle,
      "poster": poster,
      "IMDBid": IMDBid
    }
  },
  $friend: *[_type == "users" && username == $friend]{
    "favoredMovies": favoredMovies[]->{
      "movietitle": movietitle,
      "poster": poster,
      "IMDBid": IMDBid
    },
    "wishlistedMovies": wishlistedMovies[]->{
      "movietitle": movietitle,
      "poster": poster,
      "IMDBid": IMDBid
    }
  }
}`,
      { loggedInUser, friend }
    );
    return data
  } catch (error) {
    console.error("Error fetching same favored movies");
  }
}


/*
component function
const getSameFavoredAndWishListedMovies = async (loggedInUser, friend) => {

    const data = await fetchSameFavoredAndWishListedMovies(loggedInUser, friend)

    const LoggedInUserFavMovies = data[loggedInUser][0]?.favoredMovies || []
    const FriendFavMovies = data[friend][0]?.wishlistedMovies || []

    const SameMoviesComparison = LoggedInUserFavMovies.filter(
      movie1 => FriendwlMovies.some(movie2 => movie2.movietitle === movie1.movietitle))
    console.log(SameMoviesComparison)
  }
*/

/* TODO:
  When working on the A-requirement, fetching the wishlist of a user and 
  favored list of the other user, and the opposite in order to get the same movies in both lists
  DO THIS
  - get both lists when fetching of both users
  - when working in component, compare the user1 favlist wiht user2 wishlist - first
  - when working in component, compare the user1 wishlist wiht user2 favlist - second

  then show them
  AVOID:
  - duplicated movies - use filter in this case


*/