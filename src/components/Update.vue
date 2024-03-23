<template>
    <HeaderCom />
    <div class="container">
        <div class="addBox">
            <h3>Update Restaurant</h3>
            <img src="../assets/logo.png" alt="Logo">
            <div class="register">
                <label for="name">Restaurant Name</label>
                <input type="text" id="name" placeholder="Enter Restaurant name" v-model="restaurant.name"/>
                <p v-if="!restaurant.name && signUpClicked" class="error">Name field is required!</p>
                <label for="address">Address</label>
                <input type="text" id="address" placeholder="Restaurant Restaurant" v-model="restaurant.address" />
                <p v-if="!restaurant.address && signUpClicked" class="error">Address is required!</p>
                <label for="contact">Contact No.</label>
                <input type="text" id="contact" placeholder="Contact No." v-model="restaurant.contact" />
                <button @click="update">Save Changes</button>
                <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";
import HeaderCom from "./Header.vue";
export default {
    name: "upRes",
    components: {
        HeaderCom
    },
    data() {
        return {
            restaurant:{
                name: "",
                address: "",
                contact: "",
            },
            signUpClicked: false,
            errorMessage: ""
        }
    },
    methods: {
        async update() {
            if (!this.restaurant.name || !this.restaurant.address) {
                this.signUpClicked = true;
                return;
            }
            
            try {
                let result = await axios.put("http://localhost:3000/restaurent/"+ this.$route.params.id, {
                    name: this.restaurant.name,
                    address: this.restaurant.address,
                    contact: this.restaurant.contact,
                });
                if (result.status === 200) {
                    localStorage.setItem("restaurent-info", JSON.stringify(result.data));
                    this.$router.push({name:'home'})
                    
                }
            } catch (error) {
                console.error("Error signing up:", error);
                this.errorMessage = "Error occurred while saving changes.";
            }
        }
    },
    async mounted() {
        try {
            let response = await axios.get('http://localhost:3000/restaurent/' + this.$route.params.id);
            this.restaurant = response.data
        } catch (error) {
            console.error("Error fetching restaurant details:", error);
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
