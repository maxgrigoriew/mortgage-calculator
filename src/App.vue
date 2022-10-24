<template>
   <div id="app">
      <div class="wrapper">
         <div class="container">
            <h1 class="title col-md-6">
               Калькулятор ипотеки для IT-специалистов
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
                                  :min="obj.minPrice"
                                  :max="obj.maxPrice"
                                  v-model="obj.price"
                           >
                        </div>
                     </div>

                     <div class="range col-12">
                        <div class="range__title" style="font-weight: 900;">
                           Первоначальный взнос <br>
                           <span style="font-size: 10px;">Первоначальный взнос должен быть не более 90% от стоимости недвижимости</span>
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
                                  :min="obj.price * 0.15"
                                  :max="obj.price * 0.9"
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
                                     v-model.trim.number="obj.years"
                              >
                              <div class="range__inner-icon">лет</div>
                           </div>
                           <input class="range__inner-input"
                                  type="range"
                                  min="1"
                                  max="30"
                                  v-model.trim.number="obj.years"
                           >
                        </div>
                     </div>
                  </div>
               </div>
               <div class="col-md-6">
                  <div class="row">
                     <div class="info col-lg-6">
                        <span class="info__title">Сумма кредита</span>
                        <span class="info__price">{{ getLounAmount }} ₽</span>
                     </div>
                     <div class="info col-lg-6">
                        <span class="info__title">Ежемесячный платеж</span>
                        <span class="info__price">{{ monthlyPayment }} ₽</span>
                     </div>
                     <div class="info col-lg-6">
                        <span class="info__title">Процентная ставка</span>
                        <span class="info__price info__price--greeen">{{ getProcent }} %</span>
                     </div>
                     <div class="info col-lg-6">
                        <span class="info__title">Рекомендованный доход</span>
                        <span class="info__price">{{ recomendetIncome }} ₽</span>
                     </div>

                     <div class="info col-12">
                        <button class="info__button info__button--light"
                        >График платежей
                        </button>
                     </div>
                     <div class="info col-12">
                        <button class="info__button">Оставить заявку</button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
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
         <template v-if="resultTableArray.length > 0">
            <tr v-for="(pay, index) in resultTableArray"
                :key="index"
            >
               <td>{{ pay.currMonth }}</td>
               <td>{{ pay.monthlyPayment }} руб.</td>
               <td>{{ pay.paymentInterest }} руб.</td>
               <td>{{ pay.paymentRemain }} руб.</td>
               <td>{{ pay.totalRemain }} руб.</td>
            </tr>
         </template>
         </tbody>
      </table>
      <!--      <is-modal :visibleModal="visibleModal"-->
      <!--                @visibleModal="closeModal"-->
      <!--                :resultTableArray="resultTableArray"-->
      <!--      />-->
   </div>
</template>

<script>
import isSelect from '@/components/isSelect';
// import isModal from '@/components/isModal';

export default {
   name: 'App',
   components: {
      isSelect,
      // isModal
   },
   data() {
      return {
         years: 1,
         obj: {
            price: 200000,
            initial: null,
            years: 1,
            value: 0,
            procentCard: 1,
            maxPrice: 6000000,
            minPrice: 200000
         },
         options: [
            {name: 'Квартира на вторичном рынке', procent: 10, value: 2},
            {name: 'Квартира в новостройке', procent: 9.9, value: 1},
            {name: 'Купить дом', procent: 4.4, value: 3},
            {name: 'Построить дом', procent: 5.3, value: 4},
            {name: 'Купить землю или дачный дом', procent: 10.3, value: 5},
            {name: 'Наличные подо залог жилья', procent: 10.9, value: 6},
         ],
         checked: false,
         selected: '',
         visibleModal: true,
         resultTableArray: []
      };
   },
   methods: {
      selectChange(value) {
         this.selected = value
      },
      openModal() {
         this.visibleModal = true
      },
      closeModal() {
         this.visibleModal = false
      },
      getPayments(months, loanAmount, annualIntersetRate) {
         // Заведём переменную "месечная процентная ставка"
         // она будет равна "годовая процентной ставке" (annualIntersetRate)
         // поделённой на кол-ву месяцев в году (12)
         // Например, если годовая ставка будет равна 10%,
         // то месечная ставка = 10/12/100 = 0.0083%
         const monthlyRate = annualIntersetRate / 12 / 100
         const commonRate = Math.pow(1 + monthlyRate, months)
         const monthlyPayment = ((loanAmount * monthlyRate * commonRate) / (commonRate - 1)).toFixed(2)
         // Складируем все данные по месяцам сюда
         const result = []
         const today = new Date(Date.now())
         for (let i = 0; i < months; i++) {
            // Переменная "totalRemain" будет отвечать за сумму,
            // которую осталось выплатить.
            // Изначально он будет равен сумме кредита.
            const {totalRemain = loanAmount} = result[result.length - 1] || {}
            const newDate = new Date(today.setMonth(today.getMonth() + 1))
            const paymentInterest = (monthlyRate * totalRemain).toFixed(2)
            const paymentRemain = (monthlyPayment - paymentInterest).toFixed(2)
            const currMonth = newDate.toLocaleString('ru', {
               year: 'numeric',
               month: 'short'
            })
            result.push({
               totalRemain: (Math.max(totalRemain - paymentRemain, 0)).toFixed(2),
               monthlyPayment,
               paymentInterest,
               paymentRemain,
               currMonth
            });
         }
         this.resultTableArray = result
         return result;
      },
   },
   computed: {
      getProcent() {
         if (this.checked) {
            return this.selected.procent - this.getSelectedProcent
         } else {
            return this.selected.procent
         }
      },
      monthlyRate() {
         return this.getProcent / 100 / 12
      },
      getLounAmount() {
         return this.obj.price - this.obj.initial
      },
      getInitial() {
         return this.obj.initial
      },
      getMonth() {
         return this.obj.years * 12
      },
      commonRate() {
         return Math.pow(1 + this.monthlyRate, this.getMonth)
      },
      monthlyPayment() {
         let monthlyPay  = (this.getLounAmount * this.monthlyRate * this.commonRate) / (this.commonRate - 1)
         let monthlyAroundPayment = Math.floor(monthlyPay )
         if (monthlyAroundPayment < 0) {
            return false
         }
         return monthlyAroundPayment
      },
      getSelectedProcent() {
         return this.obj.procentCard
      },
      recomendetIncome() {
         return (this.monthlyPayment / 100 * 35) + this.monthlyPayment
      },
      creditYears () {
         return this.obj.years
      },
      initialPayment () {
         return this.obj.initial
      }
   },
   watch: {
      creditYears () {
         this.getPayments(this.obj.years * 12, this.getLounAmount, this.getProcent, this.selected)
      },
      getProcent() {
         this.getPayments(this.obj.years * 12, this.getLounAmount, this.getProcent, this.selected)
      },
      getInitial () {
         this.getPayments(this.obj.years * 12, this.getLounAmount, this.getProcent, this.selected)
      },
      getLounAmount() {
         this.getPayments(this.obj.years * 12, this.getLounAmount, this.getProcent, this.selected)

      }
   },
   mounted() {
      this.obj.initial = this.obj.price * 0.15
      this.getPayments(this.obj.years * 12, this.getLounAmount, this.getProcent)
   }
}
;
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
