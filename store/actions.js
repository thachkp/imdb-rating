const path = '/api/movies';

export default {
  async nuxtServerInit(context) {
    const result = await this.$axios.$get(path);
    if (result) {
      context.commit('setMovies', result);
      context.commit('setMoviesLoaded', true);
    }
  }
};
