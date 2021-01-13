<template>
    <div>
        <Posts></Posts>
        <AddPostModal></AddPostModal>

    </div>
</template>

<script>
import Posts from '../components/Posts.vue'
import AddPostModal from '../components/AddPostModal'
    import firebase from "../database/firebase"

export default {

    data() {
        return {
            email: ""
        };
    },
    name: 'App',
    components: {
        Posts,
        AddPostModal
    },

    onMounted(){
        this.getUserEmail();
    },

    methods: {
        getUserEmail() {
            this.email = firebase.auth().currentUser.email
        }
    },
}
</script>

<style>

</style>
