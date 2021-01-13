<template>
    <div class="chat-wrapper">
        <div class="chat-header">Witamy na czacie internetowym</div>

        <div class="messages-wrapper">
            <div class="chat-list" v-for="item in messages" v-bind:key="item.id">
                <div class="post_header">{{item.message}}</div>
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
                }
            },

        created(){
            this.getAllMessages()
            this.webSocket()
        },

        methods: {

            async webSocket(){
                
                this.connection = new WebSocket("wss://echo.websocket.org")

                this.connection.onmessage = () => {
                    this.getAllMessages()
                }
            },

            async putData() {
                const db = firebase.firestore();
                const date = await db.collection("messages")
                const body = {
                    message: this.message,
                    user: firebase.auth().currentUser.email,
                    date: new Date()
                }
                await this.connection.send(this.message);
                await date.add(body)
                this.message = ""
            },

            async getAllMessages(){

                const db = firebase.firestore();
                const dat = await db.collection("messages").orderBy("date", "asc").get()
                
                this.messages = (dat.docs.map(doc => ({ ...doc.data(), id: doc.id })));
            
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
    width: 200px;
    height: 300px;
    background-color: gray;
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
    height: 70%;
    overflow: scroll;
}
</style>