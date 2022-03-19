<template>
  <div class="ticket-booking">
    <h1 class="ticket-booking__topic">
      Today's tickets
    </h1>
    <div class="ticket-booking__cards">
      <TicketCard
        v-for="tt in todayTickets" :key="tt.ticket_type"
        :ticketImgUrl="tt.ticket_type + '.png'"
        :ticketType=tt.ticket_type
        :minAmountPerOrder=tt.min_amount_per_order
        :sumAmount=tt.sum_amount
        :maxAmountPerDay=tt.max_amount_per_day
        :price=tt.price
        :isAvailable=tt.is_available
        @onClickBuyBtn="handleBuyBtnEvent"
      />
      <b-loading :is-full-page="true" v-model="isLoading" :can-cancel="true"></b-loading>
    </div>
  </div>
</template>

<script>
import TicketCard from "@/components/TicketCard.vue";

export default {
  name: "TicketBooking",
  components: {
    TicketCard,
  },
  data() {
    return {
      todayTickets: null,
      isLoading: true,
    }
  },
  mounted() {
    this.getTodayTickets();
  },
  methods: {
    handleBuyBtnEvent(data) {
      this.$buefy.dialog.confirm({
        message: `Wanna buy ${data.boughtAmount} tickets with no refund ?`,
        onConfirm: () => {
          this.isLoading = true;
          let requestBody = {
            fullname: this.$store.state.username,
            ticketType: data.ticketType,
            amount: data.boughtAmount
          }
          fetch(process.env.VUE_APP_API_URL + "/ticket", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestBody),
          })
          .then(response => response.json())
          .then(responseBody => {
            if (responseBody.state == "success") {
              this.getTodayTickets();
              this.$buefy.toast.open({
                message: responseBody.message,
                duration: 3000,
                type: 'is-success'
              })
              this.$router.push("my-ticket");
            } else {
              this.$buefy.toast.open({
                message: responseBody.message,
                duration: 5000,
                type: 'is-danger'
              })
            }
          })
          .catch((error) => {
            console.error(error);
          })
          .finally(() => {
            this.isLoading = false;
          });
        }
      })
    },
    getTodayTickets() {
      this.isLoading = true;
      fetch(process.env.VUE_APP_API_URL + "/tickets/reservation", {
        method: 'GET'
      })
      .then(response => response.json())
      .then(responseBody => {
        if (responseBody.state == "success") {
          this.todayTickets = responseBody.data;
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        this.isLoading = false;
      });
    }
  }
};
</script>

<style lang="less" scoped>
.ticket-booking__cards {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
}
.ticket-booking__topic {
  font-size: 34px;
  margin: 8px 0 28px 0;
  text-decoration: underline;
  font-weight: 600;
}
</style>