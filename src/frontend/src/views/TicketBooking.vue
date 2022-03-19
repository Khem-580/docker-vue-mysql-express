<template>
  <div class="ticket-booking">
    <TicketCard
      ticketImgUrl="A.png"
      ticketType="A"
      :minAmountPerOrder=2
      :sumAmount=2
      :maxAmountPerDay=10
      :price=500
      :isAvailable=1
      @onClickBuyBtn="handleBuyBtnEvent"
    />
  </div>
</template>

<script>
import TicketCard from "@/components/TicketCard.vue";

export default {
  name: "TicketBooking",
  components: {
    TicketCard,
  },
  methods: {
    handleBuyBtnEvent(data) {
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
          console.log("success")
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }
};
</script>