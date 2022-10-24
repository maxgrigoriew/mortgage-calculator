<template>
   <table>
      <thead>
      <tr>
         <th>Месяц, год</th>
         <th>Ежемесячный платеж</th>
         <th>Сумма погашения процентов</th>
         <th>Сумма погашения сновного долга</th>
         <th>Остаток долга</th>
      </tr>
      </thead>
      <tbody class="tableBody">
      <tr v-for="(pay, index) in resultTableArray"
          :key="index"
          :pay="pay">
         <td>{{ pay.currMonth }}</td>
         <td>{{ pay.monthlyPayment }} руб.</td>
         <td>{{ pay.paymentInterest }} руб.</td>
         <td>{{ pay.paymentRemain }} руб.</td>
         <td>{{ pay.totalRemain }} руб.</td>
      </tr>
      </tbody>
   </table>
</template>

<script>

export default {
   name: 'isTableHeader',
   props: ['resultTableArray'],
   components: {
   },
   data() {
      return {};
   },
};
</script>

<style scoped>
.text-right {
   text-align: right;
}
</style>