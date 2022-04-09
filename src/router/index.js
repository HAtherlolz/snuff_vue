import { createRouter, createWebHistory } from 'vue-router'
//Main
import Main from '../views/Main.vue'
//Login
import Login from '../views/Login.vue'
//Profile
import Profile from '../views/Profile.vue'
import ProfileUpdate from '../views/ProfileUpdate.vue'
//Users
import Users from '../views/Users.vue'
import TargetUser from '../views/TargetUser.vue'
//Albums
import Album from '../views/Album.vue'
import AlbumCreate from '../views/AlbumCreate.vue'
import AlbumAuthor from '../views/AlbumAuthor.vue'
import AlbumUpdate from '../views/AlbumUpdate.vue'
//Tracks
import Tracks from '../views/Tracks.vue'
import TrackCreate from '../views/TrackCreate.vue'


const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/me',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/me/update',
    name: 'ProfileUpdate',
    component: ProfileUpdate
  },
  {
    path: '/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/user/:id',
    name: 'TargetUser',
    component: TargetUser,
    props: true
  },
  {
    path: '/albums',
    name: 'Album',
    component: Album
  },
  {
    path: '/album/create',
    name: 'AlbumCreate',
    component: AlbumCreate
  },
  {
    path: '/user/album/:id',
    name: 'AlbumAuthor',
    component: AlbumAuthor,
    props: true
  },
  {
    path: '/album/update/:id',
    name: 'AlbumUpdate',
    component: AlbumUpdate,
    props: true
  },
  {
    path: '/tracks',
    name: 'Tracks',
    component: Tracks,
    props: true
  },
  {
    path: '/track/create',
    name: 'TrackCreate',
    component: TrackCreate,
    props: true
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
