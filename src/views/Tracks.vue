<template>
  <Header />
  <div class="container">
      <div class="">
        <div class="test" :key="id" v-for="(t, id) in tracks">
          <p>{{t.id}}</p>
          <img :src="t.cover" alt="">
          <p>title: {{t.title}}</p>
          <!-- <div class="" :key="id" v-for="(a, id) in t.album">
            <p>album {{a.name}}</p>
          </div> -->
          <p>album {{t.album}}</p>
          <p>nickname: {{t.user.display_name}}</p>
          <div class="" :key="id" v-for="(g, id) in t.genre">
            <p>genre: {{g.name}}</p>
          </div>

          <div class="">
            <!-- <a href="#" @click="goToUpdate(a.id)">Update the album</a> -->
          </div>
          <div class="">
            <a href="#" @click="deleteTrack(t.id)">Delete</a>
          </div>
        </div>
      </div>
      <!-- <a href="#" @click="goTo()">Create new album</a> -->
  </div>
  <Footer />
</template>

<script>

import Header from "../components/Header"
import Footer from "../components/Footer"

import axios from 'axios'
import { ref, onMounted } from 'vue'
// import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
  name: "Tracks",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()
    // const router = useRouter()
    const tracks = ref([])

    const getAllTracks = async () => {

           await axios.get(
             `${store.getters.getServerUrl}/audio/track/`, {
             headers: {
               Authorization: 'Bearer ' + localStorage.getItem('token')
             }
            }
           ).then(response => tracks.value = response.data)
           console.log(tracks.value)
    }

    // const goTo = () => {
    //     router.push({ name: 'AlbumCreate'})
    // }
    // const goToUpdate = (id) => {
    //     router.push({ name: 'AlbumUpdate', params: {id: id}})
    // }

    const deleteTrack = async (id) => {
      await axios.delete(
      `${store.getters.getServerUrl}/audio/track/${id}`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
       }
      )
      getAllTracks()
    }

    onMounted(getAllTracks)

    return {
      getAllTracks,
      deleteTrack,
      tracks,
      // goTo,
      // goToUpdate
    }
  }
}
</script>
