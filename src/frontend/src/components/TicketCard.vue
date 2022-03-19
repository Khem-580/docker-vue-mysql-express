<template>
  <div class="ticket-card">
    <div class="ticket-card__header">
      <div class="ticket-type">{{ ticketType }}</div>
      <div class="price">({{ price }} ฿)</div>
      <img :src="require(`../assets/${ticketImgUrl}`)" />
    </div>
    <div class="ticket-card__body">
      <b-numberinput v-model="boughtAmount" :placeholder=0 :min="minAmountPerOrder"></b-numberinput>
      <div class="buy-button-field">
        <button class="buy" @click="onClickBuyBtn">
          Buy
        </button>
      </div>
    </div>
    <div class="ticket-card__footer">
      <div :class="isAvailableClasses">
        {{ isAvailableToText }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TicketCard",
  props: {
    "ticketImgUrl": {
      type: String,
      required: true
    },
    "ticketType": {
      type: String,
      required: true
    },
    "minAmountPerOrder": {
      type: Number,
      required: true
    },
    "sumAmount": {
      type: Number,
      required: true
    },
    "maxAmountPerDay": {
      type: Number,
      required: true
    },
    "price": {
      type: Number,
      required: true
    },
    "isAvailable": {
      type: Number,
      required: true
    },
  },
  data() {
    return {
      boughtAmount: this.minAmountPerOrder
    };
  },
  computed: {
    leftAmount() {
      return this.maxAmountPerDay - this.sumAmount;
    },
    isAvailableToText() {
      return this.isAvailable ? `${this.leftAmount} tickets left` : "Sold out";
    },
    isAvailableClasses() {
      return {
        "buyable": this.isAvailable,
        "sold-out": !this.isAvailable
      };
    }
  },
  methods: {
    onClickBuyBtn() {
      this.$emit('onClickBuyBtn', {
        ticketType: this.ticketType,
        boughtAmount: this.boughtAmount
      });
    }
  }
};
</script>

<style scoped lang="less">
.ticket-card {
  width: 275px;
  box-shadow: 1px 2px 4px #7957D5;
  border: 4px solid #7957D5;
  border-radius: 10%;
  padding: 10px;
}
.ticket-card__header {
  .ticket-type {
    font-size: 30px;
    font-weight: 600;
    text-align: center;
    color: #7957D5;
  }
  .price {
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    color: #7957D5;
  }
  img {
    width: 70%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}
.ticket-card__body {
  button.buy {
    display: inline-block;
    font-size: 20px;
    color: white;
    font-weight: 600;
    background: #7957D5;
    padding: 5px 30px;
    outline: 0;
    border: 1px solid #7957D5;
    border-radius: 5px;
  }
  .b-numberinput {
    margin: 0 auto;
    width: 90%;
  }
  .buy-button-field {
    padding: 20px;
    text-align: center;
  }
}
.ticket-card__footer {
  padding: 10px 10px 10px 10px;
  text-align: right;
  .buyable {
    font-size: 16px;
    font-weight: 600;
    color: #7957D5;
  }
  .sold-out {
    font-size: 16px;
    font-weight: 600;
    color: red;
  }
}
</style>
