import { createApp } from "vue"

import App from "./App.vue";
import store from "./store";
import router from "./routes";
import * as filters from "./filters";

import "./styles.css";

const app = createApp(App);

app.use(router).use(store).mount("#app");

app.config.globalProperties.$filters = filters;
