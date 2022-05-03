<template>
  <div class="nav__container">
    <div class="nav__desc">
      <span class="nav__desc-en">URL QUERY INTERACTIVE</span>
      <span class="nav__desc-cn">交互式查看 url query</span>
    </div>
    <div class="nav__icons">
      <DarkToggle />
    </div>
  </div>
</template>

<script lang="ts">
export default {
    name: 'TheNav'
}
</script>

<script lang="ts" setup>
import DarkToggle from './DarkToggle.vue';
</script>

<style lang="less" scoped>
.nav {
  &__container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 16px 0;
  }

  &__desc {
    font-size: 16px;
    font-weight: 200;
    display: inline-flex;
    flex-direction: column;

    &-en {
      opacity: 0.5;
    }

    &-cn {}
  }

  &__icons {
    align-items: center;
    display: flex;
    flex-direction: row;
    gap: 1rem;
    font-size: 1.2rem;
    line-height: 1rem;
  }
}
</style>