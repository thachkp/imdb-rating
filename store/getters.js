export default {
  getMovies(state) {
    return state.movies;
  },
  getMoviesById: state => id => state.movies[id],
  getFavourites: state => state.favourites,
  getFavouritesById: state => id => {
    return state.favourites.some(el => el.id === id);
  }

};
