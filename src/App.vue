<template>
   <div id="app">
      <div class="wrapper">
         <div class="container">
            <h1 class="title col-md-6">
               Ипотечный калькулятор
            </h1>
            <div class="row wrapper__inner">
               <div class="col-md-6">
                  <div class="row">
                     <div class="select col-12">
                        <div class="info__title">Выберите 1 из 5 ипотечных программ для расчета</div>
                        <is-select :options="options"
                                   :selected="selected"
                                   @option="selectChange"
                        />
                     </div>
                     <div class="checkbox col-12">
                        <div class="checkbox__inner">
                           <span class="checkbox__title">Есть зарплатная карта</span>
                           <div class="checkbox__wrapper">
                              <span class="checkbox__procent"
                                    :class="{active: checked}"
                              >
                                 -1%
                              </span>
                              <label class="switch" for="checkbox">
                                 <input type="checkbox"
                                        v-model="checked"
                                        value="test"
                                 />
                                 <div class="slider round"
                                      @click="checked = !checked"
                                 >

                                 </div>
                              </label>
                           </div>
                        </div>
                     </div>

                     <div class="range col-12">
                        <div class="range__title">
                           Стоимость недвижимости
                        </div>
                        <div class="range__inner">
                           <div class="range__inner-top">
                              <input type="text"
                                     class="range__inner-text"
                                     v-model.trim.number="obj.price"
                              >
                              <div class="range__inner-icon">₽</div>
                           </div>
                           <input class="range__inner-input"
                                  type="range"
                                  min="0"
                                  max="100000"
                                  v-model="obj.price"
                           >
                        </div>
                     </div>

                     <div class="range col-12">
                        <div class="range__title">
                           Первоначальный взнос
                        </div>
                        <div class="range__inner">
                           <div class="range__inner-top">
                              <input type="text"
                                     class="range__inner-text"
                                     v-model.trim.number="obj.initial"
                              >
                              <span class="range__inner-icon">₽</span>
                           </div>
                           <input class="range__inner-input"
                                  type="range"
                                  min="0"
                                  max="99000"
                                  v-model="obj.initial"
                           >
                        </div>
                     </div>
                     <div class="range col-12">
                        <div class="range__title">
                           Срок ипотеки
                        </div>
                        <div class="range__inner">
                           <div class="range__inner-top">
                              <input type="text"
                                     class="range__inner-text"
                                     v-model.trim.number="obj.months"
                              >
                              <div class="range__inner-icon">мес.</div>
                           </div>
                           <input class="range__inner-input"
                                  type="range"
                                  min="1"
                                  max="12"
                                  v-model="obj.months"
                                  @input="checkInput"
                           >
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="row">
                     <div class="info col-lg-6">
                        <span class="info__title">Сумма кредита</span>
                        <span class="info__price">{{  }} ₽</span>
                     </div>
                     <div class="info col-lg-6">
                        <span class="info__title">Ежемесячный платеж</span>
                        <span class="info__price">{{  }} ₽</span>
                     </div>
                     <div class="info col-lg-6">
                        <span class="info__title">Процентная ставка</span>
                        <span class="info__price">{{  }} %</span>
                     </div>
                     <div class="info col-12">
                        <button class="info__button info__button--light">График платежей</button>
                     </div>
                     <div class="info col-12">
                        <button class="info__button">Оставить заявку</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>

      </div>
   </div>
</template>

<script>
import isSelect from '@/components/isSelect';

export default {
   name: 'App',
   components: {
      isSelect,
   },
   data() {
      return {
         obj: {
            price: 0,
            initial: 0,
            months: 1,
            value: 0,
         },
         options: [
            {name: 'Квартира в новостройке', procent: 5.7, value: 1},
            {name: 'Квартира на вторичном рынке', procent: 10.4, value: 2},
            {name: 'Купить дом', procent: 4.4, value: 3},
         ],
         optionName: '112',
         checked: false,
         selected: 'df'
      };
   },
   methods: {
      selectChange(value) {
         console.log('123',value.name);
         this.selected = value
      },
      checkInput() {
         if(this.obj.months ===  null || this.obj.months === '') {
            this.obj.months = 0
            console.log(this.obj.months);
         }
      }
   },
   computed: {

   },
};
</script>

<style lang="scss">

$green-color: #53b374;
.switch input {
   display: none;
}
.switch {
   display: inline-block;
   height: 26px;
   position: relative;
   width: 60px;
}
.slider {
   bottom: 0;
   cursor: pointer;
   left: 0;
   position: absolute;
   right: 0;
   top: 0;
   transition: .4s;
   border: 1px solid $green-color;
}
.slider:before {
   background-color: #53b374;
   bottom: 3px;
   content: "";
   width: 18px;
   height: 18px;
   left: 4px;
   position: absolute;
   transition: .4s;
}
input:checked + .slider {
   background-color: #53b374;
}
input:checked + .slider:before {
   transform: translateX(33px);
   background: #fff;
}
.slider.round {
   border-radius: 34px;
}
.slider.round:before {
   border-radius: 50%;
}

</style>
