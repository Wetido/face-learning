<template>
  <div class="main-container">
      <div>
        <div v-if="this.items === null">Ladowanie</div>
        <div v-else v-for="item in items" v-bind:key="item.id">{{item.content}}</div>
      </div>
  </div>
</template>

<script>
import firebase from "../database/firebase.js";

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
  name: 'Posts',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main-container{
    padding: 30px;
  }
</style>
