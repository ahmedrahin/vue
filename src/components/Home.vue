<template>
<HeaderCom />
<h1>Hello {{name}}, Welcome</h1>

<table>
    <tr>
        <th>Sl.</th>
        <th>Restaurant Name</th>
        <th>Address</th>
        <th>Contact</th>
        <th style="text-align: center;">Action</th>
    </tr>
    <tr v-for="(item, index) in restaurent" :key="item.id">
        <td>{{ index + 1 }}</td>
        <td>{{item.name}}</td>
        <td>{{item.address}}</td>
        <td>{{item.contact}}</td>
        <td style="text-align: center;">
            <button>
                <router-link :to="'/update/'+item.id">
                    <i class="fas fa-edit"></i>
                </router-link>
            </button>
            <button @click="del(item.id)">
                <i class="fas fa-trash-alt"></i>
            </button>
        </td>
    </tr>
</table>
</template>

<script>
import axios from 'axios';
import HeaderCom from "./Header.vue";
export default {
    name: "HomeCom",
    components: {
        HeaderCom
    },
    data() {
        return {
            name: "",
            restaurent: []
        }
    },
    methods: {
        async del(id) {
            let del = await axios.delete("http://localhost:3000/restaurent/" + id);
            if (del.status == 200) {
                this.loadData()
                alert("Are You Sure?")
            }
        },
        async loadData() {
            let user = localStorage.getItem('user-info');
            this.name = JSON.parse(user).name;
            if (!user) {
                this.$router.push({
                    name: 'signUp'
                });
            }
            let result = await axios.get("http://localhost:3000/restaurent");
            this.restaurent = result.data;
        }
    },
    mounted() {
        this.loadData()
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    border: 1px solid #dddddd;
    text-align: left;
    padding: 8px;
}

th {
    background-color: #f2f2f2;
}

tr:nth-child(even) {
    background-color: #f2f2f2;
}

tr:hover {
    background-color: #dddddd;
}

th {
    background: black;
    color: white;
}

td button {
    background: transparent;
    border: none;
    cursor: pointer;
}

.fa-edit {
    color: #0000ffad;
}

.fa-trash-alt {
    color: #ff0000b5;
}
</style>
