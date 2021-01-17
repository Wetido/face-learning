<template>
<div class="chat-main"> 
    <div class="chat-wrapper" id="wrapper">
            <div class="chat-header-wrapper">
                <div class="chat-header">Witamy na czacie internetowym</div>
                <div class="close-button" @click="closeChat()">X</div>
            </div>

            <div class="messages-wrapper">
                <div class="chat-list" v-for="(item, index) in messages" v-bind:key="index">
                    <div v-if="messages[index+1] && messages[index-1]">
                    
                        <div v-if="item.user !== messages[index-1].user">
                            <div class="spacing"></div>
                        </div>

                        <div v-if="item.user === user" class="post-header-you">
                            <div class="spacing"></div>
                            <div class="content">{{item.message}}</div>
                        </div>

                        <div v-else class="post-header-other">
                            <div v-if="index === 1" class="first-message">
                                
                                <div class="user">{{item.user.split("@")[0]}}</div>
                                <div class="content">{{item.message}}</div>
                            </div>

                            <div v-else-if="item.user !== messages[index-1].user" class="first-message">
        
                                <div class="user">{{item.user.split("@")[0]}}</div>
                                <div class="content">{{item.message}}</div>
                            </div>

                            <div v-else>
                                <div class="content">{{item.message}}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="send-form">
                <b-input class="send-input" v-model="message"></b-input>
                <b-button @click="putData" class="send-button">Wyslij</b-button>
            </div>

    </div>

    <!-- <div v-else-if="item.user !== messages[index+1].user" class="user">{{item.user.split("@")[0]}}</div> -->

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
                    this.messages = (data.docs.map(doc => ({ ...doc.data(), id: doc.id})));
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

.chat-main{
    font-family: 'Open Sans', sans-serif;
}


.chat-header-wrapper{


    display: flex;
    flex-wrap: wrap;
    padding: 5px;
    background-color: #f365dbc5;
    border-radius: 5px;
}

.chat-wrapper-hidden{

    width: 400px;
    background-color: rgb(241, 204, 230);
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


.chat-wrapper{
    width: 400px;
    height: 600px;
    background-color: rgb(248, 248, 248);
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


    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;

}



.post-header-you > div{

    background-color: rgba(50, 201, 50, 0.637);
    border-radius: 10px;
    text-align: right;
    padding: 6px;

    margin: 2px 0px 0px 0px;
}

.post-header-other > div > div{

    background-color: rgba(136, 136, 231, 0.596);
    padding: 5px;
    border-radius: 10px;
    order: -1;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    padding: 6px;
    margin: 2px 0px 0px 0px;
}



.spacing{
    width: 20%;
    margin: 10px;
    visibility: hidden;
}

.content{
    width: 74% !important;
}

.user{

    font-size: 0.6rem;
    background-color: rgb(248, 248, 248) !important;
    width: 100%;
    margin: 0px;
    padding: 0px;
}




</style>