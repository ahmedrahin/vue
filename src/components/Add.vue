<template>
    <HeaderCom />
    <div class="container">
        <div class="addBox">
            <h3>Add Restaurant</h3>
            <img src="../assets/logo.png" alt="Logo">
            <div class="register">
                <label for="name">Restaurant Name</label>
                <input type="text" id="name" placeholder="Enter Restaurant name" v-model="name" />
                <p v-if="!name && signUpClicked" class="error">Name field is required!</p>
                <label for="addresss">Address</label>
                <input type="text" id="address" placeholder="Restaurant Restaurant" v-model="address" />
                <p v-if="!email && signUpClicked" class="error">Address is required!</p>
                <label for="contact">Contact No.</label>
                <input type="text" id="contact" placeholder="Contact No." v-model="contact" />
                <button @click="add">Add New Restaurant</button>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import HeaderCom from "./Header.vue";
export default {
    name: "AddRes",
    components: {
        HeaderCom
    },
    data() {
        return {
            name: "",
            address: "",
            contact: "",
            signUpClicked: false
        }
    },
    methods: {
        async add() {
            if (!this.name || !this.address) {
                this.signUpClicked = true;
                return;
            }
            
            try {
                let result = await axios.post("http://localhost:3000/restaurent", {
                    name: this.name,
                    address: this.address,
                    contact: this.contact,
                });
                if( result.status == 201 ){
                    localStorage.setItem("restaurent-info", JSON.stringify(result.data));
                    this.$router.push({name:'home'})
                }
            } catch (error) {
                console.error("Error signing up:", error);
            }
        }
    },
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

    .addBox img {
        width: 150px;
        display: block;
        margin: auto;
    }

    .addBox {
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
            margin-top: 70px;
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
        margin-top: 20px;
    }
    .error {
        color: red;
        margin-top: 0px;
        font-size: 13px;
    }
</style>
