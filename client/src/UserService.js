
const url = 'http://localhost:5000/api/users/';

class UserService {

    //Get Posts
    static async getUsers() {
        const response = await fetch(url);
        const data = await response.json();

        return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }));
    }

    //Create Users
    static insertUser(email, password, usertype) {
        return fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
                usertype
            })
        });
    }

}
export default UserService
