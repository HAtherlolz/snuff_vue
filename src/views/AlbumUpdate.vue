<template lang="html">
  <Header/>
  <div class="">
  </div>
  <div class="container">
    <div class="">
      <form class="profile" action="index.html" method="put">
       <label for="cover">cover</label>
       <input class="input_text" type="file" id="cover" name="cover" required v-on:change="fileSend">

       <label for="name">name</label>
       <input class="input_text" type="text" id="name" v-model="name">

       <label for="description">description</label>
       <input class="input_text" type="text" id="description" v-model="description">

       <label for="privat">privat</label>
       <input type="radio" id="privat" v-model="privat">

       <div class="input_btn">
         <button type="button" name="button" @click="UpdateAlbum()">Update</button>
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
import { ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  name: "ProfileUpdate",
  props: ["id"],
  components: {
    Header,
    Footer,
  },

  setup(props) {

    const store = useStore()
    const router = useRouter()

    const cover = ref('')
    const name = ref('')
    const description = ref('')
    const privat = ref('')

    const album = ref([])

    const goTo = () => {
        router.push({ name: 'Album'})
    }

    const getAlbumInfo = async () => {

           await axios.get(
             `${store.getters.getServerUrl}/audio/album/${props.id}`, {
             headers: {
               Authorization: 'Bearer ' + localStorage.getItem('token')
             }
            }
           ).then(response => album.value = response.data)
           name.value = album.value['name']
           description.value = album.value['description']
           privat.value = album.value['privat']
    }

    const fileSend = (event) => {
      cover.value = event.target.files[0]
      console.log(cover.value)
    }

    const UpdateAlbum = async () => {
      console.log(name.value)
      console.log(description.value)

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

       await axios.put(
         `${store.getters.getServerUrl}/audio/album/${props.id}/`,
         formData,
         config
       )

       goTo()
    }

    onMounted(getAlbumInfo)

    return {
      getAlbumInfo,
      album,
      fileSend,
      UpdateAlbum,
      cover,
      name,
      description,
      privat,
    }
  }

}
</script>

<style lang="css" scoped>
</style>
