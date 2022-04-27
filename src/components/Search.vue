<template>
  <div class="greetings">
    <!--<form action="." class="search-form" role="search">
      <input
        ref="searchInput"
        type="search"
        class="search-input"
        value=""
        placeholder="escribe aqui"
        aria-label="Search"
      />
    </form>-->
    <span>{{ user ? `Bienvenido ${user.firstName}` : "" }}</span>
    <input
      v-if="user && !!user.id"
      ref="postInput"
      type="text"
      class="post-input"
      placeholder="Postea algo"
      aria-label="Post"
      v-model="post"
    />
    <input
      type="button"
      class="create-post"
      id="new-post"
      value="Enviar"
      @click="newPostEvent"
    />
    <div class="emotions-container">
      <div class="emotion-container">
        <div class="emotion-option">🔥</div>
      </div>
      <div class="emotion-container">
        <div class="emotion-option">❤️</div>
      </div>
      <div class="emotion-container">
        <div class="emotion-option">💡</div>
      </div>
      <div class="emotion-container">
        <div class="emotion-option">🤮</div>
      </div>
    </div>
    <div v-if="result" class="searchResult">
      <FeedItem
        v-for="(context, index) in result.openFeed"
        :FeedItemContext="context"
        v-bind:key="index"
      />
    </div>
    <div></div>
    <div class="footer-spacer"></div>
    <div class="row button-bar">
      <div class="col-xs-3">
        <span>Incongnito</span>
        <label class="switch">
          <input type="checkbox" />
          <span class="slider round"></span>
        </label>
      </div>
      <div class="col-xs-9">
        <input
          type="button"
          class="delete-input"
          value="Delete history"
          aria-label="Delete"
        />
        <div>UUID: 123AS123123AED89103</div>
      </div>
    </div>
    <div
      id="g_id_onload"
      data-client_id="105692513096-5g604vtaln16ejvkfgq9mdphqp3nqpl2.apps.googleusercontent.com"
      data-login_uri="https://fos1791.herokuapp.com/your_login_endpoint"
      data-auto_prompt="false"
    ></div>
    <div
      class="g_id_signin"
      data-type="standard"
      data-size="large"
      data-theme="outline"
      data-text="sign_in_with"
      data-shape="rectangular"
      data-logo_alignment="left"
    ></div>
  </div>
</template>
<script lang="ts">
import FeedItem from "@/components/FeedItem.vue";
import Post from "@/components/SearchResultItem.vue";
import { ref, defineComponent } from "vue";
import gql from "graphql-tag";
import { useMutation, useQuery, useResult } from "@vue/apollo-composable";

const CHARACTERS_QUERY = gql`
  query Query {
    openFeed {
      content
      dateIni
      author {
        firstName
      }
      topic {
        name
      }
    }
  }
`;
const LOGIN_QUERY = gql`
  query GoogleLogin($token: String) {
    googleLogin(token: $token) {
      id
      firstName
    }
  }
`;
export default defineComponent({
  name: "Search",
  props: ["msg"],
  components: {
    FeedItem,
    Post,
  },
  setup(props: any) {
    const searchInput = ref();
    let post = ref("");
    let credential = ref("");
    let user: any = ref({});
    const { result, loading, error, refetch } = useQuery(CHARACTERS_QUERY);

    const feed = useResult(result);
    const CREATE_POST = gql`
      mutation Mutation($createPostInput: CreatePostInput) {
        createPost(createPostInput: $createPostInput) {
          title
          content
        }
      }
    `;

    const { mutate: createPost } = useMutation<
      { createPost: any },
      { createPostInput: any }
    >(CREATE_POST, () => ({
      variables: {
        createPostInput: {
          title: "",
          content: post.value,
          userId: user.value.id,
        },
      },
    }));

    async function newPostEvent() {
      console.log("new Post text: ", post.value);
      createPost();
      console.log("before: useQuery(CHARACTERS_QUERY)");
      refetch();
    }
    const {
      result: loginResult,
      refetch: loginRefetch,
      onResult,
    } = useQuery(
      LOGIN_QUERY,
      () => ({
        token: credential.value,
      }),
      () => ({
        enabled: !!credential.value,
      })
    );

    onResult((queryResult) => {
      if (queryResult.data) {
        user.value = queryResult.data.googleLogin;
      }
    });

    function handleCredentialResponse(response: any) {
      console.log("Encoded JWT ID token: " + response.credential);
      credential.value = response.credential;
      loginRefetch();
      //user.value = loginResult;
      console.log("user: ", user);
    }
    window.onload = () => {
      google.accounts.id.initialize({
        client_id:
          "105692513096-5g604vtaln16ejvkfgq9mdphqp3nqpl2.apps.googleusercontent.com",
        callback: handleCredentialResponse,
      });
      google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" } // customization attributes
      );
      google.accounts.id.prompt(); // also display the One Tap dialog
    };

    return {
      result,
      post,
      user,
      handleCredentialResponse,
      newPostEvent,
      refetch,
    };
  },
});
interface SearchResultItemContext {
  title: string;
  description: string;
  imageUrl: string;
  domain: string;
  viewsCount: string;
  howOld: string;
}
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

.post-input
  border-radius: 8px
  border: 3px #6c6c6c solid
  height 52px
  width 100%
  font-size: 16px
  padding: 0 14px

.create-post
  color: white;
  font-weight: bold;
  font-size: 16px;
  box-shadow: 0 0 10px 0 #0097f078;
  border: 1px solid #8f8f8f;
  border-radius: 16px;
  padding: 16px 32px;
  float: right;
  margin: 20px 0 0 0;
  cursor: pointer;
  background: linear-gradient(to left bottom,#08ae9e,#0aa,#00a6b5,#00a1bc,#009bc1,#0095c3,#008ec5,#1287c5,#217fc5,#3275c3,#446cbf,#5461b9);

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

.emotions-container
  display: flex
  & .emotion-container
      border: solid 1px black;
      width: 75px;
      height: 75px;
      border-radius: 50%;
      margin: 20px 20px 0px 0;
      box-shadow: 0 0 10px 0px #3d3d3d85;
      & .emotion-option
          font-size: 30px;
          text-align: center;
          top: 50%;
          transform: translateY(-50%);

@media only screen and (max-width: 768px)
  .emotions-container
    & .emotion-container
        width: 40px;
        height: 40px;
        margin: 25px 4px;
      & .emotion-option
          font-size: 20px;
</style>
