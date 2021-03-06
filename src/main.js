// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import locale from 'element-ui/lib/locale/lang/en'
// fade/zoom 等
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
import axios from 'axios'
import VueAxios from 'vue-axios'
import Base from './api/global_variable'

Vue.prototype.Base=Base;
Vue.use(VueAxios,axios);

Vue.component(CollapseTransition.name, CollapseTransition)

Vue.config.productionTip = false

Vue.use(ElementUI, { locale });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
