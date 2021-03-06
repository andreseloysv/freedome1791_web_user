<template>
  <div class="greetings">
    <h2>Post</h2>
    <div v-if="result" class="searchResult">
      <Post :postItemContext="result.post" />
    </div>
    <div></div>
    <div class="footer-spacer"></div>
  </div>
</template>
<script lang="ts">
import Post from "@/components/Post.vue";
import { ref, defineComponent, onMounted } from "vue";
import gql from "graphql-tag";
import { useQuery } from "@vue/apollo-composable";
import { useRoute } from "vue-router";
import { useMeta } from "vue-meta";

const GET_POST_QUERY = gql`
  query Post($postId: ID!) {
    post(id: $postId) {
      content
      author {
        id
        firstName
      }
      dateIni
    }
  }
`;

export default defineComponent({
  name: "PostPage",
  props: ["msg"],
  components: {
    Post,
  },
  setup(props: any) {
    const route = useRoute();
    let postId = ref<number>(1);
    const enabledGetPostQuery = ref(false);
    const getPostQueryvariables = ref({
      postId: postId,
    });
    const { result, loading, error, refetch, onResult } = useQuery(
      GET_POST_QUERY,
      getPostQueryvariables,
      () => ({
        enabled: enabledGetPostQuery.value,
      })
    );

    const FOLLOW_USER = gql`
      mutation Mutation($createPostInput: CreatePostInput) {
        createPost(followUserInput: $createPostInput) {
          title
          content
        }
      }
    `;
    onMounted(() => {
      postId.value = +route.params.id;
      enabledGetPostQuery.value = true;
    });
    onResult((queryResult) => {
      if (queryResult.data) {
        meta.og = {
          title: `${queryResult.data.post.author.firstName} ${queryResult.data.post.author.secondName} en FOS1791`,
          description: queryResult.data.post.content,
        };
      }
    });
    const { meta } = useMeta({});
    return {
      result,
      postId,
    };
  },
});
</script>

<style lang="stylus" scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.search-form
  margin 0
  text-align: center

.search-input
  border-radius: 8px
  border: 3px #6c6c6c solid
  height 52px
  width 100%
  font-size: 16px
  padding: 0 14px

.search-button
  border-radius: 8px
  -webkit-appearance: none
  -webkit-border-radius: 8px
  height 32px
  width 70px
  padding: 0 14px
  background: blue
  color: white
  margin-left: 8px
  border: none
  font-weight: bold

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #2196F3;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196F3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(26px);
  -ms-transform: translateX(26px);
  transform: translateX(26px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.footer-spacer
  height: 1px
  background: red
  margin: 80px 0

.button-bar
  position: fixed
  bottom: 0
  background: white
  padding: 10px 0 0 0
  z-index 10
  width 100%
</style>
