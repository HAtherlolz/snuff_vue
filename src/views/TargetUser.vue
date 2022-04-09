<template>
  <Header />
  <div class="container">
      <p>Hello World</p>
      <div class="test">
        <img :src="users.avatar" alt="">
        <p>{{users.bio}}</p>
        <p>{{users.city}}</p>
        <p>{{users.country}}</p>
        <p>{{users.display_name}}</p>
        <div class="test1" :key="id" v-for="(s, id) in users.social_links">
          <p>{{s.link}}</p>
        </div>
      </div>
  </div>
  <Footer />
</template>

<script>

import Header from "../components/Header"
import Footer from "../components/Footer"

import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'


export default {
  name: "TargetUser",
  props: ['id'],
  components: {
    Header,
    Footer,
  },

  setup(props) {

    const store = useStore()
    const users = ref([])
    const getAllTargetUser = async () => {
           await axios.get(
             `${store.getters.getServerUrl}/auth/author/${props.id}`
           ).then(response => users.value = response.data)
    }

    onMounted(getAllTargetUser)

    return {
      users,
    }

  }
}
</script>
