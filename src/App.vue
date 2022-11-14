<template>
   <v-app>
   <is-checkbox/>
      <is-select :options="options">

      </is-select>
   </v-app>
</template>

<script>

export default {
   name: 'App',

   components: {},

   data: () => ({
      options: [
         {name: 'Квартира на вторичном рынке', procent: 10, value: 2},
         {name: 'Квартира в новостройке', procent: 9.9, value: 1},
         {name: 'Купить дом', procent: 4.4, value: 3},
         {name: 'Построить дом', procent: 5.3, value: 4},
         {name: 'Купить землю или дачный дом', procent: 10.3, value: 5},
         {name: 'Наличные подо залог жилья', procent: 10.9, value: 6},
      ],
   }),
};
</script>
