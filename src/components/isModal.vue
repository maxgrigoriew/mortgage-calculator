<template>
   <transition name="fade">
      <div v-show="visibleModal"
           @click="hideDialog"
           class="dialog">
         <div @click.stop class="dialog__inner">
            <div class="dialog__top">
               <h3 class="dialog__title">График платежей</h3>
               <button class="dialog__btn">x</button>
            </div>
            <div class="dialog__content">
            <is-table-header/>
            </div>
            <slot></slot>
         </div>
      </div>
   </transition>
</template>

<script>
import IsTableHeader from "@/components/isTableHeader";
export default {
   name: "isModal",
   components: {IsTableHeader},
   props: {
      visibleModal: {
         type: Boolean,
         default: false
      }
   },
   methods: {
      hideDialog() {
         this.$emit('visibleModal', false)
      }
   }
}
</script>

<style lang="scss" scoped>
.dialog {
   position: fixed;
   left: 0;
   top: 0;
   right: 0;
   bottom: 0;
   background: rgba(0, 0, 0, 0.5);
   display: flex;
   justify-content: center;
   align-items: center;
   z-index: 100;
   &__inner {
      max-width: 600px;
      width: 100%;
      padding: 1rem;
      background: #fff;
      border-radius: 10px;
      position: relative;
   }
   &__btn {
      position: absolute;
      right: 20px;
      top: 20px;
   }
}
.fade-enter-active,
.fade-leave-active {
   transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
   opacity: 0;
}
</style>