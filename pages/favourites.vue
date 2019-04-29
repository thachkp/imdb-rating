<template>
  <section class="section">
    <div class="container">
      <div class="columns is-multiline">
        <div class="card column is-one-fifth" v-for="item in getFavourites">
          <Card
            :posterUrl="item.posterurl"
            :title="item.title"
            :id="item.id"
            :year="item.year"
            :rating="item.imdbRating"
          ></Card>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Card from "~/components/Card";
import { mapGetters } from "vuex";

export default {
  name: "HomePage",
  computed: {
    ...mapGetters(["getFavourites"])
  },
  components: {
    Card
  }
};
</script>

<style scope>
.container {
  max-width: 85%;
}
.image img {
  height: 350px;
}
.column.is-10,
.column.is-10-tablet {
  width: 100%;
}
</style>
