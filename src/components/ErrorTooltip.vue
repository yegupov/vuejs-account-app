<template lang="pug">
  .error-tooltip {{errorText}}
</template>

<script>
export default {
  props: {
    errorText: {
      type: String,
      default: "Ошибка"
    }
  }
};
</script>

<style lang="scss" scoped>
.error-tooltip {
  z-index: 100;
  color: #ff5959;
  background-color: #fff;
  padding: 1px 4px;
  font-size: 12px;
  white-space: nowrap;
  width: auto;
}
</style>
