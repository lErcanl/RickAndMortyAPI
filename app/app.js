import Vue from "nativescript-vue";

import Home from "./components/Home";
import {err} from './error'

Vue.prototype.$err = err
new Vue({
    render: h => h('frame', [h(Home)]),
}).$start();
