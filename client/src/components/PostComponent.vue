<template>
    <div class="container">
        <h1>Courses</h1>
        <div class="create-post">
            <label for="create-post"></label>
            <input type="text" id="create-post" v-model="text" placeholder="Create a post" />
            <label for="create-topic"></label>
            <input type="text" id="create-topic" v-model="topic" placeholder="Create a topic" />
            <label for="create-price"></label>
            <input type="text" id="create-price" v-model="price" placeholder="Create a price" />
            <label for="create-location"></label>
            <input type="text" id="create-location" v-model="location" placeholder="Create a location" />
            <label for="create-provider"></label>
            <input type="text" id="create-provider" v-model="provider" placeholder="Create a provider" />
            <label for="create-review"></label>
            <input type="text" id="create-review" v-model="review" placeholder="Create a review" />
            <button v-on:click="createPost">Post!</button>
        </div>
        <hr>
        <p class="error" v-if="error">{{ error }}</p>
        <div class="posts-container">
            <div class="post" v-for="(post, index) in posts"
                 v-bind:item="post"
                 v-bind:index="index"
                 v-bind:key="post.id"
                 v-on:dblclick="deletePost(post._id)">
                {{ `${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}` }}
                <p class="text">{{ post.text }}</p>
                <p class="topic">{{ post.topic }}</p>
                <p class="price">{{ post.price }}</p>
                <p class="location">{{ post.location }}</p>
                <p class="provider">{{ post.provider }}</p>
                <p class="review">{{ post.review }}</p>
            </div>
        </div>
    </div>
</template>

<script>

    import PostService from '../PostService';

    export default {
        name: 'PostComponent',
        data() {
            return {
                posts: [],
                error: '',
                text: '',
                topic: '"Topic:" ',
                price: '"Price: "',
                location: '"Location: "',
                provider: '"Provider: "',
                review: '"Review: "'
            }
            
        },
        async created() {
            try {
                this.posts = await PostService.getPosts();
            } catch (err) {
                this.error = err.messege;
            }
        },

        methods: {
            async createPost() {
                await PostService.insertPost(this.text, this.topic, this.price, this.location, this.provider, this.review);
                this.posts = await PostService.getPosts();
            },
            async deletePost(id) {
                await PostService.deletePost(id);
                this.posts = await PostService.getPosts();
            }
        }
    };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container {
  max-width: 800px;
  margin: 0 auto;
}

p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at{
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
  color: white;
  font-size: 13px;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
}
</style>
