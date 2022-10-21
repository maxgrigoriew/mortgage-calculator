<template>
   <div
       class="custom-select"
       :tabindex="tabindex"
       @blur="open = false"
       :class="{open: open}"
   >
      <div
          class="selected"
          :class="{open: open}"
          @click="open = !open"
      >
         <div class="selected__title"> {{ selected.name }}</div>
      </div>
      <div
          class="items"
          :class="{selectHide: !open}"
      >
         <div
             class="item"
             v-for="(option, i) of options"
             :key="i"
             @click="selected=option; open=false; $emit('option', option)"
         >
            <div class="item__title"> {{ option.name }}</div>
            <div class="item__procent"> {{ option.procent }}</div>
         </div>
      </div>
   </div>
</template>
<script>
export default {
   name: 'isSelect',
   props: {
      options: {
         type: Array,
         required: true,
      },
      tabindex: {
         type: Number,
         required: false,
         default: 0,
      },
   },
   data() {
      return {
         selected: this.options.length > 0 ? this.options[0] : null,
         open: false,
      };
   },
   mounted() {
      this.$emit('option', this.selected);
   },
};
</script>
<style scoped lang="scss">
.selected {
   min-height: 50px;
}
.custom-select {
   position: relative;
   width: 100%;
   text-align: left;
   outline: none;
   height: 47px;
   line-height: 47px;
   z-index: 2;
}
.custom-select .selected:after {
   position: absolute;
   content: "";
   right: 1em;
   width: 0;
   height: 0;
   transition: 0.4s;
   transform: rotate(0) translateY(0);
   transform-origin: top;
   border: 5px solid #53b374;
   border-color: #53b374 transparent transparent transparent;
   z-index: 100;
}
.custom-select.open .selected:after {
   transform: rotate(180deg) translateY(-3px);
}
.selected {
   border-radius: 5px;
   border: 1px solid #53b374;
   background: #fff;
   padding-left: 8px;
   cursor: pointer;
   user-select: none;
}
.selected.open {
   border-bottom-left-radius: 0;
   border-bottom-right-radius: 0;
}
.selected:after {
   position: absolute;
   content: "";
   top: 22px;
   right: 10px;
   width: 0;
   height: 0;
}
.items {
   border-radius: 0px 0px 6px 6px;
   overflow: hidden;
   border-right: 1px solid #53b374;
   border-left: 1px solid #53b374;
   border-bottom: 1px solid #53b374;
   position: absolute;
   background-color: #fff;
   left: 0;
   right: 0;
   z-index: 10;
   min-height: 100px;
   max-height: 100px;
   overflow-y: scroll;
}
.item {
   padding: 0 10px;
   cursor: pointer;
   user-select: none;
   display: flex;
   justify-content: space-between;
   align-items: center;
   scrollbar-color: #53b374 #fff;
   scrollbar-width: thin;

   &__procent {
      color: #53B374FF;
      font-weight: 500;
   }
   &:hover {
      background-color: #53b374;
      color: #fff;
      & .item__procent {
         color: #fff;
      }
   }
}
.selectHide {
   display: none;
}

</style>