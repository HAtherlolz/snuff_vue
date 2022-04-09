<template>
  <Header />
  <div class="container">
      <div class="">
        <div class="test">
            <img :src="profile.avatar" alt="">
            <p>{{profile.bio}}</p>
            <p>{{profile.city}}</p>
            <p>{{profile.country}}</p>
            <p>{{profile.display_name}}</p>
        </div>
      </div>
      <a href="#" @click="goTo()">Edit profile</a>
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
  name: "Profile",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()
    const router = useRouter()
    const profile = ref([])

    const getProfileInfo = async () => {

           await axios.get(
             `${store.getters.getServerUrl}/auth/me/`, {
             headers: {
               Authorization: 'Bearer ' + localStorage.getItem('token')
             }
            }
           ).then(response => profile.value = response.data)
           console.log(profile.value)
    }

    const goTo = () => {
        router.push({ name: 'ProfileUpdate'})
    }

    onMounted(getProfileInfo)

    return {
      getProfileInfo,
      profile,
      goTo
    }
  }
}
</script>
