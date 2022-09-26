<template lang="pug">
  #sheet
    header-bar(v-if="loggedUser !== null" :loggedUser = "loggedUser")
    main.main
      router-view
    footer.footer
      p Developed &nbsp;
        a(href="https://yegupov.github.io/en/" target="_blank") Gennady Yegupov
        a(href="https://github.com/yegupov/vuejs-account-app" target="_blank" title="ACCOUNTS APP") GitHub repo
    tooltip
</template>

<script>
import { mapGetters } from "vuex"

export default {
  name: 'App',
  components: {
    HeaderBar: () => import("./components/HeaderBar"),
    Tooltip: () => import("./components/Tooltip")
  },

  computed: {
    ...mapGetters("users", ["loggedUser"])
  }
}
</script>

<style lang="scss">

$font-family: 'Inter';
$font-color: #414141;
$lines-color: #d9dee4;

@font-face {
  font-family: 'Inter';
  src: local('Inter Regular'), local('Inter-Regular'),
      url('/fonts/Inter-Regular.woff2') format('woff2'),
      url('/fonts/Inter-Regular.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

@font-face {
  font-family: 'Inter';
  src: local('/fonts/Inter Bold'), local('Inter-Bold'),
      url('/fonts/Inter-Bold.woff2') format('woff2'),
      url('/fonts/Inter-Bold.woff') format('woff');
  font-weight: bold;
  font-style: normal;
}

html {
  box-sizing: border-box;
  font-size: 14px;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  width: 100%;
  margin: 0;
  font-size: 1rem;
  font-family: $font-family;
  font-weight: 400;
  line-height: 1.3;
  color: $font-color;
  background-color: #fff;
}

b, strong {
  font-weight: bold;
}

h1, h2 {
  font-size: 3rem;
  font-weight: normal;
  letter-spacing: -0.08rem;

  @media (max-width: 1280px) {
    font-size: 2.6rem;
  }

  @media (max-width: 992px) {
    font-size: 2rem;
  }
}

.color-red {
  color: #ff5959;
}

ul {
  margin: 0;
  padding: 0;
  list-style: none;
}

input[type='text'],
input[type='email'],
input[type='tel'],
input[type='password'],
input[type='search'],
textarea {
  margin: 0;
  border: 1px solid $lines-color;
  background-color: transparent;
  appearance: none;
  font-family: $font-family;
  font-size: 1rem;
  &::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: lighten(gray, 20%);
    font-family: $font-family;
  }
  &::-moz-placeholder { /* Firefox 19+ */
    color: lighten(gray, 20%);
    font-family: $font-family;
  }
  &:-ms-input-placeholder { /* IE 10+ */
    color: lighten(gray, 20%);
    font-family: $font-family;
  }
  &:-moz-placeholder { /* Firefox 18- */
    color: lighten(gray, 20%);
    font-family: $font-family;
  }
}

button {
  appearance: none; /*  Turn off standard styling  */
  border: none;
  cursor: pointer;
}

button:disabled,
button[disabled] {
  background-color: #f1f1f1;
  color: #c9c9c9;
  cursor: not-allowed;

  &:hover {
    background-color: #dedede;
    color: #c9c9c9;
  }

  .svg-icon {
    fill: #c2c2c2;
  }
}

.btn {
  display: inline-block;
  font-size: 18px;
  padding: 12px 35px;
  border: none;
  color: #fefefe;
  background-color: rgba(100,100,100,0.3);
  outline: none;
  cursor: pointer;
}

.btn:hover {
  background-color: rgba(100,100,100,0.5);
}

.square-btn {
  display: inline-block;
  vertical-align: middle;
  font-size: 1rem;
  width: 30px;
  height: 30px;
  color: #424242;
  border: none;
  border-radius: 3px;
  background-color: rgba(100,100,100,0.2);
  outline: none;
  cursor: pointer;
  span {
    display: inline-block;
    vertical-align: top;
  }
  .svg-icon {
    margin-top: 3px;
  }
}

.primary-btn {
  background-color: #44af5b;

  &:hover, &:focus {
    background-color: #318744;
  }
}

img {
  display: block;
  max-width: 100%;
  max-height: 100%;
  user-select: none;
  -webkit-user-drag: none;
}

#sheet {
  position: relative;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.main {
  padding-bottom: 127px;
}

.footer {
  position: absolute;
  left: 0; bottom: 0;
  width: 100%;
  height: 127px;
  padding: 40px 5%;
  background: #f6f6f6;
  text-align: center;

  @media (max-width: 375px) {
    padding: 20px 5% 0;
  }

  a + a {
    margin-left: 40px;

    @media (max-width: 375px) {
      display: block;
      margin: 20px 0 0 0;
    }
  }
}

.form-group__error {
  display: none;
  position: absolute;
  right: 5%;
  top: -8px;
  z-index: 100;
}

.form-group.error, .table-row.error {
  .form-group__error {
    display: inline-block !important;
  }

  input, textarea, .form-control {
    border-color: #ff8d8d !important;
  }
}

.messages__error {
  display: block;

  & .error-tooltip {
    display: inline-block;
    margin: 0 20px 10px 0;
    padding: 0 !important;
  }
}
</style>
