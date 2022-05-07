<template>
  <div
    class="response-button noselect"
  >
    Responder
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "ResponsePost",
  props: {
    user: Object,
  },

  emits: ["posted"],
  methods: {
    showResponseBox(event: any) {
      event.preventDefault();
      this.displayResponseBox = !this.displayResponseBox;
      this.responseText = "";
    },
    saveResponse(event: any){
        console.log("hola", this.responseText);
    }
  },
  setup(props: any, { emit }) {
    let displayResponseBox = ref(false);
    let responseText = ref("");
    return {
      displayResponseBox,
      responseText,
    };
  },
});
</script>
<style lang="stylus" scoped>
.cancel-button
  width fit-content
  padding: 6px 12px
  border-radius: 16px
  font-weight: bold
  color: white

.response-button
  width fit-content
  padding: 6px 12px
  border-radius: 16px
  font-weight: bold
  color: white
  background: linear-gradient(to left bottom,#08ae9e,#0aa,#00a6b5,#00a1bc,#009bc1,#0095c3,#008ec5,#1287c5,#217fc5,#3275c3,#446cbf,#5461b9)
  text-decoration: underline
  -webkit-background-clip: text
  -webkit-text-fill-color: transparent
  text-underline-offset: 20%

.reponse-text
  margin: 12px 0 0 0
  border-radius: 16px
  width: 100%
  padding: 16px 10px
  outline: none
</style>
