<template>
  <Header />
  <div class="container">
      <p>Hello World</p>
      <div class="test" :key="id" v-for="(d, id) in data">
          <p>{{d.id}}</p>
          <p>{{d.title}}</p>
          <p>{{d.album}}</p>
          <p>{{d.link_of_author}}</p>
          <p>{{d.file}}</p>
          <p>{{d.create_at}}</p>
          <p>{{d.user.id}}</p>
          <img :src="d.cover" alt="">
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
  name: "Main",
  components: {
    Header,
    Footer,
  },

  setup() {

    const store = useStore()

    const data = ref([])

    const getAllTracksList = async () => {
           await axios.get(
             `${store.getters.getServerUrl}/audio/all_tracks/`
           ).then(response => data.value = response.data)
           console.log(data.value)
           console.log(data.value[0].title)
    }


    onMounted(getAllTracksList)

    return {
      getAllTracksList,
      data,
    }

  }
}
</script>
