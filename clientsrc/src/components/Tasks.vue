<template>
  <div class="tasks">
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
            <form @submit.prevent="createComment(commentProp)">
              <label for="name" class="ml-3 mr-2"></label>
              <input
                type="text"
                class="mr-2 mb-2"
                placeholder="Comment..."
                v-model="editable.title"
              />
              <button type="submit">Add</button>
            </form>
          </div>
        </div>
      </div>
      <Comments v-for="comment in comments" :key="comment.id" :commentProp="comment" />
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
      return this.$store.state.commentsStore.comments;
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
    async createComment(commentProp) {
      await this.$store.dispatch("createComment", {
        title: this.editable.title,
        listId: this.list.id,
        taskId: this.task.id,
        boardId: this.$route.params.boardId
      });
      debugger;
      this.editable.title = "";
    }
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