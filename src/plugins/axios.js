import axios from "axios";
import Vue from "vue";
import Cookie from "@/service/cookie";


axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(function(config) {
  const token = Cookie.getToken(); 

  if (token) {
    config.headers.common["Authorization"] = token;
  }

  return config;
});

Vue.prototype.$axios = axios;
