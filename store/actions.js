const path = '/api/movies';
const server = process.env.API_SERVER_CLIENT || 'http://localhost:3000';

export default {
  async nuxtServerInit(context) {
    const result = await this.$axios.$get(`${server}${path}`);
    if (result) {
      context.commit('setMovies', result);
      context.commit('setMoviesLoaded', true);
    }
  },
  sortingByProp(context, payload) {
    const sorting = payload.sorting ? -1 : 0;
    const sorted = payload.movies
      .slice(0)
      .sort((a, b) => (a[payload.prop] < b[payload.prop] ?
        sorting : sorting - 1));
    context.commit('setMovies', sorted);
  }
};
