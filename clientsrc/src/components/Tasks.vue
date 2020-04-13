<template>
  <div class="tasks">
    <div class="border rounded mt-2 text-dark bg-white">
      <div>
        <p class="title">{{taskProp.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Task } from "../models/Task";
export default {
  name: "tasks",
  props: ["taskProp"],
  computed: {}
};
</script>
<style lang="scss" scoped>
</style>