<template lang="pug">
  .modal
    .modal__body
      h3.modal__headline Authorization
      form#login_form.login-form(@submit.prevent="login")
        .form-group(:class='{"form-group_focused": checkValueEmail, "error": validation.firstError("user.email")}')
          label.form-label(for='email') Email
          input#email.form-control(
            type='email'
            name='email'
            v-model="user.email"
            @focus="moveLabel('focus', $event)"
            @blur="moveLabel('blur', $event)"
          )
          .form-group__error
            error-tooltip( :errorText="validation.firstError('user.email')" )
        .form-group(:class='{"form-group_focused": checkValuePass, "error": validation.firstError("user.password")}')
          label.form-label(for='password') Password
          input#password.form-control(
            type='password'
            name='password'
            v-model="user.password"
            @focus="moveLabel('focus', $event)"
            @blur="moveLabel('blur', $event)"
          )
          .form-group__error
            error-tooltip( :errorText="validation.firstError('user.password')" )
        .form-group.form-footer
          button(type='submit' :disabled="disableSubmit").btn.primary-btn Sign in
    .modal__overlay
</template>

<script>
import axios from "axios";
import { Validator } from 'simple-vue-validator';
import { mapActions, mapMutations } from "vuex";

export default {
  mixins: [require('simple-vue-validator').mixin],

  data() {
    return {
      disableSubmit: false,
      user: {
        email: "",
        password: ""
      },
      checkValueEmail: false,
      checkValuePass: false
    }
  },

  components: {
    ErrorTooltip: () => import('@/components/ErrorTooltip.vue')
  },

  validators: {
    'user.email': (value) => {
      return Validator.value(value)
        .required('Enter Email')
        .email('Email entered incorrectly!')
    },
    'user.password': (value) => {
      return Validator.value(value).required('Enter Password')
    }
  },

  methods: {
    ...mapActions("users", ["setLoggedUser"]),
    ...mapMutations("tooltip", ["SHOW_TOOLTIP"]),

    moveLabel: function (typeEvent, event) {
      let target = event.target

      if (typeEvent == 'focus' && !target.value.trim().length) { // zero-length string AFTER a trim
        target.id == 'email' ? this.checkValueEmail = true : this.checkValuePass = true
      }
      if (typeEvent == 'blur' && !target.value.trim().length) {
        target.id == 'email' ? this.checkValueEmail = false : this.checkValuePass = false
      }
    },

    async login() {
      if ((await this.$validate()) === false) return;
      this.disableSubmit = true;

      try {
        const response = await axios.get(`http://localhost:3000/users?email=${this.user.email}&password=${this.user.password}`);

        if (response.data.length) {
          this.setLoggedUser(response.data[0]);

          this["SHOW_TOOLTIP"]({
            type: "success",
            text: "Welcome to your account!"
          });

          console.log('Logged user : ', response.data[0]);

          this.validation.reset();
          this.$router.replace("/");

        } else {
          this["SHOW_TOOLTIP"]({
            type: "error",
            text: "The email address or password is incorrect!"
          });
        }

      } catch (error) {
        this["SHOW_TOOLTIP"]({
          type: "error",
          text: "Connect the backend!"
        });
      } finally {
        this.disableSubmit = false;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.modal {
  position: fixed;
  z-index: 9997;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;

  .modal__body {
    position: relative;
    z-index: 9999;
    width: 60%;
    max-width: 570px;
    min-width: 280px;
    height: auto;
    margin: 0;
    padding: 30px 8%;
    background-color: #fff;

    @media (max-width: 567px) {
      width: 86%;
    }

    .modal__headline {
      text-align: center;
      font-size: 28px;
      font-weight: 400;
      margin-bottom: 40px;
    }
  }

  .modal__overlay {
    position: fixed;
    z-index: 9998;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(40,52,65,1);
  }
}

.form-group {
  position: relative;
  height: 45px;
  margin: 0 0 25px;
  text-align: center;

  .form-label {
    position: absolute;
    display: inline-block;
    left: 15px; top: -9px;
    width: auto;
    height: 15px;
    transform: translate(0px, 1px);
    transform-origin: 0 0;
    white-space: nowrap;
    will-change: transform;
    transition: transform .5s;
    font-size: 13px;
    color: #666;
    padding: 0 4px;
    background-color: #fff;
    cursor: text;
    z-index: 10;
  }

  .form-control {
    position: absolute;
    left: 0; top: 0; bottom: 3px; right: 0;
    width: 100%;
    padding: 15px;
    background-color: #fff;
    outline: none;
    z-index: 1;
  }

  .btn {
    margin: 0 auto;
  }

  &.form-group_focused {
    .form-label {transform: translate(0px, -11px);
    }

    .form-control {
      border: 1px solid rgba(205,221,214,1);
    }
  }
}
</style>
