<template
  ><div class="container">
    <h1>Register</h1>

    <RegisterComponent />
  </div>
</template>

<script>
import RegisterComponent from "@/components/Register";
export default {
  name: "Register",
  components: { RegisterComponent }
};
</script>

<style scoped>
.container {
  margin-top: 80px;
}
</style>
