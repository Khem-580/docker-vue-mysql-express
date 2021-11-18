<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <div class="input-field">
      <input
        v-model="inputGuest"
        type="text"
        placeholder="Type guest name" 
        class="textbox-guest"
      />
      <br />
      <button 
        @click="onSubmitGuest"
        class="button-guest"
      > Submit </button>
    </div>

    <table class="table-guests">
      <tr>
        <th>id</th>
        <th>name</th>
      </tr>
      <tr v-for="guestResult in guestResults" :key="guestResult.id">
        <td>{{ guestResult.id }}</td>
        <td>{{ guestResult.guest_name }}</td>
      </tr>
    </table>
  </div>
</template>

<script>

export default {
  name: 'App',
  mounted() {
    this.getGuests();
  },
  data() {
    return {
      requestUrl: process.env.VUE_APP_API_URL || "127.0.0.1:9400",
      inputGuest: null,
      isLoading: false,
      guestResults: [],
    }
  },
  methods: {
    onSubmitGuest() {
      if (!this.inputGuest || this.isLoading) {
        return;
      }
      const requestBody = { name: this.inputGuest };

      this.isLoading = true;
      fetch(this.requestUrl + "/guest", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      })
      .then(response => response.json())
      .then(responseBody => {
        if (responseBody.state == "success") {
          this.isLoading = false;
          this.inputGuest = null;
          this.getGuests();
        }
      })
      .catch((error) => {
        this.isLoading = false;
        console.error('Error:', error);
      });
    },
    getGuests() {
      fetch(this.requestUrl + "/guests", {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseBody => {
        if (responseBody.state == "success") {
          this.guestResults = responseBody.data;
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.input-field {
  display: block;
}

.textbox-guest, .button-guest {
  font-size: 20px;
  border-radius: 10px;
  padding: 10px;
  margin: 10px 0;
  border-color: green;
}

.table-guests {
  font-size: 16px;
  margin: 15px auto 0 auto;
}
</style>