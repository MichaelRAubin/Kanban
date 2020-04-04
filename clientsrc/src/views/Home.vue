<template>
  <div class="home img-fluid mx-auto container-fluid">
    <div class="row">
      <div class="col-12 bg-secondary col-lg-9">
        <div class="row">
          <h2 class="ml-3 mt-2 font-italic text-primary">Welcome to KanBan-IT</h2>
        </div>
        <div class="row">
          <i
            class="ml-5 mt-2 fa fa-check-square-o text-primary"
            style="font-size:36px;"
            aria-hidden="true"
          ></i>
          <h3 class="ml-5 mt-2 text-warning">Document</h3>
        </div>
        <div class="row">
          <i
            class="ml-5 mt-3 fa fa-check-square-o text-primary"
            style="font-size:36px;"
            aria-hidden="true"
          ></i>
          <h3 class="ml-5 mt-3 text-warning">Organize</h3>
        </div>
        <div class="row">
          <i
            class="ml-5 mt-3 fa fa-check-square-o text-primary"
            style="font-size:36px;"
            aria-hidden="true"
          ></i>
          <h3 class="ml-5 mt-3 mb-3 text-warning">Manage</h3>
        </div>
      </div>
      <div class="col-12 bg-secondary col-lg-3">
        <div class="row ml-5 mt-5 font-italic text-primary">
          <h2>Get Started Today!</h2>
        </div>
        <div class="row">
          <h5 class="text-warning ml-3 text-cnter">Select the LOGIN button to get started!</h5>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  computed: {}
};
</script>
<style lang="scss" scoped>
.home {
  background-image: url("/Kanban.jpg");
  height: 92.3vh;
  width: 100vw;
  opacity: 1;
}
bg-dark {
  background-color: black;
}
</style>
