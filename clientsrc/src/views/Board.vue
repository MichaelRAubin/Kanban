<template>
  <div class="board">
    <h1>{{board.name}}</h1>
    <div class="boxes d-flex">
      <div class="m-1" v-for="n in 4" :key="n">
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