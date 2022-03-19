<template>
  <div id="app">
    <div class="nav">
      <div class="nav__logo">
        Free Tickets
      </div>
      <div class="nav__links">
        <router-link to="/">Booking</router-link> |
        <router-link to="/my-ticket">My Ticket</router-link> |
        <router-link to="/profile">Profile</router-link>
      </div>
      <div class="nav__right">
        {{ username }}
      </div>
    </div>
    <div class="router-view">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    username() {
      return this.$store.state.username;
    }
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.router-view {
  padding: 20px 30px;
}
.nav {
  display: flex;
  padding: 30px;
  justify-content: space-between;
  background: aliceblue;
  * {
    align-self: center;
  }
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.nav__logo {
  font-weight: 600;
  font-family: cursive;
  font-size: 20px;
}

.nav__links {
  align-self: center;
}
</style>
