<template>
  <div class="board container-fluid">
    <div class="row">
      <div class="col-12 mt-2">
        <h4>Name: {{board.name}}</h4>
        <h5>Description: {{board.description}}</h5>
      </div>
      <div class="row">
        <div class="col-12 mt-2 mb-2">
          <form @submit.prevent="createList">
            <label for="name" class="ml-3 mt-2 mr-2">List Name:</label>
            <input type="text" class="mr-2" placeholder="List Name..." v-model="editable.title" />
            <button class="ml-3" type="submit">Create List</button>
          </form>
        </div>
      </div>
    </div>
    <hr class="m-0 pb-0" />
    <div class="row boxes">
      <Lists v-for="list in lists" :key="list.id" :list="list" />
    </div>
  </div>
</template>
<script>
import { List } from "../models/List";
import Lists from "../components/Lists.vue";
export default {
  name: "Board",
  props: ["boardId"],
  components: {
    Lists
  },
  data() {
    return {
      editable: new List()
    };
  },
  methods: {
    createList() {
      this.$store.dispatch("createList", {
        title: this.editable.title,
        boardId: this.$route.params.boardId
      });
      this.editable.title = "";
    }
  },
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
    this.$store.dispatch("getLists", this.$route.params.boardId);
    this.$store.dispatch("getTasks", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.board;
    },
    lists() {
      return this.$store.state.listsStore.lists;
    }
  }
};
</script>
<style>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
</style>