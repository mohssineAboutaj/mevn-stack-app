import "@babel/polyfill";
import "mutationobserver-shim";
import Vue from "vue";
import "./plugins/axios";
import "./plugins/bootstrap-vue";
import App from "./App.vue";
import "./registerServiceWorker";
import store from "./store";

// fontawesome icons
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
// import some icon
import {
	faUserSecret,
	faPlus,
	faTrash,
	faEdit,
	faBars
} from "@fortawesome/free-solid-svg-icons";

// define icons to use
library.add(faUserSecret, faPlus, faTrash, faEdit, faBars);
// use FontAwesomeIcon as component
Vue.component("fa-icon", FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
	store,
	render: h => h(App)
}).$mount("#app");
