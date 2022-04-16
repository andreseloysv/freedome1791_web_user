<template>
  <div class="greetings">
    <form action="." class="search-form" role="search">
      <input
        ref="searchInput"
        type="search"
        class="search-input"
        value=""
        placeholder="escribe aqui"
        aria-label="Search"
      />
    </form>
    <div class="searchResult">
      <SearchResultItem
        v-for="(context, index) in searchResultItemContextList"
        :searchResultItemContext="context"
        v-bind:key="index"
      />
    </div>
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
  </div>
</template>

<script setup lang="ts">
import SearchResultItem from "@/components/SearchResultItem.vue";
import { ref, onMounted, nextTick } from "vue";

const searchInput = ref();

onMounted(() => {});

defineProps<{
  msg: string;
}>();

const searchResultItemContextList: SearchResultItemContext[] = [
  {
    title: "Anarcocapitalismo - Wikipedia, la enciclopedia libre",
    description:
      "El anarcocapitalismo se opone a toda coacción, por lo cual, defiende la libre posesión de armas. ... ​ Aunque la propiedad privada permite que sus legítimos",
    imageUrl: "/img/trump.jpeg",
    domain: "https://es.wikipedia.org",
    viewsCount: "7 Millions",
    howOld: "1 Year",
  },
  {
    title: "Anarcocapitalismo - Qué es, definición y concepto",
    description:
      "El anarcocapitalismo es una corriente que propone la eliminación del estado como agente económico, la supresión total de los impuestos",
    imageUrl: "/img/axel_kaiser.jpeg",
    domain: "https://economipedia.com",
    viewsCount: "2 Millions",
    howOld: "2 Months",
  },
  {
    title: "Anarcocapitalismo - Economia - InfoEscola",
    description:
      "Bandeira do anarcocapitalismo: o amarelo representa o capitalismo, e o preto a anarquia. Há ainda o Anarcocapitalismo Utilitarista, desenvolvido pelo economista",
    imageUrl: "/img/milei.jpeg",
    domain: "https://www.infoescola.com",
    viewsCount: "1 Millions",
    howOld: "2 Years",
  },
];
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
