<template>
<div class="container">
    <div class="signUpBox">
        <h3>Sign Up</h3>
        <img src="../assets/logo.png" alt="Logo">
        <div class="register">
            <label for="name">Name</label>
            <input type="text" id="name" placeholder="Enter your name" v-model="name" />
            <p v-if="!name && signUpClicked" class="error">Name field is required!</p>
            <label for="email">Email</label>
            <input type="email" id="email" placeholder="Enter your email" v-model="email" />
            <p v-if="!email && signUpClicked" class="error">Email field is required!</p>
            <label for="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" v-model="password" />
            <p v-if="!password && signUpClicked" class="error">Password field is required!</p>
            <button @click="signUp">Sign Up</button>
            <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            <span>
                <router-link :to="{name:'LogIn'}">Already have an account?</router-link>
            </span>
        </div>
    </div>
</div>
</template>

<script>
import axios from "axios";
export default {
    name: "SignUp",
    data() {
        return {
            name: "",
            email: "",
            password: "",
            signUpClicked: false
        }
    },
    methods: {
        async signUp() {
            if (!this.name || !this.email || !this.password) {
                this.signUpClicked = true;
                return;
            }
            
            try {
                let result = await axios.post("http://localhost:3000/user", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                });
                if( result.status == 201 ){
                    localStorage.setItem("user-info", JSON.stringify(result.data));
                    this.$router.push({name:'home'})
                }
            } catch (error) {
                console.error("Error signing up:", error);
            }
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        if(user){
            this.$router.push({name:'home'});
        }
    }
}
</script>

<style scoped>
    h3 {
        text-align: center;
    }

    .register label {
        padding-bottom: 8px;
    }

    .register input {
        display: block;
        margin-bottom: 10px;
        width: 100%;
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        margin-top: 5px;
    }

    .signUpBox img {
        width: 150px;
        display: block;
        margin: auto;
    }

    .signUpBox {
        width: 400px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 97vh;
    }

    button {
        border: none;
        background: #000000d1;
        color: white;
        font-weight: 600;
        padding: 8px 40px;
        border-radius: 2px;
        display: block;
        margin: auto;
        margin-top: 8px;
        float: left;
    }
    .error {
        color: red;
        margin-top: 0px;
        font-size: 13px;
    }
    span a {
        font-size: 13px;
        font-weight: 500;
        float: right;
        margin-top: 17px;
    }
</style>
