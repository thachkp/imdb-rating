export default {
  getMovies(state) {
    return state.movies;
  },
  getMoviesById: state => id => state.movies[id],
};
