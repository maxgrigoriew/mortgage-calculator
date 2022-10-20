<template>
   <div class="v-select"
        :class="{active : arrVisible}"
   >
      <p class="v-select__title"
         @click="changearrVisible"
      
      >
         {{ optionName }}
      </p>
      <div class="options"
      
           v-show="arrVisible"
      >
         <div>
            <div v-for="option in options"
                 :key="option.value"
                 class="option"
                 @click="optionSelected(option)"
            >
               {{ option.name }}
            </div>
         </div>
      </div>
   
   </div>
</template>

<script>
export default {
   name: "isSelect",
   props: {
      options: {
         type: Array,
         default() {
            return []
         }
      },
      optionName: {
         type: String,
         default: 'Выберите цель кредита'
      }
   },
   data() {
      return {
         arrVisible: false,
      }
   },
   watch: {
      // optionName(n, o) {
      //    this.optionName = n
      // }
   },
   methods: {
      changearrVisible() {
         console.log('click')
         if (this.arrVisible === true) {
            this.arrVisible = false
            this.hideSelect(false)
         } else {
            this.arrVisible = true
            this.hideSelect(true)
         }
      },
      optionSelected(option) {
         this.$emit('optionSelected', option)
         this.arrVisible = false
      },
      hideSelect(boolean) {
         this.arrVisible = boolean
      },
   },
   mounted() {
      document.addEventListener('click', () => this.arrVisible = false, true)
   },
   beforeDestroy() {
      document.addEventListener('click', this.hideSelect)
   }
}
</script>

<style scoped>
.v-select {
   border: 1px solid #53b374;
   width: 200px;
   position: relative;
   border-radius: 10px;
   box-sizing: border-box;
}
.v-select.active {
   border-bottom-left-radius: 0;
   border-bottom-right-radius: 0;
}
.options {
   position: absolute;
   width: 100%;
   z-index: 10;
   background: #fff;
   top: 40px;
   
   border-bottom-left-radius: 10px;
   border-bottom-right-radius: 10px;
   box-sizing: border-box;
}
.options.active {
   border-bottom-left-radius: 10px;
   border-bottom-right-radius: 10px;
}
.option, .v-select__title {
   padding: 10px;
   cursor: pointer;
   user-select: none;
   margin: 0;
   box-sizing: border-box;
   border: 1px solid #53b374;
}

.option:hover {
   background: #53b374;
   color: #fff;
}
/*.option:last-child {*/
/*   border-bottom-left-radius: 10px;*/
/*   border-bottom-right-radius: 10px;*/
/*}*/
</style>