<template>
  <div class="hello">
    <h1>{{ $t("welcome") }}</h1>
    <p>
      {{ $t("guide") }}<br>
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>{{ $t("installedPlugins") }}</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>{{ $t("essentialLinks") }}</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">{{ $t("coreDocs") }}</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">{{ $t("forum") }}</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">{{ $t("communityChat") }}</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">{{ $t("news") }}</a></li>
    </ul>
    <h3>{{ $t("ecosystem") }}</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
    <select v-model="$i18n.locale">
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="fr">Français</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>