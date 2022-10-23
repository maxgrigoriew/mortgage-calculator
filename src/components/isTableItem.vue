<template>
   <tr
       class="p-2">
      <td class="table-striped">
         {{ item.monthlyPayment }}
      </td>
      <td class="table-striped">
         {{ item.title }}
      </td>
      <td class="table-secondary">
         {{ item.body }}
      </td>
      <td class="table-secondary text-right">
      </td>
   </tr>

</template>

<script>

export default {
   name: "isTableItem",
   components: {},
   props: ['item'],
}
</script>

<style scoped>
.text-right {
   text-align: right;
}
</style>