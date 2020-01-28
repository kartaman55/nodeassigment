import axios from 'axios';

const url = 'http://localhost:5000/api/posts/';


class PostService {

    //Get Posts
    static getPosts() {
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

    //Create Posts
    static insertPost(text, topic, price, location, provider, review) {
        return axios.post(url, {
            text,
            topic,
            price,
            location,
            provider,
            review
        });
    }

    //Delete Posts
    static deletePost(id) {
        return axios.delete(`${url}${id}`);
    }

}

export default PostService;

//commant