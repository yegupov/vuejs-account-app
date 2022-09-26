<template lang="pug">
  .content
    aside.aside
      h1 My account
      .card
        .card__img
          img(:src="`./img/${loggedUser.avatar}`" alt="User avatar")
        .card__desc
          p
            b {{loggedUser.status}}
          p Email: {{loggedUser.email}}
    article.article
      h2 Users list
      ul.table.users-list
        li.table__row
          .users-list__id ID
          .users-list__status Status
          .users-list__image Avatar
          .users-list__email Email
          .users-list__actions Actions
        li.table__row(v-for="user in allUsers" :key="user.id")
          .users-list__id(data-label="ID") {{user.id}}
          .users-list__status(data-label="Status")
            span {{user.status}}
          .users-list__image(data-label="Avatar")
            img(v-if="user.avatar && user.avatar != '[object File]'" :src="`./img/${user.avatar}`" alt="User avatar")
            svg-icon(v-else icon-name="user")
          .users-list__email(data-label="Email") {{user.email}}
          .users-list__actions(data-label="Actions")
            button(type='button' disabled="disabled" title="Править").square-btn
              svg-icon(icon-name="edit")
            button(type='button' disabled="disabled" title="Удалить").square-btn
              svg-icon(icon-name="garbage")
</template>

<script>

import { mapActions, mapGetters } from "vuex"

export default {
  name: 'Home',

  components: {
    SvgIcon: () => import("@/components/SvgIcon")
  },

  created() {
    this.fetchUsers();
  },

  computed: {
    ...mapGetters("users", ["allUsers"]),
    ...mapGetters("users", ["loggedUser"])
  },

  methods: {
    ...mapActions("users", ["fetchUsers"])
  }
}
</script>

<style lang="scss" scoped>

$lines-color: #d9dee4;

.content, .table, .table__row, .users-list {
  display: flex;
  justify-content: space-between;
}

.content {
  padding: 30px 5%;

  @media (max-width: 768px) {
    flex-direction: column;
  }

  .aside {
    width: 30%;
    padding-right: 60px;

    @media (max-width: 768px) {
      width: 100%;
    }
  }

  .article {
    width: 70%;

    @media (max-width: 768px) {
      width: 100%;
    }
  }
}

.card {
  max-width: 210px;
  padding: 30px;
  background: #f6f6f6;

  .card__img {

    img {
      margin: 0 auto;
    }
  }

  .card__desc {
    p::first-letter {
      text-transform: capitalize;
    }
  }
}

.users-list {
  width: 80%;
  max-width: 580px;
  margin: 30px 0;

  @media (max-width: 768px) {
    width: 100%;
  }

  .users-list__id {
    width: 10%;

    @media (max-width: 567px) {
      border-top: 1px solid $lines-color;
    }
  }

  .users-list__status {
    width: 15%;
  }

  .users-list__image {
    width: 10%;

    img {
      margin: 0 auto;
      width: 42px;
      height: 42px;
      border-radius: 50%;
    }

    .svg-icon {
      display: block;
      margin: 0 auto;
      width: 38px;
      height: 38px;
      fill: #a8a8a8;
    }
  }

  .users-list__email {
    width: 45%;
  }

  .users-list__actions {
    width: 20%;
    text-align: center;

    button {
      margin: 0 3px;
    }
  }
}

.table {
  flex-direction: column;
  border: 1px solid $lines-color;
  text-align: center;

  @media (max-width: 567px) {
    text-align: left;
    border: none;
  }

  .table__row {
    align-items: center;
    background-color: #fff;
    border-bottom: 1px solid $lines-color;

    @media (max-width: 567px) {
      flex-direction: column;
      border-bottom: none;

      &:after {
        content: '';
        display: table;
        height: 40px;
      }
    }

    & > div {
      height: 62px;
      line-height: 61px;
      border-right: 1px solid $lines-color;

      @media (max-width: 567px) {
        width: 100%;
        padding: 0 5%;
        border-bottom: 1px solid $lines-color;
        border-left: 1px solid $lines-color;
        border-right: 1px solid $lines-color;
        text-align: left;

        &:before {
          content: attr(data-label);
          float: left;
          width: 80px;
          margin-right: 2%;
          border-right: 1px solid $lines-color;
          font-weight: bold;
        }
      }

      &:last-child {
        border-right: none;

        @media (max-width: 567px) {
          border-right: 1px solid $lines-color;
        }
      }

      img {
        display: inline-block;
        vertical-align: middle;
      }
    }

    &:first-child {
      font-weight: bold;

      @media (max-width: 567px) {
        display: none;
      }
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.square-btn {
  display: inline-block;
  padding: 6px 8px;
}
</style>
