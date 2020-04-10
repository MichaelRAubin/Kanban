<template>
  <div class="lists col-12 col-lg-3 boxes">
    <div class="card mt-3 box">
      <div class="card-body">
        <h5 class="card-title">{{listProp.title}}</h5>
      </div>
    </div>
  </div>
</template>
<script>
import List from "../models/List";
export default {
  name: "Lists",
  props: ["listProp"],
  computed: {}
};
</script>
<style lang="scss" scoped>
.boxes {
  max-width: 100vw;
  overflow-x: auto;
}
.box {
  min-height: 80-vh;
  width: 400px;
  background-color: var(--info);
}
</style>