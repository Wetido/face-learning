<template>
    <div>
        <div class="navbar">
            <img class="navbar_logo" src="../assets/logo_on_start.png">
                <AddPostModal></AddPostModal>
        </div>

    </div>
</template>

<script>

    import AddPostModal from "./AddPostModal"

    export default {

        components: {
            AddPostModal
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
</style>