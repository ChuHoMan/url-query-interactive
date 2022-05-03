<template>
  <button
    :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    @click="toggleDark"
  >
    <eva-moon-outline v-if="isDark" />
    <eva-sun-outline v-else />
  </button>
</template>

<script setup lang="ts">
import EvaMoonOutline from '~icons/eva/moon-outline'
import EvaSunOutline from '~icons/eva/sun-outline'
const isDark = useDark()

function toggleDark() {
  isDark.value = !isDark.value
}
</script>