export default {
  setMovies(state, movies) {
    state.movies = movies;
  },
  setMoviesLoaded(state, value) {
    state.loaded = value;
  },
  addToFavorites(state, payload) {
    state.favourites.push(payload);
  },
  removeFromFavorites(state, index) {
    state.favourites.splice(index, 1);
  }
};
