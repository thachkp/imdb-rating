const path = '/api/movies';

export default {
  async nuxtServerInit(context) {
    const result = await this.$axios.$get(path);
    if (result) {
      context.commit('setMovies', result);
      context.commit('setMoviesLoaded', true);
    }
  },
  sortingByProp(context, payload) {
    const sorted = payload.movies
      .slice(0)
      .sort((a, b) => (a[payload.prop] < b[payload.prop] ?
        payload.sorting : payload.sorting - 1));
    context.commit('setMovies', sorted);
  }
};
