<template>
  <Header />
  <div class="container">
      <div class="">
        <form class="profile" action="index.html" method="post">
         <label for="cover">cover</label>
         <input class="input_text" type="file" id="cover" name="cover" required v-on:change="fileSend">

         <label for="name">name</label>
         <input class="input_text" type="text" id="name" v-model="name">

         <label for="description">description</label>
         <input class="input_text" type="text" id="description" v-model="description">

         <label for="privat">privat</label>
         <input type="radio" id="privat" v-model="privat">

         <div class="input_btn">
           <button type="button" name="button" @click="CreateNewAlbum()">Create</button>
         </div>

        </form>
      </div>
  </div>
  <Footer />
</template>

<script>

import Header from "../components/Header"
import Footer from "../components/Footer"

import axios from 'axios'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
  name: "AlbumCreate",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()
    const router = useRouter()

    const cover = ref('')
    const name = ref('')
    const description = ref('')
    const privat = ref('')

    const goTo = () => {
        router.push({ name: 'Album'})
    }

    const fileSend = (event) => {
      cover.value = event.target.files[0]
      console.log(cover.value)
    }

    const CreateNewAlbum = async () => {
      const formData = new FormData();
      formData.append("name", name.value)
      formData.append("description", description.value)
      formData.append("privat", privat.value)
      formData.append("cover", cover.value)

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data; boundary=something',
           Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
       await axios.post(
         `${store.getters.getServerUrl}/audio/track/`,
         formData,
         config
       )
       goTo()
    }

    return {
      CreateNewAlbum,
      fileSend,
      cover,
      name,
      description,
      privat,
    }
  }
}
</script>
