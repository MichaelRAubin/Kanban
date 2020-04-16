<template>
  <div
    class="lists col-12 col-lg-3"
    ref="droppable"
    droppable="true"
    @dragover.prevent
    @drop.capture="addTask"
    @dragenter="dragEnter"
    @dragleave="dragLeave"
  >
    <div class="card mt-4 mr-3 ml-3 text-light box">
      <div class="card-body">
        <h5 class="card-title">{{list.title}}</h5>
        <i
          v-if="$auth.isAuthenticated && $auth.user.email == list.creatorEmail"
          class="fa fa-trash text-danger mt-n4 float-right pointer"
          style="font-size:18px;"
          @click="deleteList"
        ></i>
        <hr class="m-0 pb-0 mb-3" />
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="createTask">
              <label for="name" class="ml-3 mr-2"></label>
              <input type="text" class="mr-2" placeholder="Task Title..." v-model="editable.title" />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
      <Tasks v-for="task in tasks" :key="task.id" :taskProp="task" />
    </div>
  </div>
</template>
<script>
import { List } from "../models/List";
import { Task } from "../models/Task";
import { Board } from "../models/Board";
import Tasks from "../components/Tasks.vue";
export default {
  name: "Lists",
  props: {
    list: { type: Object, required: true }
  },
  components: {
    Tasks
  },
  data() {
    return {
      editable: new Task()
    };
  },
  computed: {
    tasks() {
      return this.$store.getters.renderTasks[this.list.id] || [];
    }
  },
  methods: {
    async deleteList() {
      let yes = await this.$confirm("Delete the list?");
      if (!yes) {
        return;
      } else {
      }
      this.$store.dispatch("deleteList", this.list);
    },
    createTask() {
      this.$store.dispatch("createTask", {
        title: this.editable.title,
        listId: this.list.id,
        boardId: this.$route.params.boardId
      });
      this.editable.title = "";
    },
    addTask() {
      this.$refs.droppable.classList.remove("droppable");
      let task = JSON.parse(event.dataTransfer.getData("data"));
      let from = event.dataTransfer.getData("from");
      if (from == this.list.id) {
        return;
      }
      this.$store.dispatch("moveTask", { task, to: this.list.id });
    },
    dragEnter() {
      this.$refs.droppable.classList.add("droppable");
    },
    dragLeave() {
      this.$refs.droppable.classList.remove("droppable");
    }
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
  width: 320px;
  background-color: var(--secondary);
}
hr {
  display: block;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  margin-left: auto;
  margin-right: auto;
  border-style: inset;
  border-width: 2px;
}
.pointer {
  cursor: pointer;
}
</style>