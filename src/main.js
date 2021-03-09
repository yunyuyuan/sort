import { createApp } from 'vue'
import App from '@/views/index'
import {registerIconSvgComponent} from "@/icons";
import {registerRouter} from "@/route";
import store from '@/store'

export const app = createApp(App);

registerIconSvgComponent(app);
registerRouter(app);
app.use(store)

app.mount('#app');