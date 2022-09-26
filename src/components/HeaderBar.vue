<template lang="pug">
  header.header
    .header__items
      .header__items.logo ACCOUNTS APP
      .header__items.date {{localeDate}}
    .header__nav
      .user-profile
        .user-profile__avatar
          img(
            :src="`./img/${loggedUser.avatar}`"
            alt="User avatar")
        .user-profile__text {{loggedUser.email}}
      a.logout(href="#" @click.prevent="goOut") Logout
</template>

<script>

import { mapActions } from "vuex"

export default {
  name: 'Header',

  props: {
    loggedUser: {
      type: Object,
      default: () => ({}),
      required: true
    }
  },

  components: {
    SvgIcon: () => import("@/components/SvgIcon")
  },

  data: () => ({
    date: new Date()
  }),

  computed: {
    localeDate() {
      return (new Date(this.date)).toLocaleDateString()
    }
  },

  methods: {
    ...mapActions("users", ["logout"]),

    goOut() {
      this.logout();
      this.$router.replace("/login");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

$lines-color: #d9dee4;

.header, .header__nav, .user-profile {
  display: flex;
  justify-content: space-between;
}

.header {
  align-items: center;
  padding: 0 5%;
  height: 60px;
  background-color: #ededed;
  border-bottom: 1px solid $lines-color;

  .header__items {
    margin-right: auto;

    & > div {
      float: left;
      margin-right: 25px;
    }

    &.logo {
      font-size: 1.2rem;
      font-weight: bold;
    }

    &.date {
      font-weight: bold;

      @media (max-width: 567px) {
        display: none;
      }
    }
  }

  .header__nav {
    align-items: center;
    margin-left: auto;
  }
}

.user-profile {
  align-items: center;
  padding: 0;

  .user-profile__avatar img {
    width: 50px;
    border-radius: 50%;
    margin-right: 5px;
  }

  .user-profile__text {
    @media (max-width: 480px) {
      display: none;
    }
  }
}

.logout {
  margin-left: 30px;

  @media (max-width: 480px) {
    margin-left: 5px;
  }
}
</style>
