<template>
  <b-row>
    <b-col cols="12">
      <button v-if="logged_in" class="form__submit" @click.stop="logout()">
        Logout
      </button>
      <div class="login form" v-if="registered">

        <div class="form__row">
          <label for="log-name" class="form__label">Login</label>
          <input type="text" class="form__field" v-model="log_data.log_name" id="log-name">
        </div>

        <div class="form__row">
          <label for="log-pass" class="form__label">Password</label>
          <input type="password" class="form__field" v-model="log_data.log_pass" id="log-pass">
        </div>

        <button class="form__submit" @click.stop="login()">
          Login
        </button>
        <span @click.stop="registered=0">or register</span>

      </div>
      <div class="register form" v-else>

        <div class="form__row">
          <label for="reg-name" class="form__label">Login</label>
          <input type="text" class="form__field" v-model="reg_data.name" id="reg-name">
        </div>

        <div class="form__row">
          <label for="reg-pass" class="form__label">Password</label>
          <input type="password" class="form__field" v-model="reg_data.pass" id="reg-pass">
        </div>

        <div class="form__row">
          <label for="reg-email" class="form__label">Email</label>
          <input type="email" class="form__field" v-model="reg_data.email" id="reg-email">
        </div>

        <button class="form__submit" @click.stop="createUser()">
          Register
        </button>
        <span @click.stop="registered=1">or login</span>

      </div>
      <h2>
        Room List
        <b-link href="#/add-room">(Add Room)</b-link>
      </h2>
      <b-table striped hover :items="rooms" :fields="fields">
        <template slot="actions" scope="row">
          <b-btn size="sm" @click.stop="join(row.item._id)">Join</b-btn>
        </template>
      </b-table>
      <ul v-if="errors && errors.length">
        <li v-for="error of errors">
          {{error.message}}
        </li>
      </ul>
    </b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
  name: 'RoomList',
  data () {

    return {
      fields: {
        room_name: { label: 'Room Name', sortable: true, 'class': 'text-center' },
        created_date: { label: 'Created Date', sortable: true },
        actions: { label: 'Action', 'class': 'text-center' }
      },
      log_data: {},
      reg_data: {},
      registered: 1,
      logged_in: 0,
      rooms: [],
      errors: []
    }
  },

  created () {
    axios.get(`http://localhost:3000/api/room`)
    .then(response => {
      this.rooms = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  },

  methods: {
    join (id) {
      this.$router.push({
        name: 'JoinRoom',
        params: { id: id }
      })
    },

    login () {

      axios.post("http://localhost:3000/api/auth/login", {
        auth_data: this.log_data
      })
        .then((response) => {
          this.logged_in = 1
          console.log(response);
          console.log('logged in!');
        })
        .catch((errors) => {
          console.log(errors);
          console.log("Cannot log in")
        })
    },

    logout () {
      axios.post("http://localhost:3000/api/auth/logout", {})
        .then((response) => {
          this.logged_in = 0;
          console.log('logged out');
        })
        .catch((errors) => {
          console.log(errors);
          console.log("Cannot log in")
        })
    },

    createUser () {
      console.log('create_user');

      axios.post(`http://localhost:3000/api/user`, this.reg_data)
        .then(response => {

          console.log(response);
          this.$router.push({
            name: 'RoomList'
          })
        })
        .catch(e => {
          this.errors.push(e)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  input {
    display: block;
  }
</style>
