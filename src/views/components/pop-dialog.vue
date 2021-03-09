<template>
  <transition name="fade">
    <div v-if="show" class="pop-dialog" @click.self="$emit('close')">
      <div class="inner">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "pop-dialog",
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  emits: ['close'],
}
</script>

<style scoped lang="scss">
$duration: .15s;
.pop-dialog{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000;
  display: flex;
  transition: all $duration ease-out;
  opacity: 1;
  background: rgba(0, 0, 0, .6);
  &.fade-enter-from, &.fade-leave-to{
    opacity: 0;
    >.inner{
      transform: scale(.5);
    }
  }
  &.fade-enter-to, &.fade-leave-from{
    opacity: 1;
    >.inner{
      transform: scale(1);
    }
  }
  >.inner{
    margin: auto;
    max-height: 90%;
    max-width: 90%;
    border-radius: .3rem;
    transition: all $duration cubic-bezier(0.32, 0.18, 0.45, 1.74);
    background: white;
    padding: 1rem;
  }
}
</style>