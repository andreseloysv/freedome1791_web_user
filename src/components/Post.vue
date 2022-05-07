<template>
  <div class="container post" @click="openPost(postItemContext.id)">
    <div>
      <a :href="`/profile/${postItemContext.author.id}`">
        <span class="author-name">{{
          postItemContext.author.firstName
        }}</span></a
      >
      -
      <span class="author-name">{{ formatDate(postItemContext.dateIni) }}</span>
    </div>
    <div class="image-container">
      <div class="title">{{ postItemContext.title }}</div>
    </div>
    <div class="row">
      <div class="col-xs-1">
        <div class="logo-container"></div>
      </div>
      <div class="col-xs-10">
        <div class="description">
          {{ postItemContext.content }}
        </div>
      </div>
    </div>
    <add-post> </add-post>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import type { User } from "./Post";
import AddPost from "@/components/AddPost.vue";
interface PostItemContext {
  id: string;
  title: string;
  content: string;
  author: User;
  dateIni: string;
}
export default defineComponent({
  name: "Post",
  props: {
    user: Object,
    postItemContext: Object,
  },
  components: {
    AddPost,
  },
  emits: ["posted"],
  methods: {
    formatDate(dateString: string) {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat("default").format(date);
    },
    openPost(id: string) {
      window.location.href = `/post/${id}`;
    },
  },
  setup(props: any, { emit }) {
    let displayResponseBox = ref(false);
    let responseText = ref("");
    onMounted(() => {
      console.log("PostItemContext", props.postItemContext);
    });
    return {
      displayResponseBox,
      responseText,
    };
  },
});
</script>

<style lang="stylus" scoped>
.container {
  margin: 40px 0;

  &.post {
    cursor: pointer;
    border: solid 2px #4d4d4d;
    border-radius: 16px;
    padding: 32px;
    width: auto;

    & .author-name {
      font-weight: bold;
    }
  }
}

.image-container {
  position: relative;
  border-radius: 32px;
  margin: 0 0 10px 0;
  padding: 0;
  overflow: hidden;

  img {
    width: 100%;
    border-radius: 32px;
    overflow: hidden;
  }

  & .title {
    position: absolute;
    color: #e8e8e8;
    z-index: 10;
    width: 100%;
    padding: 10px 15px 15px 15px;
    bottom: 0%;
    left: 50%;
    transform: translateY(0%) translateX(-50%);
    margin: 0;
    font-size: 20px;
    font-weight: bolder;
    word-break: break-all;
    overflow: hidden;
    text-shadow: 0px 0px 3px #000;
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    background: linear-gradient(0deg, #000000e6 60%, #5f5f5f4d 100%);
    border-radius: 0 0 16px 16px;
  }
}

.result-extra-details span {
  margin: 0 15px 0 0;
}

.logo-container {
  top: 5px;
  position: relative;
  width: 25px;
  height: 25px;
  overflow: hidden;
  border-radius: 50%;

  .logo {
    width: 100%;
    height: auto;
  }
}

.domain {
  font-weight: bold;
}

@media only screen and (max-width: 768px) {
  .container {
    margin: 20px 0;

    &.post {
      border: solid 2px #4d4d4d;
      border-radius: 16px;
      padding: 8px 16px 8px 16px;
    }
  }
}
</style>
