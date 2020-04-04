<template>
  <div>
    <!--FIXME extract to a BoardEditorComponent -->
    <form @submit.prevent="createBoard">
      <div class="mb-3">
        <label for="name">Name:</label>
        <input class="form-control" type="text" v-model="editable.name" />
      </div>
      <div class="mb-3">
        <label for="name">Description:</label>
        <input class="form-control" type="text" v-model="editable.description" />
      </div>
      <div class="my-3">
        <button class="btn btn btn-success btn-block">Create Board</button>
      </div>
    </form>
    <!--FIXME Create a BoardCardComponent -->
    <div class="boards">
      <div class="card p-2 my-2 elevation-4" v-for="board in boards" :key="board.id">
        <router-link :to="{name: 'Board', params: {boardId: board.id}}">{{board.name}}</router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { Board } from "../models/Board";
export default {
  name: "Boards",
  computed: {
    profile() {
      return this.$store.state.profile;
    },
    boards() {
      return this.$store.dispatch("createBoard", this.editable);
      this.editable = new Board();
    }
  }
};
</script>
<style lang="scss" scoped>
</style>