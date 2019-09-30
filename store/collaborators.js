import collaborators from '~/store/api/v1/collaborators.json'

const state = () => ({
  collaborators
})

const getters = {
  sponsors: state => state.collaborators.sponsors,
  patrons: state => state.collaborators.patrons,
  volunteers: state => state.collaborators.volunteers
}

const actions = {}

const mutations = {}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
