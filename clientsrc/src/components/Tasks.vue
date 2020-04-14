<template>
  <div class="tasks">
    <div class="border rounded mt-2 mb-2 mx-auto text-dark task-box">
      <div>
        <p class="title">{{taskProp.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { Task } from "../models/Task";
export default {
  name: "Tasks",
  props: ["taskProp"],
  computed: {}
};
</script>
<style lang="scss" scoped>
.task-box {
  min-height: 80-vh;
  width: 300px;
  background-color: var(--yellow);
}
</style>