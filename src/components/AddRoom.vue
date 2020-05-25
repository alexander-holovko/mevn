<template>
  <b-row>
    <b-col align-self="start">&nbsp;</b-col>
    <b-col cols="6" align-self="center">
      <h2>
        Add Room
        <b-link href="#/">(Room List)</b-link>
      </h2>
      <b-form @submit="onSubmit" class="form">
        <div class="form__row">
          <label for="room_type">Room name</label>
          <input class="form__row" type="text" id="room_name" v-model.trim="room.room_name">
        </div>
        <div class="form__row">
          <label for="room_type">Anonymous?</label>
          <input id="room_type" type="checkbox" class="form__row" v-model.trim="room.room_anonymous">
        </div>
        <b-button type="submit" variant="primary">Add</b-button>
      </b-form>
    </b-col>
    <b-col align-self="end">&nbsp;</b-col>
  </b-row>
</template>

<script>

import axios from 'axios'
axios.defaults.withCredentials = true;

export default {
  name: 'AddRoom',
  data () {
    return {
      room: {}
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      axios.post(`http://localhost:3000/api/room`, {
        room_info: this.room
      })
      .then(response => {
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

  .form {
    max-width: 300px;
    margin: 40px auto;
    background-color: #ffffff;
    border: 1px solid #dadada;
    padding: 30px;

    > span {
      text-decoration: underline;
      cursor: pointer;
    }

    &__row {
      display: flex;
      flex-direction: row-reverse;
      align-items: center;
      justify-content: flex-end;
      margin-bottom: 10px;
      input {
        margin-right: 10px;
      }

      &:nth-child(1) {
        flex-direction: column;
        align-items: flex-start;
      }
    }

    &__submit {
      cursor: pointer;
    }
  }
</style>
