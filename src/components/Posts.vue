<template>
  <div class="main-container">
      <Navbar></Navbar>
      <Chat></Chat>
      <div class="wall">
        <div v-if="this.items === null">Ladowanie</div>
        <div class="one_post" v-else v-for="item in items" v-bind:key="item.id">
          <b-card class="post_header">{{item.header}}</b-card>
          <b-card class="post_content">{{item.content}}</b-card>
        </div>
      </div>

  </div>
</template>

<script>
  import firebase from "../database/firebase.js";
  import { BootstrapVue } from 'bootstrap-vue'
  import Navbar from './Navbar'
  import Chat from '../components/Chat'
  import Vue from 'vue'

  Vue.use(BootstrapVue)

  export default {
    data () {
        return {
          items: null,
          update: false,
        }
      },
    created () {

      this.fetchData()
    },

    methods: {
        async fetchData() {
          const db = firebase.firestore();
          const date = await db.collection("posts")

          date.onSnapshot((data) => {
                this.items = (data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          })
          this.update = true
      }
    },
    components: {
      Navbar,
      Chat
    },
    name: 'Posts',
    props: {
      email: String
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .main-container{
    
    background-color: #c9ccd1;
  }

  .wall{
    padding: 20px;
  }

  .post_header{
    font-size: 1.5em;
    color:black;
    font-weight: bold;
    padding: 1%;
  }

  .post_content{
    font-size: 1.2em;
    color: black;
    padding-bottom: 2%;
  }
  
  .one_post{
    width: 100%;
    float:inline-start;
    margin: auto;
    border: 1px solid #ff6acd ;
    border-radius: 5px 5px;
    background-color: white;
    margin-top: 1%;
    margin-bottom: 1%;
  }

</style>
