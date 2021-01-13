import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import firebase from './database/firebase'
Vue.config.productionTip = false

let app;


firebase.auth().onAuthStateChanged(() => {
  if(!app){
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount("#app");
  }
});