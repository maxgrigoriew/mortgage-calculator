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
      <is-table-item v-for="post in posts"
                       :key="post.id"
                       :post="post"/>
   </table>
   <div v-else> Таблица пуста
   </div>
</template>

<script>
import isTableItem from "@/components/isTableItem";

export default {
   name: "isTableHeader",
   data() {
      return {
         posts: [
            {
               id: 1,
               title: 'title',
               body: 'body'
            }
         ]
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