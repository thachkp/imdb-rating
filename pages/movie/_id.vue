<template>
  <section class="container">
    <div class="image">
      <figure class="image is-330x450">
        <img :src="movie.posterurl">
      </figure>
    </div>
    <div class="tile is-ancestor">
      <div class="tile is-parent">
        <div class="tile is-child box">
          <div v-if="getFavouritesById(id)">
            <a @click="addtoFav">
              <img class="fav" src="https://img.icons8.com/color/24/000000/hearts.png">
            </a>
          </div>
          <div v-else>
            <a @click="addtoFav">
              <img
                class="fav"
                src="https://img.icons8.com/material-outlined/28/000000/filled-like.png"
              >
            </a>
          </div>
          <p class="title">{{movie.title}}</p>
          <p></p>
          <p class="subtitle">Actors: {{movie.actors.toString()}}</p>
          <p class="subtitle">Genres: {{movie.genres.toString()}}</p>
          <p class="subtitle">Duration: {{movie.duration}}</p>
          <p class="subtitle">Rating: {{movie.imdbRating}}</p>
          <p class="subtitle">Release Date: {{movie.releaseDate}}</p>
          <p class="description">{{movie.storyline}}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { findIndex } from "lodash";

export default {
  data() {
    return {
      id: this.$route.params.id,
      movieObj: {}
    };
  },
  computed: {
    ...mapGetters([
      "getMoviesById",
      "getFavouritesById",
      "getMovies",
      "getFavourites"
    ]),
    movie: function() {
      this.movieObj = this.getMoviesById(this.id - 1);
      return this.movieObj;
    }
  },
  methods: {
    ...mapMutations(["addToFavorites", "removeFromFavorites"]),
    addtoFav: function() {
      const exist = this.getFavouritesById(this.id);
      if (!exist) {
        this.addToFavorites(this.getMovies[parseInt(this.id) - 1]);
      } else {
        const index = findIndex(this.getFavourites, elem => {
          return elem.id === this.id;
        });
        if (index !== -1) this.removeFromFavorites(index);
      }
    }
  }
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
.image {
  margin: 50px auto;
  max-width: 300px;
}
.image img {
  max-height: 500px;
}

.main-content {
  margin-bottom: 150px;
}
.fav {
  float: right;
}
</style>
