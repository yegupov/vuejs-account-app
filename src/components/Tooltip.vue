<template lang="pug">
  .query-tooltip(
    v-if="show"
    :class="{'success': type === 'success', 'error': type === 'error'}"
  )
    span.query-tooltip__text {{text}}
    button(
      type="button"
      @click="CLOSE_TOOLTIP"
    ).btn.query-tooltip__close
      svg-icon(icon-name="multiply")

  .query-tooltip(v-else)
    span.query-tooltip__text {{text}}
    button(
      type="button"
      @click="CLOSE_TOOLTIP"
    ).btn.query-tooltip__close
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      timeout: 5000
    }
  },

  components: {
    SvgIcon: () => import("@/components/SvgIcon")
  },

  computed: {
    ...mapState("tooltip", {
      show: state => state.show,
      type: state => state.type,
      text: state => state.text
    })
  },

  methods: {
    ...mapMutations("tooltip", ["CLOSE_TOOLTIP"])
  },

  updated() {
    setTimeout(this["CLOSE_TOOLTIP"], this.timeout);
  }
};

</script>

<style lang="scss" scoped>

.query-tooltip {
  position: fixed;
  z-index: 10000;
  width: auto;
  height: auto;
  bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 20px 55px 20px 30px;
  transition: all 0.7s ease;
}

.query-tooltip__text {
  color: #fff;
}

.query-tooltip__close {
  position: absolute;
  top: 19px;
  right: 20px;
  width: 15px;
  height: 15px;
  padding: 0;
  // margin: 0 0 0 35px;
  background: transparent;
  cursor: pointer;

  .svg-icon {
    fill: #fff;
  }
}

.query-tooltip.success {
  transform: translateX(-50%) translateY(-100px);
  background-color: #4bb133;
}

.query-tooltip.warning {
  transform: translateX(-50%) translateY(-100px);
  background-color: #b18333;
}

.query-tooltip.error {
  transform: translateX(-50%) translateY(-100px);
  background-color: #b13333;
}

</style>
