<template>
  <div class="tasks border rounded mt-2 bg-white">
    <p class="description">{{taskProp.title}}</p>
  </div>
</template>
<script>
export default {
  name: "tasks",
  props: { task: { type: Object, required: true } },
  computed: {
    tasks() {
      return this.$store.state.tasksStore.tasks;
    }
  }
};
</script>
<style lang="scss" scoped>
</style>