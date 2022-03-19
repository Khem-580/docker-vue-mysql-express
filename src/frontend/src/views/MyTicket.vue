<template>
  <b-table :data="myTickets" :columns="columns"></b-table>
</template>

<script>
export default {
  mounted() {
    this.getUserTickets();
  },
  data() {
    return {
      myTickets: [],
      columns: [
        {
          field: "id",
          label: "ID",
        },
        {
          field: "full_name",
          label: "Username",
        },
        {
          field: "ticket_type",
          label: "Ticket Type",
        },
        {
          field: "amount",
          label: "Amount",
        },
        {
          field: "created_at",
          label: "Created At",
          centered: true,
        },
      ],
    };
  },
  methods: {
    getUserTickets() {
      fetch(process.env.VUE_APP_API_URL + "/tickets/user?" + new URLSearchParams({
          fullname: this.$store.state.username
      }))
      .then(response => response.json())
      .then(responseBody => {
        if (responseBody.state == "success") {
          this.myTickets = responseBody.data;
        }
      })
      .catch((error) => {
        console.error(error);
      });
    }
  }
};
</script>
