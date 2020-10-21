export const state = () => ({
  appConfig: () => {},
})

export const mutations = {
  setAppConfig(state, config) {
    state.appConfig = config
  },
}

export const getters = {
  getConfig: (state) => {
    return state.appConfig
  },
}

export const actions = {
  async nuxtServerInit(
    { commit, dispatch },
    { store, route, params, redirect }
  ) {
    const config = await require('@/config.json')
    commit('setAppConfig', config)
  },
}
