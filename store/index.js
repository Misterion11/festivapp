/* import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

const auth = getAuth(initializeApp({
  apiKey: 'AIzaSyBZW3r6sqJzWzmrYQ6uG4RhDsW-wTOvLsE',
  authDomain: 'test-b748a.firebaseapp.com',
  projectId: 'test-b748a',
  storageBucket: 'test-b748a.appspot.com',
  messagingSenderId: '463574671495',
  appId: '1:463574671495:web:ff9187fdfedab9d6ded822'
}))
export const strict = false

export const state = () => ({
  user: null
})

export const mutations = {
  SET_USER (state, user) {
    state.user = user
  }
}

export const actions = {
  async logout ({ commit }) {
    await auth.signOut()
    commit('SET_USER', null)
  },

  async login ({ commit }, { email, password }) {
    try {
      await auth.createUserWithEmailAndPassword(email, password)
      const user = auth.currentUser
      await user.sendEmailVerification()
      commit('SET_USER', user.user)
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        try {
          const user = await auth.signInWithEmailAndPassword(email, password)
          commit('SET_USER', user.user)
        } catch (error) {
          throw new Error('Une erreur : ', error)
        }
      } else {
        throw new Error('Une erreur :', error)
      }
    }
  }

/*   async loginGitHub ({ commit }) {
    try {
      const user = await auth.signInWithPopup(github)
      commit('SET_USER', user.user)
    } catch (error) {
      throw new Error('Une erreur :', error)
    }
  } */
