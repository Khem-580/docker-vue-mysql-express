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
      console.log(data);
    }
  }
};
</script>