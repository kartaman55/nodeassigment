const url = 'http://localhost:5000/api/posts/';

class PostService {
    
    //Get Posts
    static async getPosts() {
        const response = await fetch(url);
        const data = await response.json();

        return data.map(post => ({
            ...post,
            createdAt: new Date(post.createdAt)
        }));
    }


    //Create Posts
    static insertPost(text, topic, price, location, provider, review) {
        return fetch(url, {
            method: "POST",
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                text,
                topic,
                price,
                location,
                provider,
                review

            })
        });
    }

  //Delete Posts
  static deletePost(id) {
    return fetch(`${url}${id}`, {
      method: "DELETE"
    });
    }

    //Update Posts
    static updatePost(id, updatedText) {
        return fetch(`${url}${id}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                'Accept': 'application / json',
                'Content-Type': 'application/json;charset=UTF-8'
            },
            body: JSON.stringify({
                updatedText
            })
        });
    }
}



export default PostService