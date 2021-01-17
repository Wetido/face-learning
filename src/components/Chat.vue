<template>
<div>
    <div class="chat-wrapper" id="wrapper">
            <div class="chat-header-wrapper">
                <div class="chat-header">Witamy na czacie internetowym</div>
                <div class="close-button" @click="closeChat()">X</div>
            </div>

            <div class="messages-wrapper">
                <div class="chat-list" v-for="item in messages" v-bind:key="item.id">
                    <div v-if="item.user === 'you'" class="post-header-you">
                        <div class="spacing"></div>
                        <div class="content">{{item.message}}</div>
                    </div>
                    <div v-else class="post-header-other">
                        
                        <div class="content">{{item.message}}</div>
                        <div class="spacing"></div>
                    </div>
                </div>
            </div>
            <div class="send-form">
                <b-input class="send-input" v-model="message"></b-input>
                <b-button @click="putData" class="send-button">Wyslij</b-button>
            </div>

    </div>

    <div class="chat-wrapper-hidden" id="wrapper-hidden">
        <div class="chat-header-wrapper">
            <div class="chat-header">Otwórz czat</div>
            <div class="close-button" @click="showChat()">^</div>
        </div>
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
            },

            closeChat(){

                const chatWrapper = document.getElementById('wrapper');
                chatWrapper.style.visibility  = "hidden"

                const closeChatWrapper = document.getElementById('wrapper-hidden')
                closeChatWrapper.style.visibility  = "visible"
            },

            showChat(){

                
                const closeChatWrapper = document.getElementById('wrapper-hidden')
                closeChatWrapper.style.visibility  = "hidden"

                const chatWrapper = document.getElementById('wrapper');
                chatWrapper.style.visibility  = "visible"

            }


    }
}
</script>

<style scoped>



.chat-header-wrapper{
    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    background-color: indianred;
    border-radius: 5px;
}

.chat-wrapper-hidden{

    width: 400px;
    background-color: rgb(235, 230, 230);
    border: 1px rounded black;
    border-radius: 5px;
    position: fixed;
    float: right;
    z-index: 50;
    bottom: 0;
    right: 15px;
}

#wrapper-hidden{
    visibility: hidden;
}

.close-button{
    margin-left: auto;
    margin-right: 5px;
}

.chat-list{
    margin: 15px 15px 15px 0px;
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
    height: 85%;
    overflow-y: scroll;
    overflow-x: hidden;
    margin-left: 5px;
    
    font-size: 1rem;
}

.messages-wrapper::-webkit-scrollbar{
    width:10px
}

.messages-wrapper::-webkit-scrollbar-thumb{
    border-radius: 5px;
    background: rgba(41, 40, 40, 0.1);
}

.post-header-you{

    margin: 2px 5px 2px 5px;
    padding: 2px 5px 2px 5px;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;

}

.post-header-other{

    order: -1;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    margin: 2px 5px 2px 5px;
    padding: 2px 5px 2px 5px;
}

.post-header-you > div {

    background-color: rgb(27, 184, 27);
    padding: 7px;
    border-radius: 10px;
    text-align: right;
}

.post-header-other > div {

    background-color: rgb(110, 110, 224);
    padding: 7px;
    border-radius: 10px;
}


.spacing{
    width: 20%;
    margin: 5px;
    visibility: hidden;
}

.content{
    width: 77%;
}




</style>