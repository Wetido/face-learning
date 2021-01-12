<template>
  <div>
    <Posts msg="Welcome to Your Vue.js App"/>
    <AddPostModal></AddPostModal>
  </div>
</template>

<script>
import Posts from './components/Posts.vue'
import AddPostModal from "./components/AddPostModal"

export default {

  name: 'App',
  components: {
    Posts,
    AddPostModal
  }
}
</script>

<style>

</style>
