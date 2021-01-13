<template>
    <div>
        <input type="email" placeholder="Email" v-model="email"/><br>
        <input type="password" placeholder="Hasło" v-model="password"/><br>
        <button @click="this.login">Login</button>
        <router-link to="/singup">Nie masz konta? Rejestracja.</router-link>
    </div>
</template>

<script>
import firebase from "../database/firebase"

export default {
    data() {
        return {
            email: "",
            password: ""
        };
    },
    methods: {
        async login() {
            try{
                await firebase.auth().signInWithEmailAndPassword(
                    this.email, this.password)
                this.$router.replace({ name: "Main" });
            }catch(error){
                console.log(error)
            }
        }
    }
}
</script>

<style scoped>

</style>