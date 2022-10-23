<template>
   <table v-if="true"
          class="w-100">
      <tr class="table-warning card-title mt-4">
         <th>Месяц</th>
         <th>Платеж</th>
         <th>Проценты</th>
         <th>Основной долг</th>
         <th>Остаток долга</th>
      </tr>
      <is-table-item v-for="item in resultTableArray"
                       :key="item.id"
                       :post="item"/>
   </table>
   <div v-else> Таблица пуста
   </div>
</template>

<script>
import isTableItem from "@/components/isTableItem";

export default {
   name: "isTableHeader",
   props: ['resultTableArray'],
   data() {
      return {
      
      }
   },
   components: {
      isTableItem
   },
}
</script>

<style scoped>
.text-right {
   text-align: right;
}
</style>