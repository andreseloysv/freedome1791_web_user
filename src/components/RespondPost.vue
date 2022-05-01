<template>
  <div
    class="response-button noselect"
    v-if="!displayResponseBox"
    @click.stop="showResponseBox($event)"
  >
    Responder
  </div>
  <div v-if="displayResponseBox">
    <textarea
      @click.stop=""
      class="reponse-text noselect"
      placeholder="escribe tu respuesta aqui"
      v-model="responseText"
    >
    </textarea>
    <div>{{ responseText.length }}/200 Letras</div>
    <div class="cancel-button noselect" @click.stop="showResponseBox($event)">
      Cancelar
    </div>
    <div class="response-button noselect" @click.stop="showResponseBox($event)">
      Responder
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
let displayResponseBox = ref(false);
let responseText = ref("");
export default defineComponent({
  name: "AddPost",
  props: {
    user: Object,
  },
  emits: ["posted"],
  methods: {
    showResponseBox(event: any) {
      event.preventDefault();
      displayResponseBox.value = !displayResponseBox.value;
      responseText.value = "";
    },
  },
  setup(props: any, { emit }) {
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
