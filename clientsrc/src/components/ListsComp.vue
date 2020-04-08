<template>
  <div class="listsComp d-flex">
    <div v-for="list in lists" :key="list.id" class="lists">
      <div>{{list.name}}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: "ListsComp",
  data() {
    return {
      auto: null
    };
  },
  props: {
    list: { tyep: Object, required: true }
  },
  computed: {
    lists() {
      return this.$store.state.listsStore.lists;
    }
  }
  // props: {
  //   list: { type: Object, required: true }
  // }
};
</script>
<style lang="scss" scoped>
</style>