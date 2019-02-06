import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Vuetify from 'vuetify';
import VueSocketIO from 'vue-socket.io'
import 'vuetify/dist/vuetify.min.css';
import Chat from 'vue-beautiful-chat';
import Notifications from 'vue-notification';
import 'filepond/dist/filepond.min.css';

Vue.use(Chat);
Vue.use(Notifications);
Vue.use(Vuetify);
Vue.use(new VueSocketIO({
    debug: true,
    connection: 'http://localhost:3000',

}));
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    data: () => ({
        icons: [
            'fab fa-github'
        ]
    }),
    render: h => h(App)
}).$mount('#app');
