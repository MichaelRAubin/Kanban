<template>
  <div class="Lists col-12 col-lg-3">
    <div class="card mt-4 mr-5 text-light box">
      <div class="card-body">
        <h5 class="card-title">{{list.title}}</h5>
        <i
          class="fa fa-trash text-danger mt-n4 float-right pointer"
          style="font-size:18px;"
          @click="deleteList"
        ></i>
        <hr class="m-0 pb-0" />
      </div>
      <Tasks v-for="task in tasks" :key="task.id" :taskProp="task" />
    </div>
  </div>
</template>
<script>
//import List from "../models/List";
import Tasks from "../components/Tasks";
export default {
  name: "Lists",
  props: { list: { type: Object, required: true } },
  computed: {
    tasks() {
      return this.$store.state.tasksStore.tasks[this.list.id] || [];
    }
  },
  methods: {
    async getTasks() {
      await this.$store.dispatch("getTasks", this.list.id);
    },

    async deleteList() {
      let yes = await this.$confirm("Delete the list?");
      if (!yes) {
        return;
      } else {
      }
      this.$store.dispatch("deleteList", this.list);
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
hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 1px;
}
.pointer {
  cursor: pointer;
}
</style>