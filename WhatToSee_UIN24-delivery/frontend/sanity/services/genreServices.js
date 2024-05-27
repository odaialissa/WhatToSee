import { client } from "../client";

export async function fetchSameGenres(loggedInUser, friend) {
   try {
      const data = await client.fetch(
        `{
  $loggedInUser: *[_type == "users" && username == $loggedInUser]{
    "favoredGenres": favoredGenres
  },
  $friend: *[_type == "users" && username == $friend]{
    "favoredGenres": favoredGenres
  }
}`,{ loggedInUser, friend });
      return data
   } catch (error) {
      console.error("Error fetching genres", error);
   }
}