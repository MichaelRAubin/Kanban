<template>
  <div class="board">
    <h4>Name: {{board.name}}</h4>
    <h5>Description: {{board.description}}</h5>
    <!--TODO add delete button here -->
    <hr class="m-0 pb-0" />
    <div class="boxes d-flex">
      <div class="m-1 mt-3" v-for="n in 4" :key="n">
        <div class="box">box-{{n}}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Board",
  mounted() {
    this.$store.dispatch("getBoard", this.$route.params.boardId);
  },
  computed: {
    board() {
      return this.$store.state.boardsStore.board;
    }
  }
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