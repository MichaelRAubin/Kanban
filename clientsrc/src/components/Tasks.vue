<template>
  <div
    class="tasks"
    ref="draggable"
    draggable="true"
    @dragstart.capture="moving"
    @dragend="dragEnd"
    @dragover.prevent
  >
    <div class="border shadow rounded mt-2 mb-2 mx-auto text-dark task-box">
      <div>
        <h6 class="title mt-2 ml-3">{{taskProp.title}}</h6>
        <i
          v-if="$auth.isAuthenticated && $auth.user.email == taskProp.creatorEmail"
          class="fa fa-trash text-danger mt-n4 mr-3 float-right pointer"
          style="font-size:18px;"
          @click="deleteTask(taskProp)"
        ></i>
        <hr class="m-0 pb-0 mb-2" />
        <div class="row">
          <div class="col-12">
            <form @submit.prevent="createComment(taskProp)">
              <label for="name" class="ml-2 mt-2 mr-2"></label>
              <input
                type="text"
                class="mr-2 mb-2"
                placeholder="Comment..."
                v-model="editable.title"
              />
              <button type="submit">Add</button>
            </form>
            <div class="row">
              <ul>
                <Comments v-for="comment in comments" :key="comment.id" :commentProp="comment" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Task } from "../models/Task";
import { Comment } from "../models/Comment";
import Comments from "../components/Comments.vue";
export default {
  name: "Tasks",
  props: { taskProp: { type: Object, required: true } },
  computed: {
    comments() {
      return this.$store.getters.renderComments[this.taskProp.id] || [];
    }
  },
  components: {
    Comments
  },
  data() {
    return {
      editable: new Comment()
    };
  },
  methods: {
    async deleteTask(taskProp) {
      let yes = await this.$confirm("Delete the task?");
      if (!yes) {
        return;
      } else {
      }
      this.$store.dispatch("deleteTask", this.taskProp);
    },
    async createComment(taskProp) {
      await this.$store.dispatch("createComment", {
        title: this.editable.title,
        listId: this.taskProp.listId,
        taskId: this.taskProp.id,
        boardId: this.$route.params.boardId
      });
      this.editable.title = "";
    },
    moving(event) {
      let from = this.taskProp.listId;
      event.dataTransfer.setData("data", JSON.stringify(this.taskProp));
      event.dataTransfer.setData("from", from);
      this.$refs.draggable.classList.add("dragging");
      event.dataTransfer.setDragImage(this.$refs.draggable, 20, 20);
    },
    dragEnd() {
      // reverts style when dropping into the same zone
      try {
        this.$refs.draggable.classList.remove("dragging");
      } catch (e) {}
    },
    dragging() {
      console.log("we are dragging the task", this.taskProp);
    }
  },
  mounted() {
    this.$store.dispatch("getComments", this.$route.params.boardId);
  }
};
</script>
<style lang="scss" scoped>
.task-box {
  min-height: 80-vh;
  width: 300px;
  background-color: #ffe4b5;
}
.pointer {
  cursor: pointer;
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
</style>