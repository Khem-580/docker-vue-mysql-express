<template>
  <div class="ticket-booking">
    <h1 class="ticket-booking__topic">
      Today's ticket
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
      todayTickets: null
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
            } else {
              this.$buefy.toast.open({
                message: responseBody.message,
                duration: 3500,
                type: 'is-danger'
              })
            }
          })
          .catch((error) => {
            console.error(error);
          });
        }
      })
    },
    getTodayTickets() {
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
  margin: 28px;
  text-decoration: underline;
  font-weight: 600;
}
</style>