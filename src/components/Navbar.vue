<template>
    <div>
        <div class="navbar">
            <img class="navbar_logo" src="../assets/logo_on_start.png"/>

            <div class="navbar-icons">
                <AddPostModal></AddPostModal>
                <div class="email-label">{{email}}</div>
                <div class="signOut" @click="this.signOut">Wyloguj</div>
            </div>
        </div>

    </div>
</template>

<script>

    import firebase from "../database/firebase"
    import AddPostModal from "./AddPostModal"

    export default {

        data() {
            return {
                email: firebase.auth().currentUser.email
            };
        },
        methods: {
            signOut() {
                try{
                    firebase.auth().signOut()
                    this.$router.replace({ name: "Login" });
                }catch(error){
                    console.log(error)
                }
            }
        },

        components: {
            AddPostModal,
        }
    }

</script>

<style scoped>

.navbar_logo{
    max-height: 8em;
}  
.navbar{
    background-color: #383f4b;
}

.email-label{
    color: whitesmoke;
}

.navbar-icons{
    display: flex;
}

.signOut{
    cursor: pointer;
    margin-left: 8px;
    color: #cf1d1d;
}

.signOut:hover{
    color: #bd0606;
}
</style>