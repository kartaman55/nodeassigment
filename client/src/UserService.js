import axios from 'axios';

const url = 'http://localhost:5000/api/users/';


class UserService {

    //Get Users
    static getUsers() {
        return new Promise(async (resolve, reject) => {
            try {
                const res = await axios.get(url);
                const data = res.data;
                resolve(
                    data.map(post => ({
                        ...post,
                        createdAt: new Date(post.createdAt)
                    }))
                );
            } catch (err) {
                reject(err);
            }
        })
    }

    //Create User
    static insertUser(email, password, usertype) {
        return axios.post(url, {
            email,
            password,
            usertype
        });
    }
}

export default UserService;

//commant