<template>
    <div>
        <b-button @click="modalShow = !modalShow">Open Modal</b-button>

        <b-modal v-model="modalShow" @ok="handleOk">
            <label>Tytuł</label><input type="text" v-model="header" placeholder="Tytuł">
            <label>Treść</label><textarea type="text" v-model="content" placeholder="Treść"></textarea>
        </b-modal>
    </div>
</template>

<script>

    import 'bootstrap/dist/css/bootstrap.min.css';
    import { BootstrapVue } from 'bootstrap-vue'
    import firebase from "../database/firebase.js";
    import Vue from 'vue'

    Vue.use(BootstrapVue)

    export default {
        data() {
            return {
                header: null,
                content: null,
                modalShow: false,
            }
        },
        methods: {

            async putData() {
                const db = firebase.firestore();
                const date = await db.collection("posts")
                const body = {
                    header: this.header,
                    content: this.content
                }
                await date.add(body)
            },

            handleOk(bvModalEvt) {
                bvModalEvt.preventDefault()
                this.handleSubmit()
            },

            handleSubmit() {
                if(this.validateData()){
                    try{
                        this.putData()
                        window.alert("zrobilem")
                    }catch(error){
                        console.log(error)
                    }
                }else{
                    window.alert("dane niepoprawne")
                }
                this.modalShow = false
            },

            validateData() {
                if(this.header === null || this.content === null){
                    return false
                }else{
                    return  /^\s*[0-9a-zA-Z]/.test(this.header) 
                        
                }
            },
        }
    }
</script>