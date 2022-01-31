<template>
  <div class="home">
      <Shooter/>
  </div>
</template>

<script>
import Shooter from "../components/Shooter.vue";

export default {
    name: "Home",
    components: {
        Shooter
    }
}
</script>

<style scoped>
.home {
  background-color: antiquewhite;
  width: 100%;
  height: 100vh;
}
</style>
