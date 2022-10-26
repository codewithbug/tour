import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'



/*      Bootstrap      */
import "bootstrap/dist/css/bootstrap.min.css";

/*      vuex      */
import store from './store'


/*      Font-Awesome      */

import { library } from '@fortawesome/fontawesome-svg-core'

import { faBars , faMapMarkerAlt , faWifi , faPhone , faGlobe , faEnvelope , faExpand , faTimesCircle , faArrowUpFromBracket ,  faUserCircle , faTimes ,
  
  faSearch , faCheckCircle , faLongArrowAltRight , faSortUp , faHashtag

} from '@fortawesome/free-solid-svg-icons'

import { faClock , faCalendarAlt } from '@fortawesome/free-regular-svg-icons'

import { faFacebook , faInstagram , faYoutube , faWhatsapp  } from '@fortawesome/free-brands-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add( faBars , faClock , faCalendarAlt , faMapMarkerAlt ,faWifi , faPhone , faGlobe , faEnvelope , faFacebook ,

   faInstagram , faYoutube , faWhatsapp ,faExpand , faTimesCircle ,  faUserCircle , faTimes , faSearch , faCheckCircle , 
   
   faArrowUpFromBracket , faLongArrowAltRight , faSortUp , faHashtag
   
  )

Vue.component('font-awesome-icon', FontAwesomeIcon)

/*      Font-Awesome      */




/*      Infinite Loading      */

import InfiniteLoading from 'vue-infinite-loading';


Vue.use(InfiniteLoading, { slots:{ 

  noMore : "",
  noResults : ""

}});


/*      Infinite Loading      */







/*      Vuelidate      */
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)
/*      Vuelidate      */




Vue.config.productionTip = true


new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app' , true)


