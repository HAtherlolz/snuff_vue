<template>
  <Header />
  <div class="container">
      <div class="">
        <div class="test" :key="id" v-for="(a, id) in albums">
          <p>{{a.id}}</p>
          <img :src="a.cover" alt="">
          <p>{{a.name}}</p>
          <p>{{a.description}}</p>
          <p>{{a.private}}</p>
          <div class="">
            <a href="#" @click="goToUpdate(a.id)">Update the album</a>
          </div>
          <div class="">
            <a href="#" @click="deleteAlbum(a.id)">Delete</a>
          </div>
        </div>
      </div>
      <a href="#" @click="goTo()">Create new album</a>
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
  name: "Albums",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()
    const router = useRouter()
    const albums = ref([])

    const getAllAlbums = async () => {

           await axios.get(
             `${store.getters.getServerUrl}/audio/album/`, {
             headers: {
               Authorization: 'Bearer ' + localStorage.getItem('token')
             }
            }
           ).then(response => albums.value = response.data)
           console.log(albums.value)
    }

    const goTo = () => {
        router.push({ name: 'AlbumCreate'})
    }
    const goToUpdate = (id) => {
        router.push({ name: 'AlbumUpdate', params: {id: id}})
    }

    const deleteAlbum = async (id) => {
      await axios.delete(
        `${store.getters.getServerUrl}/audio/album/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
       }
      )
      getAllAlbums()
    }

    onMounted(getAllAlbums)

    return {
      getAllAlbums,
      deleteAlbum,
      albums,
      goTo,
      goToUpdate
    }
  }
}
</script>
