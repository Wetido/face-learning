<template>
    <div class="chat-wrapper">
        <div class="chat-header">Witamy na czacie internetowym</div>

        <div class="messages-wrapper">
            <div class="chat-list" v-for="item in messages" v-bind:key="item.id">
                <div v-if="item.user === 'you'" class="post-header-you"><span>{{item.message}}</span></div>
                <div v-else class="post-header-other"><span>{{item.message}}</span></div>
            </div>
        </div>
        <div class="send-form">
            <b-input class="send-input" v-model="message"></b-input>
            <b-button @click="putData" class="send-button">Wyslij</b-button>
        </div>
    </div>
</template>

<script>
import firebase from "../database/firebase.js";
        

export default {

        data() {
                return {
                    message: "",
                    messages: [],
                    connection: null,
                    user: firebase.auth().currentUser.email
                }
            },

        created(){
            this.getAllMessages()

        },

        methods: {

            // async webSocket(){
                
            //     this.connection = new WebSocket("wss://echo.websocket.org")

            //     this.connection.onmessage = () => {
            //         this.getAllMessages()
            //     }
            // },

            async putData() {
                const db = firebase.firestore();
                const date = await db.collection("messages")
                const body = {
                    message: this.message,
                    user: firebase.auth().currentUser.email,
                    date: new Date()
                }
                await date.add(body)
                this.message = ""
            },

            async getAllMessages(){

                const db = firebase.firestore();
                const dat = await db.collection("messages").orderBy("date", "asc")
                
                dat.onSnapshot((data) => {
                    this.messages = (data.docs.map(doc => ({ ...doc.data(), id: doc.id, user: doc.data().user === this.user ? "you" : "other"})));
                })

                

                console.log(this.messages)
            }

    }
}
</script>

<style scoped>

.chat-header{

    background-color: indianred;
    border-radius: 5px;
}

.chat-wrapper{
    width: 400px;
    height: 600px;
    background-color: rgb(235, 230, 230);
    border: 1px rounded black;
    border-radius: 5px;
    position: fixed;
    float: right;
    z-index: 50;
    bottom: 0;
    right: 15px;
}

.send-form{
    display: inline-block;
    padding: 2px;
}

.send-input{
    position: absolute;
    bottom: 2px;
    width: 64%;
}

.send-button{
    position: absolute;
    bottom: 2px;
    right: 2px;
    width: 34%;
}

.messages-wrapper{
    height: 90%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 5px;
}

.messages-wrapper::-webkit-scrollbar{
    width:10px
}

.messages-wrapper::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background: rgba(41, 40, 40, 0.1);
}

.post-header-you{

    margin: 5px;
    padding: 5px;
    text-align: right;
    width: 100%;
}

.post-header-you > span {
    background-color: rgb(27, 184, 27);
    padding: 7px;
    border-radius: 10px;
}

.post-header-other{

    margin: 5px;
    padding: 5px;
    text-align: left;
}

.post-header-other > span {
    background-color: rgb(110, 110, 224);
    padding: 7px;
    border-radius: 10px;
}
</style>