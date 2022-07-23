<template>
  <div class="mt-6">
    <div
      v-if="response.message"
      :class="`border rounded bg-${response.color} p-4 mb-4`"
    >
      <h4 :class="`text-sm text-white`">
        {{ response.message }}
      </h4>
    </div>

    <ValidationObserver
      ref="loginForm"
      tag="form"
      @submit.stop.prevent="login()"
      class="text-left"
    >
      <div class="form-group">
        <label for="exampleInputEmail1">Email address</label>

        <ValidationProvider
          v-slot="{ errors }"
          rules="required|email"
          name="email"
        >
          <input
            type="email"
            class="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            v-model="email"
          />
          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <ValidationProvider
          v-slot="{ errors }"
          rules="required"
          name="password"
        >
          <input
            type="password"
            class="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            v-model="password"
          />
          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>

      <button type="submit" class="btn btn-primary" :disabled="spinner.login">
        <img
          v-if="spinner.login"
          src="@/assets/img/spinner.svg"
          alt=""
          width="20"
          height="20"
          class="d-inline-block"
        />
        Login
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
import Cookie from "@/service/cookie";
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "Login",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      email: "ana@gmail.com",
      password: "password",
      response: {
        color: "",
        message: ""
      },
      spinner: {
        login: false
      }
    };
  },
  methods: {
    async login() {
      //se tiver erro de validação, validator vira false
      const validator = await this.$refs.loginForm.validate();
      if (!validator) {
        return;
      }

      this.resetResponse();

      this.spinner.login = true;

      const payload = {
        email: this.email,
        password: this.password,
        device_name: "my_pc"
      };
      this.$axios
        .post("/auth/login", payload)
        .then((response) => {
            console.log('login: ', response.data.data)
            console.log('token: ', response.data.token)
          const token = `Bearer  ${response.data.token}`;

          Cookie.setToken(token);

          
          this.$store.commit("user/STORE_USER", response.data.data);        
          this.$store.commit("user/STORE_USER_LOGGED",true);        

          this.$router.push({ name: "todos" });
        })
        .catch((e) => {
          this.spinner.login = false;
          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "danger";
        })
        .finally(() => {
          this.spinner.login = false;
        });
    },
    resetResponse() {
      this.response.color = "";
      this.response.message = "";
    }
  }
};
</script>

<style></style>
