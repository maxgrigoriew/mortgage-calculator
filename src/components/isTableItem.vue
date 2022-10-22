<template>
   <tr
       class="p-2">
      <td class="table-striped">
         {{ post.id }}
      </td>
      <td class="table-striped">
         {{ post.title }}
      </td>
      <td class="table-secondary">
         {{ post.body }}
      </td>
      <td class="table-secondary text-right">
      </td>
   </tr>

</template>

<script>

export default {
   name: "isTableItem",
   components: {},
   props: ['post'],
}
</script>

<style scoped>
.text-right {
   text-align: right;
}
</style>