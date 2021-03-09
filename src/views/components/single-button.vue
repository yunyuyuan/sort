<template>
  <div @click="handleClick" class="single-button" :class="{disabled: disabled}" :style="calcStyle" :type="type">
    <span v-if="$slots.default"><slot></slot></span>
  </div>
</template>

<script>
export default {
  name: "single-button",
  props: {
    size: {
      type: Number,
      default: 0.9
    },
    type: {
      type: String,
      default: 'none'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  computed: {
    calcStyle (){
      return {
        fontSize: this.size+'rem'
      }
    },
  },
  methods: {
    handleClick (e){
      if (!this.disabled) {
        this.$emit('click', e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.single-button{
  border-radius: .15rem;
  cursor: pointer;
  box-shadow: 0 0 .3rem rgba(0, 0, 0, .3);
  transition: all .15s linear;
  border: 1px solid;
  display: inline-block;
  vertical-align: center;
  margin: .5rem;
  &.disabled{
    cursor: not-allowed;
    background: gray !important;
    border-color: gray !important;
    color: white !important;
  }
  &[type=none]{
    background: #fcfcfc;
    color: black;
    border-color: #a7a7a7;
  }
  &[type=primary]{
    background: #395bff;
    color: white;
    border-color: #314ee0;
  }
  &[type=danger]{
    background: #ff3950;
    color: white;
    border-color: #dc3348;
  }
  &[type=warn]{
    background: #ff7839;
    color: white;
    border-color: #d2612b;
  }
  >span{
    margin: .3em 1em;
    display: inline-block;
  }
}
</style>