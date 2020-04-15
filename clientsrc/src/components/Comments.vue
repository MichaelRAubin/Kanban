<template>
  <div class="comments">
    <span>
      <li>
        {{commentProp.title}}
        <i
          v-if="$auth.isAuthenticated && $auth.user.email == commentProp.creatorEmail"
          class="fa fa-trash text-warning mt-1 mr-3 ml-5 float-right pointer"
          style="font-size:16px;"
          @click="deleteComment(commentProp)"
        ></i>
      </li>
    </span>
  </div>
</template>
<script>
import { Comment } from "../models/Comment";
export default {
  name: "Comments",
  props: {
    commentProp: { type: Object, required: true }
  },
  methods: {
    async deleteComment(commentProp) {
      let yes = await this.$confirm("Delete the comment?");
      if (!yes) {
        return;
      } else {
      }
      this.$store.dispatch("deleteComment", this.commentProp);
    }
  }
};
</script>
<style lang="scss" scoped>
.pointer {
  cursor: pointer;
}
li {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
}
</style>