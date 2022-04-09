<template>
  <Header />
  <div class="container">
      <div class="">
        <div class="test" :key="id" v-for="(a, id) in albums">
          <a href="#" @click="goTo(a.id)">
          <p>{{a.id}}</p>
          <img :src="a.cover" alt="">
          <p>{{a.name}}</p>
          <p>{{a.description}}</p>
          <p>{{a.private}}</p>
          </a>
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
  props: ["id"],
  components: {
    Header,
    Footer,
  },

  setup(props) {

    const store = useStore()
    const router = useRouter()
    const albums = ref([])

    const getAllAlbums = async () => {
        // id of author
           await axios.get(
             `${store.getters.getServerUrl}/audio/author-album/${props.id}`, {
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

    onMounted(getAllAlbums)

    return {
      getAllAlbums,
      albums,
      goTo
    }
  }
}
</script>
