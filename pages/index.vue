<template>
  <section class="section">
    <b-dropdown class="sort-filter" hoverable aria-role="list">
      <button class="button is-dark" slot="trigger">
        <span>Filter</span>
        <b-icon icon="menu-down"></b-icon>
      </button>

      <b-dropdown-item aria-role="listitem" @click="sorting('rate')">Rating</b-dropdown-item>
      <b-dropdown-item aria-role="listitem" @click="sorting('year')">Year</b-dropdown-item>
    </b-dropdown>
    <div class="container">
      <div class="columns is-multiline">
        <div class="card column is-one-fifth" v-for="item in getMovies">
          <Card
            :posterUrl="item.posterurl"
            :title="item.title"
            :id="item.id"
            :year="item.year"
            :rating="item.imdbRating"
          ></Card>
          <div v-if="getFavouritesById(item.id)">
            <a @click="addtoFav(item.id)">
              <img class="fav" src="https://img.icons8.com/color/24/000000/hearts.png">
            </a>
          </div>
          <div v-else>
            <a @click="addtoFav(item.id)">
              <img
                class="fav"
                src="https://img.icons8.com/material-outlined/28/000000/filled-like.png"
              >
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "~/components/Card";
import { mapGetters, mapMutations } from "vuex";
import { findIndex } from "lodash";
export default {
  name: "HomePage",
  data() {
    return {
      fav: false
    };
  },
  computed: {
    ...mapGetters(["getMovies", "getFavourites", "getFavouritesById"])
  },
  components: {
    Card
  },
  methods: {
    ...mapMutations(["addToFavorites", "removeFromFavorites", "sortingMovies"]),
    addtoFav(id) {
      const exist = this.getFavouritesById(id);
      if (!exist) {
        this.addToFavorites(this.getMovies[id - 1]);
      } else {
        const index = findIndex(this.getFavourites, el => {
          return el.id === id;
        });
        if (index !== -1) this.removeFromFavorites(index);
      }
    },
    sorting(type) {
      console.log(type);

      if (type === "rate") {
        function compare(a, b) {
          if (a.imdbRating < b.imdbRating) return -1;
          if (a.imdbRating > b.imdbRating) return 1;
          return 0;
        }
        this.sortingMovies(compare);
      }
      if (type === "year") {
      }
    }
  }
};
</script>

<style scope>
.fav {
  float: right;
}
.column.is-10,
.column.is-10-tablet {
  width: 100%;
}
.sort-filter {
  margin-bottom: 50px;
}
</style>
