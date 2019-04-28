<template>
  <div>
    <nav class="navbar header has-shadow is-dark" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <img src="~assets/imdb-icon.png" alt="IMDB" height="28">
        </a>

        <div class="navbar-burger">
          <span/>
          <span/>
          <span/>
        </div>
      </div>
    </nav>

    <section class="main-content columns">
      <aside class="column is-2 section">
        <p class="menu-label is-hidden-touch">General</p>
        <ul class="menu-list">
          <li v-for="(item, key) of items" :key="key">
            <nuxt-link :to="item.to" exact-active-class="is-active">
              <b-icon :icon="item.icon" :class="item.class"/>
              {{ item.title }}
            </nuxt-link>
          </li>
        </ul>
      </aside>

      <div class="container column is-10">
        <nuxt/>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Home",
          icon: "home",
          to: { name: "index" }
        },
        {
          title: "Favourites",
          icon: "user",
          to: { name: "favourites" },
          class: "mdi mdi-heart mdi-24px"
        }
      ]
    };
  }
};
</script>

<style>
.navbar {
  min-height: 4.25rem;
}
.navbar-item img {
  max-height: 2.75rem;
}
.menu-list a.is-active {
  background-color: #f3ce13;
  color: black;
}
.is-2 {
}
</style>
