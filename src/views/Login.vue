<template>
    <!-- <div>
        <input type="email" placeholder="Email" v-model="email"/><br>
        <input type="password" placeholder="Hasło" v-model="password"/><br>
        <button @click="this.login">Login</button>
        <router-link to="/singup">Nie masz konta? Rejestracja.</router-link>
    </div> -->
    <div class="container-fluid px-1 px-md-5 px-lg-1 px-xl-5 py-5 mx-auto">
    <div class="card card0 border-0">
        <div class="row d-flex">
            <div class="col-lg-6">
                <div class="card1 pb-5">

                    <div class="row px-3 justify-content-center mt-4 mb-5 border-line"> <img src="../assets/logo_on_start.png" class="image"> </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card2 card border-0 px-4 py-5">
                    <h2>Logowanie</h2>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Email</h6>
                        </label> <input class="mb-4" type="text" name="email" v-model="email" placeholder="Enter a valid email address"> </div>
                    <div class="row px-3"> <label class="mb-1">
                            <h6 class="mb-0 text-sm">Hasło</h6>
                        </label> <input type="password" name="password" v-model="password" placeholder="Enter password"> </div>
                    <!-- <div class="row px-3 mb-4">
                        <div class="custom-control custom-checkbox custom-control-inline"> <input id="chk1" type="checkbox" name="chk" class="custom-control-input"> <label for="chk1" class="custom-control-label text-sm">Remember me</label> </div> <a href="#" class="ml-auto mb-0 text-sm">Forgot Password?</a>
                    </div> -->
                    <div class="row mb-3 px-3"> <button type="submit" class="btn btn-blue text-center" @click="this.login">Zaloguj</button> </div>
                    <div class="row mb-4 px-3"> <small class="font-weight-bold">Don't have an account? <router-link to="/singup" class="text-danger ">Zarejestruj</router-link></small> </div>
                </div>
            </div>
        </div>
        <div class="bg-blue py-4">
            <div class="row px-3"> <small class="ml-4 ml-sm-5 mb-2">&copy; face-learning by Adzia & Kubuś</small>
                <div class="social-contact ml-4 ml-sm-auto"> <span class="fa fa-facebook mr-4 text-sm"></span> <span class="fa fa-google-plus mr-4 text-sm"></span> <span class="fa fa-linkedin mr-4 text-sm"></span> <span class="fa fa-twitter mr-4 mr-sm-5 text-sm"></span> </div>
            </div>
        </div>
    </div>
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
body {
    color: #000;
    overflow-x: hidden;
    height: 100%;
    background-color: #fcb4ec;;
    background-repeat: no-repeat
}
h2 {
    text-align: center;
}

.card0 {
    box-shadow: 0px 4px 8px 0px #464646;
    border-radius: 0px
}

.card2 {
    margin: 0px 40px
}

.logo {
    width: 200px;
    height: 100px;
    margin-top: 20px;
    margin-left: 35px
}

.image {
    width: 80%;

}

.border-line {
    border-right: 1px solid #EEEEEE
}

.line {
    height: 1px;
    width: 45%;
    background-color: #E0E0E0;
    margin-top: 10px
}

.or {
    width: 10%;
    font-weight: bold
}

.text-sm {
    font-size: 14px !important
}

::placeholder {
    color: #fcb4ec;
    opacity: 1;
    font-weight: 300
}

:-ms-input-placeholder {
    color: #fcb4ec;
    font-weight: 300
}

::-ms-input-placeholder {
    color: #fcb4ec;
    font-weight: 300
}

input,
textarea {
    padding: 10px 12px 10px 12px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    margin-bottom: 5px;
    margin-top: 2px;
    width: 100%;
    box-sizing: border-box;
    color: #ff41df;
    font-size: 14px;
    letter-spacing: 1px
}

input:focus,
textarea:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    border: 1px solid #ff6acd;
    outline-width: 0
}

button:focus {
    -moz-box-shadow: none !important;
    -webkit-box-shadow: none !important;
    box-shadow: none !important;
    outline-width: 0
}

a {
    color: inherit;
    cursor: pointer
}

.btn-blue {
    background-color: #ca3197;
    width: 150px;
    color: #fff;
    border-radius: 2px
}

.btn-blue:hover {
    background-color: #000;
    cursor: pointer
}

.bg-blue {
    color: #fff;
    background-color: #ca3197;
}

@media screen and (max-width: 991px) {
    .logo {
        margin-left: 0px
    }

    .image {
        width: 80%;
    }

    .border-line {
        border-right: none
    }

    .card2 {
        border-top: 1px solid #EEEEEE !important;
        margin: 0px 15px
    }
}
</style>