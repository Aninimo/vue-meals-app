<template>
  <main class="p-8 max-w-[1200px] mx-auto">
    <input
      type="text"
      v-model="keyword"
      class="rounded border-2 bg-white border-gray-200 focus:ring-orange-500 focus:border-orange-500 w-full p-2"
      placeholder="Search for Meals"
      @change="searchMeals"
    />
    <div class="flex flex-wrap justify-center gap-3 px-8 mb-6 mt-8">
      <div
        v-for="letter of letters"
        :key="letter"
        @click="filterByLetter(letter)"
        class="w-2 h-2 flex items-center justify-center hover:text-green-500 hover:scale-150 transition-all cursor-pointer"
      >
        {{ letter }}
      </div>
    </div>
    <Meals :meals="meals"/>
  </main>
</template>

<script setup>
  import { computed, onMounted, ref } from "vue";
  import { useRoute } from "vue-router";
  
  import Meals from "../components/Meals.vue";
  import axiosClient from "../axiosClient.js";
  import store from "../store";

  const route = useRoute();
  const keyword = ref("");
  const meals = computed(() => store.state.searchedMeals);
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

  function searchMeals(){
    if (keyword.value) {
      store.dispatch("searchMeals", keyword.value);
    } else {
      store.commit("setSearchedMeals", []);
    }
  }

  function filterByLetter(letter) {
    store.dispatch("searchMeals", letter);
  }

  onMounted(async () => {
    for (let i = 0; i < 10; i++) {
      axiosClient
        .get(`random.php`)
        .then(({ data }) => meals.value.push(data.meals[0]));
    }
  });

  onMounted(() => {
    keyword.value = route.params.name
    if (keyword.value) {
      searchMeals()
    }
  })
</script>
