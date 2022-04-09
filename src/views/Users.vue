<template>
  <Header />
  <div class="container">
      <p>Hello World</p>
      <div class="test" :key="id" v-for="(u, id) in users">
        <img :src="u.avatar" alt="">
        <p>{{u.id}}</p>
        <p>{{u.bio}}</p>
        <p>{{u.city}}</p>
        <p>{{u.country}}</p>
        <p>
          <a href="#" @click="goTo(u.id)" class="editContent">{{u.display_name}}</a>
        </p>
        <div class="test1" :key="id" v-for="(s, id) in u.social_links">
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
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
  name: "Users",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()
    const router = useRouter()
    const users = ref([])

    const getAllTracksList = async () => {
           await axios.get(
             `${store.getters.getServerUrl}/auth/author/`
           ).then(response => users.value = response.data)
           console.log(users.value)
    }

    const goTo = (id) => {
        router.push({ name: 'TargetUser', params: {id: id} })
        console.log(id)
    }

    onMounted(getAllTracksList)

    return {
      getAllTracksList,
      users,
      goTo
    }

  }
}
</script>
