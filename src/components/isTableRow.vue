<template>
   <tr>
      <td>{{ pay.currMonth }}</td>
      <td>{{ pay.monthlyPayment }} руб.</td>
      <td>{{ pay.paymentInterest }} руб.</td>
      <td>{{ pay.paymentRemain }} руб.</td>
      <td>{{ pay.totalRemain }} руб.</td>
   </tr>
</template>
<script>

export default {
   name: "isTableRow",
   components: {},
   props: ['pay'],
}
</script>

<style scoped>
.text-right {
   text-align: right;
}
</style>