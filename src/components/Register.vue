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
      ref="registerForm"
      tag="form"
      @submit.stop.prevent="register()"
      class="text-left"
    >
      <div class="form-group">
        <label for="exampleInputName1">Nome:</label>

        <ValidationProvider v-slot="{ errors }" rules="required" name="nome">
          <input
            type="name"
            class="form-control"
            id="exampleInputName1"
            aria-describedby="emailHelp"
            placeholder="Nome"
            v-model="name"
          />
          <div v-if="!!errors[0]" class="text-danger text-sm mt-2">
            {{ errors[0] }}
          </div>
        </ValidationProvider>
      </div>

      <div class="form-group">
        <label for="exampleInputEmail1">Email:</label>

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
            placeholder="Email"
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
        Register
      </button>
    </ValidationObserver>
  </div>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "Register",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
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
    async register() {
      //se tiver erro de validação, validator vira false
      const validator = await this.$refs.registerForm.validate();
      if (!validator) {
        return;
      }

      this.resetResponse();

      this.spinner.login = true;

      const payload = {
        name: this.name,
        email: this.email,
        password: this.password
      };

      this.$axios
        .post("/users/create", payload)
        .then((response) => {  
          this.response.color = "success";
          this.response.message =
            "Seu cadastro foi feito com sucesso. Seja bem vindo(a)";

          this.resetForm();
        })
        .catch((e) => {
          this.spinner.login = false;

          const errorCode = e?.response?.data?.error || "ServerError";
          this.response.color = "danger";
          // this.response.message = message[errorCode];

          console.log(e);
        })
        .finally(() => {
          this.spinner.login = false;
        });
    },

    resetResponse() {
      this.response.color = "";
      this.response.message = "";
    },

    resetForm() {
      this.$refs.registerForm.reset();
      this.name = "";
      this.email = "";
      this.password = "";
    }
  }
};
</script>

<style></style>
