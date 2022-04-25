<template>
  <div class="container post">
    <div>
      <span class="author-name">{{ FeedItemContext.author.firstName }}</span> -
      <span class="author-name">{{ formatDate(FeedItemContext.dateIni) }}</span>
    </div>
    <div class="image-container">
      <!--<img :src="FeedItemContext.imageUrl" /> -->
      <div class="title">{{ FeedItemContext.title }}</div>
    </div>
    <div class="row">
      <div class="col-xs-1">
        <div class="logo-container">
          <!--
          <img
            width="40"
            class="logo"
            :src="FeedItemContext.imageUrl"
          />
          -->
        </div>
      </div>
      <div class="col-xs-10">
        <div class="description">
          {{ FeedItemContext.content }}
        </div>
        <!--
        <span class="domain">{{ FeedItemContext.domain }}</span>
        <div class="result-extra-details">
          <span class="viewsCount">{{
            FeedItemContext.viewsCount
          }}</span>
          <span class="howOld">{{ FeedItemContext.howOld }}</span>
        </div>
        -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { User } from "./Post";

export interface FeedItemContext {
  title: string;
  content: string;
  author: User;
  dateIni: string;
  //imageUrl: string;
  //domain: string;
  //viewsCount: string;
  //howOld: string;
}
defineProps<{
  FeedItemContext: FeedItemContext;
}>();
function formatDate(dateString: string) {
  const date = new Date(dateString);
  // Then specify how you want your dates to be formatted
  return new Intl.DateTimeFormat("default", { dateStyle: "long" }).format(date);
}
</script>

<style lang="stylus" scoped>
.container
  margin: 40px 0
  &.post
      border: solid 2px #4d4d4d;
      border-radius: 16px;
      padding: 32px;
      & .author-name
        font-weight: bold
.image-container
  position relative
  border-radius: 32px
  margin: 0 0 10px 0
  padding: 0
  overflow: hidden
  img
    width 100%
    border-radius: 32px
    overflow hidden
  & .title
    position: absolute
    color: #e8e8e8
    z-index 10
    width: 100%;
    padding: 10px 15px 15px 15px;
    bottom 0%
    left: 50%
    transform: translateY(0%) translateX(-50%);
    margin: 0
    font-size: 20px
    font-weight: bolder
    word-break: break-all
    overflow: hidden
    text-shadow: 0px 0px 3px #000;
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
    background: linear-gradient(0deg, #000000e6 60%, #5f5f5f4d 100%);
    border-radius: 0 0 16px 16px

.result-extra-details span
  margin: 0 15px 0 0

.logo-container
    top: 5px
    position: relative
    width: 25px
    height: 25px
    overflow: hidden
    border-radius: 50%
    .logo
      width: 100%
      height: auto

.domain
  font-weight: bold
</style>
