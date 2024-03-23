import {createRouter, createWebHistory} from "vue-router";
import HomeCom from "./components/Home.vue";
import SignUp from "./components/SignUp.vue";
import LogIn from "./components/Login.vue";
import AddRes from "./components/Add.vue";
import UpRes from "./components/Update.vue";

const routes = [
    {name:"home", path:"/", component:HomeCom},
    {name:"signUp", path:"/sign-up", component:SignUp},
    {name:"LogIn", path:"/login", component:LogIn},
    {name:"AddRes", path:"/add", component:AddRes},
    {name:"update", path:"/update/:id", component:UpRes},
]

const router=createRouter({
    history:createWebHistory(),
    routes
})

export default router;