<template>
      <label class="switch">
         <input type="checkbox"
                ref="checkbox"
                @change="$emit('input', $event.target.checked)"
         />
         <div class="slider round"></div>
      </label>
</template>

<script>
export default {
   name: 'isCheckbox',
}
</script>

<style scoped lang="scss">
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