<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        <h1>Login</h1>
      </div>

      <div class="col-12">
        <LoginComponent />
      </div>
    </div>
  </div>
</template>

<script>
import LoginComponent from "@/components/Login";
export default {
  name: "Login",
  components: {
    LoginComponent
  }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
