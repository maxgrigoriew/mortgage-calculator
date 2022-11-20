<template>
   <v-app class="d-flex align-center justify-center">
      <v-container>
         <h1 class="pt-15 mb-10">Расчет ипотеки</h1>
         <v-row>
            <v-col
                md="6"
                sm="12"
            >
               <v-select
                   class="mb-5"
                   v-model="defaultOption"
                   :items="options"
                   :hint="`${defaultOption.name}, ${defaultOption.value}`"
                   item-value="procent"
                   item-text="name"
               />
               <v-switch
                   class="ml-auto d-inline-flex"
                   v-model="checkbox"
                   value="red"
                   hide-details
               />
<!--               field 1                     -->
               <v-text-field
                   label="Введите сумму кредита"
                   v-model="object.creditPrice"
               />
               <v-slider
                   v-model="object.creditPrice"
                   :max="object.maxPrice"
                   :min="object.minPrice"
               />
<!--               field 2                     -->
               <v-text-field
                   v-model="object.initial"
               />
               <v-slider
                   v-model="object.initial"
                   :min="object.creditPrice * 0.15"
                   :max="object.creditPrice * 0.9"
               />
            </v-col>
            <v-col
            
            >
            <v-row>
               <v-col>
                 <p>Сумма кредита</p>
                 <p>{{object.creditPrice}}</p>
               </v-col>
               <v-col>
                  <p>Сумма первоначального взноса</p>
                  <p>{{object.initial}}</p>
               </v-col>
            </v-row>
            </v-col>
         
         </v-row>
      </v-container>
   </v-app>
</template>

<script>

export default {
   name: 'App',
   
   components: {},
   
   data: () => ({
      object: {
         creditPrice: 1000000,
         initial: 150000,
         minPrice: 1000,
         maxPrice: 100000
      },
      checkbox: false,
      defaultOption: {name: 'Квартира на вторичном рынке', procent: 10, value: 2},
      options: [
         {name: 'Квартира на вторичном рынке', procent: 10, value: 2},
         {name: 'Квартира в новостройке', procent: 9.9, value: 1},
         {name: 'Купить дом', procent: 4.4, value: 3},
         {name: 'Построить дом', procent: 5.3, value: 4},
         {name: 'Купить землю или дачный дом', procent: 10.3, value: 5},
         {name: 'Наличные подо залог жилья', procent: 10.9, value: 6},
      ],
   }),
   methods: {
   },
   computed: {
      getPrice() {
         return this.object.creditPrice
      },
      // getInitial() {
      //    return this.object.price - this.object.initial
      // }
   },
   watch: {
      // handler() {
      //    console.log('sd')
      //    return this.object.price
      // },
      // deep: true
   },
};
</script>
<style lang="scss">

</style>