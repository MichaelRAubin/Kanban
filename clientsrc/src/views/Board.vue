<template>
  <div class="board container-fluid">
    <div>
      <div class="col-8">
        <h4>Name: {{board.name}}</h4>
        <h5>Description: {{board.description}}</h5>
      </div>
      <div class="form-group">
        <form @submit.prevent="createList()">
          <div class="mb-3">
            <label for="name">List Name:</label>
            <span>
              <input
                class="form-control mb-2"
                type="text"
                placeholder="List Name..."
                v-model="editable.name"
              />
              <button class="btn btn btn-success" type="submit">Create List</button>
            </span>
          </div>
          <div class="my-3"></div>
        </form>
      </div>
    </div>
    <hr class="m-0 pb-0" />
    <ListsComp :list="list" />
  </div>
</template>
<script>
import { List } from "../models/List";
import ListsComp from "../components/ListsComp";
export default {
  name: "Board",
  components: {
    ListsComp
  },
  data() {
    return {
      editable: new List()
    };
  },
  methods: {
    createList() {
      debugger;
      $auth.user.email = board.creatorEmail;
      this.editable.board = this.$route.params.boardId;
      this.$store.dispatch("createList", this.editable);
      this.editable = new List();
    }
  },
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.board;
    },
    list() {
      return this.$store.state.listsStore.lists;
    }
  },
  methods: {}
};
</script>
<style>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  min-height: 80-vh;
  width: 200px;
  background-color: var(--info);
}
</style>