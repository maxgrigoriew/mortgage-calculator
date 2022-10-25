<template>
   <transition name="fade">
      <div v-show="visibleModal"
           @click="hideDialog"
           class="dialog">
         <div @click.stop class="dialog__inner">
            <div class="dialog__top">
               <h3 class="dialog__title">График платежей</h3>
               <button class="dialog__btn"
                       @click="hideDialog"
               >

               </button>
            </div>
            <div class="dialog__content">
               <is-table-header :resultTableArray="resultTableArray"/>
            </div>
            <slot></slot>
         </div>
      </div>
   </transition>
</template>

<script>
import IsTableHeader from '@/components/isTableHeader';

export default {
   name: 'isModal',
   components: {IsTableHeader},
   props: {
      visibleModal: {
         type: Boolean,
         default: false,
      },
      resultTableArray: {
         type: Array,
      },
   },
   methods: {
      hideDialog() {
         this.$emit('visibleModal', false);
      },
   },
};
</script>

<style lang="scss" scoped>
.dialog {
   position: fixed;
   left: 0;
   top: 0;
   right: 0;
   bottom: 0;
   padding: 1rem;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 100;
   &__inner {
      max-width: 1200px;
      width: 100%;
      padding: 30px;
      background: #fff;
      border-radius: 10px;
      position: relative;
   }
   &__title {
      margin: 0 0 20px;
      font-size: 22px;
   }
   &__btn {
      position: absolute;
      top: 10px;
      right: 15px;
      width: 40px;
      height: 40px;
      cursor: pointer;
      border:  #53b374;
      border-radius: 50%;
      background: transparent;
   }
   &__btn:before,
   &__btn:after {
      content: "";
      position: absolute;
      top: 19px;
      left: 8px;
      width: 26px;
      height: 3px;
      background: #53b374;
   }
   &__btn:before {
      transform: rotate(45deg);
   }
   &__btn:after {
      transform: rotate(-45deg);
   }
   &__content {
      max-height: 750px;
      overflow-y: scroll;
   }
}
.fade-enter-active, .fade-leave-active {
   transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
   opacity: 0
}
</style>