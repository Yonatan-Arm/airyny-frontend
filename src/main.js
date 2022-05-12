import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueGoogleMaps from '@fawmi/vue-google-maps'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { Quasar , Dialog } from 'quasar'
import VCalendar from 'v-calendar';
import { SetupCalendar, Calendar, DatePicker } from 'v-calendar';
import { clickOutside } from './directives'
import HistogramSlider from "vue3-histogram-slider";
import "vue3-histogram-slider/dist/histogram-slider.css";



//style
import './style/styles.scss'




// Use plugin with defaults
const app = createApp(App)



app.use(VueGoogleMaps, {
    load: {
        key: 'AIzaSyDVaWRaXe4Fxq65Ws1-ZcA7fhz2ENG2L1g',

    }
})

app.directive('close', clickOutside)

app.use(store)
app.use(Quasar, {
    plugins: {
      Dialog
    }
  })
  
app.use(router)
app.use(ElementPlus)
app.component(HistogramSlider.name, HistogramSlider);

app.mount('#app')