<template>
  <section>
    <nuxt-link :to="path + id">
      <div class="card-image">
        <figure class="image is-330x350">
          <img :src="posterUrl">
        </figure>
      </div>
      <div class="card-content">
        <div class="media">
          <div class="media-left"></div>
          <div class="media-content">
            <p class="title is-4">{{ title }}</p>
            <p v-if="rating" class="is-4">Rate: {{rating}}</p>
            <p class="is-4">Year: {{year}}</p>
          </div>
        </div>
      </div>
    </nuxt-link>
  </section>
</template>

<script>
export default {
  props: {
    posterUrl: {
      type: String,
      required: true
    },
    year: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    id: {
      required: true
    },
    rating: {
      default: undefined
    },
    path: {
      type: String,
      required: false,
      default: "movie/"
    },
    fav: {
      type: Boolean,
      required: false,
      default: false
    }
  }
};
</script>

<style scoped>
.fav {
  float: right;
}
.card-content {
  height: 150px;
}
</style>

