<template lang="pug">
  #app
    #nav.ui.top.icon.labeled.menu
      router-link.item(to="/")
        i.user.icon
        | 湊十釣魚
      router-link.item(to="/multi")
        i.users.icon
        | 多人釣魚
    router-view
  
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  background-color: #0f0;
}

a, button {
  cursor: pointer;
}
</style>
