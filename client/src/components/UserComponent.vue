<template>
    <div class="container">
        <h1>Register Below</h1>
        <div class="create-user">
            <label for="create-email"></label>
            <input type="text" id="create-email" v-model="email" placeholder="Enter Email" />
            <label for="create-password"></label>
            <input type="text" id="create-password" v-model="password" placeholder="Enter Password" />
            <label for="create-usertype"></label>
            <input type="text" id="create-usertype" v-model="usertype" placeholder="Enter User Type" />
            <button v-on:click="createUser">Register Now</button>
        </div>
    </div>
</template>

<script>

    import UserService from '../UserService';

    export default {
        name: 'UserComponent',
        data() {
            return {
                users: [],
                error: '',
                email: '',
                password: '',
                usertype: ''
            }

        },
        async created() {
            try {
                this.users = await UserService.getUsers();
            } catch (err) {
                this.error = err.messege;
            }
        },

        methods: {
            async createUser() {
                await UserService.insertUser(this.email, this.password, this.usertype);
                this.users = await UserService.getUsers();
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

    div.created-at {
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
