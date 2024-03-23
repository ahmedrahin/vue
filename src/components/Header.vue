<template>
    <ul>
        <li>
            <router-link :to="{ name: 'home' }">Home</router-link>
        </li>
        <li>
            <router-link :to="{ name: 'AddRes' }">Add Restrurent</router-link>
        </li>
        <li>
            <a @click="logout">Log Out</a>
        </li>
    </ul>
</template>

<script>
    export default {
        name: "HeaderCom",
        methods: {
            logout(){
                localStorage.clear();
                this.$router.push({name:'LogIn'})
            }
        },
        mounted(){
            let user = localStorage.getItem('user-info');
            if(!user){
                this.$router.push({name:'signUp'});
            }
        }
    }
</script>

<style scoped>
    li {
        list-style: none;
        margin: 0 10px;
        display: inline-block;
    }
    li a {
        text-decoration: none;
        color: white;
        cursor: pointer;
    }
    ul{
        background: #111;
        padding: 15px;
    }
</style>
