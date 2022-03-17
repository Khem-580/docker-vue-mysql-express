<template>
  <div class="profile">
    <b-field label="Username" class="username-field">
      <b-input v-model="username" @input="setUsername()"></b-input>
    </b-field>
  </div>
</template>

<script>
export default {
  mounted() {
  },
  data() {
    return {
      username: this.$store.state.username
    };
  },
  methods: {
    setUsername() {
      this.$store.dispatch("setUsername", this.username);
    }
  }
};
</script>

<style lang="less" scoped>
.username-field {
  margin-top: 15px;
}
</style>
