<template>
  <Header />
  <div class="container">
      <div class="">
        <form class="profile" action="index.html" method="post">
         <label for="cover">cover</label>
         <input class="input_text" type="file" id="cover" name="cover" required v-on:change="fileSend">

         <label for="file">file</label>
         <input class="input_text" type="file" id="file" name="file" required v-on:change="fileSendSong">

         <label for="title">title</label>
         <input class="input_text" type="text" id="title" v-model="title">

         <label for="link_of_author">link_of_author</label>
         <input class="input_text" type="text" id="link_of_author" v-model="link_of_author">

         <label for="privat">privat</label>
         <input type="radio" id="privat" v-model="privat">
         <Multiselect
            mode="multiple"
            :close-on-select="false"
            ref="multiselect"
            v-model="genre"
            :options="options"
            class="multiselect-green"
          />
          <p>{{genre}}</p>
         <div class="input_btn">
           <button type="button" name="button" @click="CreateNewTrack()">Create</button>
         </div>
        </form>
      </div>
  </div>
  <Footer />
</template>

<script>

import Header from "../components/Header"
import Footer from "../components/Footer"

import Multiselect from '@vueform/multiselect'
import axios from 'axios'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'


export default {
  name: "TrackCreate",
  components: {
    Header,
    Footer,
    Multiselect
  },

  setup() {

    const store = useStore()
    const router = useRouter()

    const options = ref([])
    const options_get = ref('')
    // const res_genre = []
    const cover = ref('')
    const genre = ref([])
    const title = ref('')
    const link_of_author = ref('')
    const file = ref('')


    const addTag = (newTag) => {
      const tag = ref({
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
      })
      options.value.push(tag)
      genre.value.push(tag)
    }


    const goTo = () => {
        router.push({ name: 'Tracks'})
        console.log('Fuck me')
    }


    const fileSend = (event) => {
      cover.value = event.target.files[0]
      console.log(cover.value)
    }

    const fileSendSong = (event) => {
      file.value = event.target.files[0]
      console.log(file.value)
    }

    const getAllGenre = async () => {

     await axios.get(
       `${store.getters.getServerUrl}/audio/genre/`, {
       headers: {
         Authorization: 'Bearer ' + localStorage.getItem('token')
       }
      }
     ).then(response => options_get.value = response.data)

     for (var item in options_get.value) {
       options.value.push(options_get.value[item].name)
     }
    }

    const CreateNewTrack = async () => {
      // const formData = new FormData();
      // for (var i in genre.value) {
      //   for (var item in options_get.value) {
      //     if (options_get.value[item].name == genre.value[i]) {
      //       res_genre.push(options_get.value[item].id)
      //     }
      //   }
      // }
      //
      // formData.append("cover", cover.value)
      // for (var g in res_genre) {
      //   formData.append("genre", res_genre[g])
      // }
      // formData.append("title", title.value)
      // formData.append("link_of_author", link_of_author.value)
      // formData.append("file", file.value)

      const formData = {
        "cover": cover.value,
        "title": title.value,
        "link_of_author": link_of_author.value,
        "file": file.value,
        "genre": [1,2]

      }

      console.log(formData)

      const config = {
        headers: {
          // 'Content-Type': 'multipart/form-data',
           Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      }
       await axios.post(
         `${store.getters.getServerUrl}/audio/track/`,
         formData,
         config
       ).then(response => console.log(response.data))

       goTo()
    }

    onMounted(getAllGenre)

    return {
      CreateNewTrack,
      getAllGenre,
      fileSend,
      fileSendSong,
      cover,
      name,
      // privat,
      options,
      title,
      link_of_author,
      addTag,
      genre
    }
  }
}
</script>

<style media="screen">
  .multiselect-green {
    --ms-tag-bg: #D1FAE5;
    --ms-tag-color: #059669;
  }
</style>
