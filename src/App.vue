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
               <v-text-field
                   label="Введите сумму кредита"
                   v-model="object.price"
               />
               <v-slider
                   hint="Im a hint"
                   :min="object.price * 0.15"
                   :max="object.price * 0.9"
                   thumb-label="always"
                   v-model="object.price"
               />
               <div>{{object.price}}</div>
            </v-col>
            <v-col
            
            >
            <v-row>
               <v-col>
                 <p>Сумма кредита</p>
                 <p>{{getPrice}}</p>
               </v-col>
               <v-col>
                  <p>Сумма первоначального взноса</p>
                  <p>{{getInitial}}</p>
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
         price: 1000000,
         initial: 150000,
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
   computed: {
      getPrice() {
         return this.object.price
      },
      getInitial() {
         return this.object.price - this.object.initial
      }
   }
};
</script>
<style lang="scss">

</style>