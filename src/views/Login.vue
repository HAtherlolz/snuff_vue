<template lang="html">
  <Header />
  <div class="container">
    <form class="login" action="index.html" method="post">
      <label for="login">login</label>
     <input class="input_text" type="text" id="login" required v-model="login">
     <label for="password">password</label>
     <input class="input_text" type="text" id="password" required v-model="password">
     <div class="input_btn">
       <button type="button" name="button" @click="postLogin()">Log in</button>
     </div>
    </form>
  </div>
  <Footer />
</template>

<script>

import Header from "../components/Header"
import Footer from "../components/Footer"

import axios from 'axios'
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {

  name: "Login",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()

    const login = ref('')
    const password = ref('')
    const res = ref('')

    const postLogin = async () => {
      const data = {
        "email": login.value,
        "password": password.value
      }
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      }
      // post login and password to get jwt access token in response
      await axios.post(
      `${store.getters.getServerUrl}/auth/jwt/create/`,
        data, config
      ).then(response => res.value = response.data)
    console.log(res.value.access)

      // Add jwt token to localStorage
      localStorage.setItem('token', res.value.access)
      const token = localStorage.getItem('token')
      console.log('Token:', token)
    }

    return {
      login,
      password,
      res,
      postLogin
    }

  }

}
</script>

<style lang="css" scoped>
</style>
