<template>
  <div>
    <transition mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
export default {};
</script>

<style>
.v-enter,
.v-leave-to {
  opacity: 0;
}

.v-enter-active,
.v-enter-leave {
  transition: all 0.3s;
}
</style>
