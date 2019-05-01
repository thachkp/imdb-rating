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
import { mapGetters, mapMutations, mapActions } from "vuex";
import { findIndex } from "lodash";
export default {
  name: "HomePage",
  data() {
    return {
      fav: false,
      ratingSort: false,
      yearSort: false
    };
  },
  computed: {
    ...mapGetters(["getMovies", "getFavourites", "getFavouritesById"])
  },
  components: {
    Card
  },
  methods: {
    ...mapMutations([
      "addToFavorites",
      "removeFromFavorites",
      "sortingMovies",
      "setMovies"
    ]),
    ...mapActions(["sortingByProp"]),
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
        this.ratingSort = !this.ratingSort;
        this.sortingByProp({
          movies: this.getMovies,
          prop: "imdbRating",
          sorting: this.ratingSort
        });
      }
      if (type === "year") {
        this.yearSort = !this.yearSort;
        this.sortingByProp({
          movies: this.getMovies,
          prop: "year",
          sorting: this.yearSort
        });
      }
    }
  }
};
</script>

<style scope>
.fav {
  float: right;
}
.column {
  min-height: 550px;
}
.column.is-10,
.column.is-10-tablet {
  width: 100%;
}
.sort-filter {
  margin-bottom: 50px;
}
</style>
