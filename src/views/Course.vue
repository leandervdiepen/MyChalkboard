<template>
  <div>{{ user }} - {{ courseID }}</div>
  Hi
</template>

<script>
export default {
  props: [
    "user",
    "courseID",
  ],
};
</script>

<style lang="scss" scoped>
</style>