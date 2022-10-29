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
                           <span class="checkbox__wrapper">
                              <span class="checkbox__procent"
                                    :class="{'active': checked}">
                              - {{ obj.procentCard }} %
                           </span>
                              <is-checkbox v-model="checked" :procentCard="obj.procentCard"/>
                           </span>
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
                                     @keypress="validateNumber"
                                     :maxlength="limitPrice"
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
                        <div class="range__title">
                           Первоначальный взнос <br>
                           <span class="range__subtitle">
                              Первоначальный взнос должен быть не менее <strong>15%</strong> и не более <strong>90% </strong>от стоимости недвижимости
                           </span>
                        </div>
                        <div class="range__inner">
                           <div class="range__inner-top">
                              <input type="text"
                                     class="range__inner-text"
                                     v-model.trim.number="obj.initial"
                                     @keypress="validateNumber"
                                     :maxlength="limitPrice"
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
                                     @keypress="validateNumber"
                                     :maxlength="limitYears"
                              >
                              <div class="range__inner-icon">{{ getYears }}</div>
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
                                @click="openModal"
                        >
                           График платежей
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      <is-modal :visibleModal="visibleModal"
                @visibleModal="closeModal"
                :resultTableArray="resultTableArray"
      >
         <h3 slot="title">График платежей</h3>
         <is-table-header slot="content" :resultTableArray="resultTableArray"/>
         <div class="d-flex justify-content-end mt-3">
            <button class="info__button info__button--light"
                    @click="printTable">
               Печать
            </button>
         </div>
      </is-modal>
   </div>
</template>

<script>
import isSelect from '@/components/isSelect';
import isModal from '@/components/isModal';
import isCheckbox from '@/components/isCheckbox';
import IsTableHeader from '@/components/isTableHeader';

export default {
   name: 'App',
   components: {
      isSelect,
      isModal,
      isCheckbox,
      IsTableHeader
   },
   data() {
      return {
         years: 1,
         obj: {
            price: 1000000,
            initial: 150000,
            years: 1,
            procentCard: 1,
            maxPrice: 100000000,
            minPrice: 1000000,
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
         visibleModal: false,
         resultTableArray: [],
         limitPrice: 9,
         limitYears: 2,
      };
   },
   methods: {
      printTable() {
         window.print()
      },
      validateNumber(event, value) {
         const valueLength = (value + '').length
         console.log(valueLength);
         let keyCode = event.keyCode;
         if (keyCode < 48 || keyCode > 57) {
            event.preventDefault();
         }
         if (valueLength > 9) {
            console.log('error');
         }
      },
      selectChange(value) {
         this.selected = value;
      },
      openModal() {
         this.visibleModal = true;
      },
      closeModal() {
         this.visibleModal = false;
      },
      getPayments(months, loanAmount, annualIntersetRate) {
         const monthlyRate = annualIntersetRate / 12 / 100;
         const commonRate = Math.pow(1 + monthlyRate, months);
         const monthlyPayment = Math.floor((loanAmount * monthlyRate * commonRate) / (commonRate - 1));
         // Складируем все данные по месяцам сюда
         const result = [];
         const today = new Date(Date.now());
         for (let i = 0; i < months; i++) {
            // Переменная "totalRemain" будет отвечать за сумму,
            // которую осталось выплатить.
            // Изначально он будет равен сумме кредита.
            const {totalRemain = loanAmount} = result[result.length - 1] || {};
            const newDate = new Date(today.setMonth(today.getMonth() + 1));
            const paymentInterest = (monthlyRate * totalRemain).toFixed();
            const paymentRemain = (monthlyPayment - paymentInterest).toFixed();
            const currMonth = newDate.toLocaleString('ru', {
               year: 'numeric',
               month: 'short',
            });
            result.push({
               totalRemain: (Math.max(totalRemain - paymentRemain, 0)).toFixed(),
               monthlyPayment,
               paymentInterest,
               paymentRemain,
               currMonth,
            });
         }
         this.resultTableArray = result;
         return result;
      },
   },
   computed: {
      getProcent() {
         if (this.checked) {
            return (this.selected.procent - this.getSelectedProcent).toFixed(1);
         } else {
            return this.selected.procent;
         }
      },
      monthlyRate() {
         return this.getProcent / 100 / 12;
      },
      getLounAmount() {
         return Math.floor(this.obj.price - this.obj.initial);
      },
      getInitial() {
         return Math.floor(this.obj.initial)
      },
      getPrice() {
         return Math.floor(this.obj.price)
      },
      getMonth() {
         return this.obj.years * 12;
      },
      commonRate() {
         return Math.pow(1 + this.monthlyRate, this.getMonth);
      },
      monthlyPayment() {
         return Math.floor((this.getLounAmount * this.monthlyRate * this.commonRate) / (this.commonRate - 1));
      },
      getSelectedProcent() {
         return this.obj.procentCard;
      },
      recomendetIncome() {
         return Math.floor((this.monthlyPayment / 100 * 35) + this.monthlyPayment);
      },
      creditYears() {
         return this.obj.years;
      },
      initialPayment() {
         return this.obj.initial.toFixed(2);
      },
      getYears() {
         if (this.getMonth <= 12) {
            return 'год'
         }
         if (this.getMonth <= 48) {
            return 'года'
         } else {
            return 'лет'
         }
      },
   },
   watch: {
      creditYears() {
         this.getPayments(this.getMonth, this.getLounAmount, this.getProcent, this.selected);
      },
      getProcent() {
         this.getPayments(this.getMonth, this.getLounAmount, this.getProcent, this.selected);
      },
      getInitial() {
         this.getPayments(this.getMonth, this.getLounAmount, this.getProcent, this.selected);
      },
      getLounAmount() {
         this.getPayments(this.getMonth, this.getLounAmount, this.getProcent, this.selected);
      },
      getPrice() {
         if (this.obj.price < this.obj.initial) {
            this.obj.initial = Math.floor(this.obj.price * 0.9)
         } else {
            this.obj.initial = Math.floor(this.obj.price * 0.15)
         }
      }
   },
   mounted() {
      this.getPayments(this.getMonth, this.getLounAmount, this.getProcent)
   }
};
</script>
<style scoped lang="scss">
$green-color: #53b374;
.checkbox {
   margin-bottom: 30px;
   &__inner {
      display: flex;
      justify-content: space-between;
   }
   &__wrapper {
      display: flex;
      align-items: center;
   }
   &__procent {
      padding-right: 30px;
   }
   &__procent.active {
      color: $green-color;
   }
}
</style>