<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template id="layout">
  <header>
    <img alt="Logo" class="logo" src="@/assets/images/hk-logo.jpg" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Login</RouterLink>
        <RouterLink to="/students">Students</RouterLink>
        <RouterLink to="/archive">Archive</RouterLink>
        <RouterLink to="/help">Help</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
#layout {
  display: flex;
  flex-direction: column;
  align-items: stretch; 
  justify-content: flex-start;
  min-height: 100vh;
}

header {
  line-height: 1.5;
  width: 100%;
  height: 150px;
  margin-bottom: 15px;
  margin-top: -15px;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  height: 80px;
  width: 80px;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 2rem;
  }

  .logo {
    margin: 0;
  }

  header .wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap; 
  }

  nav {
    display: flex;
    align-items: center;
    gap: 1rem;
    width: auto;         
    white-space: nowrap; 
    margin: 0;
    padding: 0;
    font-size: 1rem;
  }

  nav a {
    border-left: none;
  }
}

</style>
