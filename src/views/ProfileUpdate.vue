<template lang="html">
  <Header/>
  <div class="">
  </div>
  <div class="container">
    <form class="profile" action="index.html" method="post">
     <label for="avatar">avatar</label>
     <input class="input_text" type="file" id="avatar" name="avatar" required v-on:change="fileSend">

     <label for="bio">bio</label>
     <input class="input_text" type="text" id="bio" v-model="bio">

     <label for="city">city</label>
     <input class="input_text" type="text" id="city" v-model="city" >

     <label for="password">country</label>
     <input class="input_text" type="text" id="country" v-model="country">

     <label for="password">display_name</label>
     <input class="input_text" type="text" id="display_name" v-model="display_name">

     <div class="input_btn">
       <button type="button" name="button" @click="updateProfileInfo()">Update my Profile</button>
     </div>

    </form>
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
  name: "ProfileUpdate",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()
    const avatar = ref('')
    const bio = ref('')
    const country = ref('')
    const city = ref('')
    const display_name = ref('')

    const profile = ref([])

    const getProfileInfo = async () => {

           await axios.get(
             `${store.getters.getServerUrl}/auth/me/`, {
             headers: {
               Authorization: 'Bearer ' + localStorage.getItem('token')
             }
            }
           ).then(response => profile.value = response.data)
           console.log(profile.value['avatar'])
           bio.value = profile.value['bio']
           country.value = profile.value['country']
           city.value = profile.value['city']
           display_name.value = profile.value['display_name']
    }

    const fileSend = (event) => {
      avatar.value = event.target.files[0]
      console.log(avatar.value)
    }

    const updateProfileInfo = async () => {
      const formData = new FormData();
      formData.append("bio", bio.value)
      formData.append("country", country.value)
      formData.append("city", city.value)
      formData.append("avatar", avatar.value)
      formData.append("display_name", display_name.value)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=something',
           Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }

       await axios.put(
         `${store.getters.getServerUrl}/auth/me/`,
         formData,
         config
       )
    }

    onMounted(getProfileInfo)
    return {
      getProfileInfo,
      profile,
      fileSend,
      updateProfileInfo,
      bio,
      country,
      city,
      avatar,
      display_name,
    }
  }

}
</script>

<style lang="css" scoped>
</style>
