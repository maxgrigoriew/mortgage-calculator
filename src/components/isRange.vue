<template>
   <div>
      <div class="slider-component">
         <div class="slidecontainer">
            <input
                ref="input"
                v-model="currentValue"
                type="range"
                :min="min"
                :max="max"
                class="slider"
                @input="onInput"
            >
            <div class="line">
            </div>
         </div>
      </div>
   </div>
</template>

<script>
export default {
   props: {
      value: {
         type: Number,
         required: true
      },
      min: {
         type: Number,
         required: true
      },
      max: {
         type: Number,
         required: true
      }
   },
   data(){
      return {
         currentValue: this.value
      };
   },
   methods: {
      onInput() {
         // this.currentValue is a string because HTML is weird
         this.$emit('input', parseInt(this.currentValue));
      }
   }
};
</script>

<style scoped>
.line {
   position: absolute;
   height: 4px;
   background: #000;
   top: -8px;
   z-index: 1;
}
.slider-component .slidecontainer, .line {
   width: 100%;
   position: relative;
}

.slider-component .slidecontainer .slider {
   -webkit-appearance: none;
   appearance: none;
   width: 100%;
   height: 4px;
   border-radius: 2px;
   background: #c2c2c2;
   outline: none;
   opacity: 0.7;
   -webkit-transition: .2s;
   transition: opacity .2s;
}

.slider-component .slidecontainer .slider:hover {
   opacity: 1;
}

.slider-component .slidecontainer .slider::-webkit-slider-thumb {
   -webkit-appearance: none;
   appearance: none;
   width: 18px;
   height: 18px;
   background: #D8A22E;
   cursor: pointer;
   border-radius: 50%;
   position: absolute;
   z-index: 110;
   display: none;
}

.slider-component .slidecontainer .slider::-moz-range-thumb {
   width: 18px;
   height: 18px;
   background: #D8A22E;
   cursor: pointer;
   border-radius: 50%;
   position: absolute;
   z-index: 110;
   display: none;
}
</style>