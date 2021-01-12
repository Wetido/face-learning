<template>
    <div>
        <div class="plus" @click="modalShow = !modalShow"></div>

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

<style scoped>

.plus{
    position: relative;
    width: 30px;
    height: 30px;
    margin-right: 30px;
}

.plus::before, 
.plus::after{
    content: "";
    position: absolute;
    background-color: white;
    transition: transform 0.25s ease-out;
}


.plus:before{
    top: 0;
    left: 50%;
    width: 4px;
    height: 100%;
    margin-left: -2px;
}

.plus:after{
    top: 50%;
    left: 0;
    width: 100%;
    height: 4px;
    margin-top: -2px;
}
    
.plus:hover{
    cursor: pointer;
}

.plus:hover::before{
    transform: rotate(180deg); 
}

.plus:hover::after{
    transform: rotate(360deg); 
}



</style>