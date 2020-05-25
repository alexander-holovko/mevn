<template>
  <div class="admin-page">
    <h1>Адмін-панель</h1>
    <button @click="getStatistics()">
      Отримати статистику
    </button>

    <div class="users">
      <ul class="users__list">
        <li class="user">
          <div class="user__name">Ім'я</div>
          <div class="user__email">email</div>
          <div class="user__role">
            Експерт?
          </div>
          <div class="user__promote">Зробити експертом</div>
        </li>
        <li class="user" v-for="user in users">
          <div class="user__name">{{user.name}}</div>
          <div class="user__email">{{user.email}}</div>
          <div class="user__role">
            <span v-if="user.expert">Експерт</span>
            <span v-else>Користувач</span>
          </div>
          <button class="user__promote" v-if="!user.expert" @click="promoteUser(user._id)">Зробити експертом</button>
          <button class="user__promote" @click="unPromoteUser(user._id)" v-else>Зробити користувачем</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  axios.defaults.withCredentials = true;

  export default {
    name: 'Admin',
    data () {

      return {
        data: {},
        users: {},
      }
    },

    created () {
      axios.get(`http://localhost:3000/api/admin`)
        .then(response => {
          console.log(response);

          this.users = response.data.users
        })
        .catch(e => {
          this.errors.push(e)
        })
    },

    methods: {
      getStatistics() {

      },

      promoteUser(id) {
        axios.post("http://localhost:3000/api/user/promote", {
          id: id
        })
          .then((response) => {

            for(let index in this.users) {

              let user = this.users[index];

              if(user._id === response.data._id) {
                user.expert = true;
              }
            }

            console.log(response);
          })
          .catch((errors) => {
            console.log(errors);
          })
      },

      unPromoteUser(id) {
        axios.post("http://localhost:3000/api/user/unPromote", {
          id: id
        })
          .then((response) => {

            for(let index in this.users) {

              let user = this.users[index];

              if(user._id === response.data._id) {
                user.expert = false;
              }
            }

            console.log(response);
          })
          .catch((errors) => {
            console.log(errors);
          })
      }
    }
  }
</script>

<style scoped lang="scss">
  .users {

    &__list {
      max-width: 800px;
      margin: 0 auto;

      .user {
        display: flex;
        list-style-type: none;
        margin-top: 10px;

        &__name {
          width: 20%;
        }

        &__email {
          width: 30%;
        }

        &__role {
          width: 20%;
        }

        &__promote {
          width: 30%;
        }

        * {
          margin-right: 10px;
        }
      }
    }
  }
</style>
