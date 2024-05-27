import { client } from "../client";

export async function fetchAllUsers() {
    try {
        const data = await client.fetch(`*[_type == "users"]{
            _id,
            username
        }`);
        
        return data;
    } catch (error) {
        console.error('Could not fetch all users:', error);
    }
}
export async function fetchUsersAsFriends(loggedInUser) {
    try {
        const data = await client.fetch(`*[_type == "users" && username != $loggedInUser]{
            _id,
            username
        }`,{loggedInUser});
        return data
    } catch (error) {
        console.error("Could not fetch none logged in user:", error)
    }
}