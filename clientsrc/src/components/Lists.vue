<template>
  <div class="lists col-12 col-lg-3">
    <div class="card mt-3 mr-5 text-light box">
      <div class="card-body">
        <h5 class="card-title">{{listProp.title}}</h5>
      </div>
      <Tasks v-for="task in tasks" :key="task.id" :taskProp="task" />
    </div>
  </div>
</template>
<script>
import List from "../models/List";
import Tasks from "../components/Tasks";
export default {
  name: "lists",
  props: ["listProp"],
  computed: {
    tasks() {
      return this.$store.state.tasksStore.tasks[this.listProp.id] || [];
    }
  },
  methods: {
    getTasks() {
      this.$store.dispatch("getTasks", this.listProp.id);
    }
  },
  components: {
    Tasks
  },
  mounted() {
    this.getTasks();
  }
};
</script>
<style lang="scss" scoped>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  min-height: 80-vh;
  width: 300px;
  background-color: var(--secondary);
}
</style>