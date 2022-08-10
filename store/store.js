export const state = () => ({
  counter: 0,
  user: {
    email: '',
    displayName: '',
    url: ''
  },
  tri: ''
})

export const mutations = {
  increment (state) {
    state.counter++
  },
  updateState (state, user) {
    state.user.email = user.email
    state.user.displayName = user.displayName
    state.user.url = user.url
  },
  refreshState (state) {
    state.user.email = ''
    state.user.displayName = ''
    state.user.url = ''
  },
  updateTri (state, tri) {
    state.tri = tri
  }
}
