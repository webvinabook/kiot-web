<template>
  <div class="products-container">
    <div class="products-text">
      name:{{ name }}
    </div>
    <div class="products-text">
      roles:<span
        v-for="role in roles"
        :key="role"
      >{{ role }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { UserModule } from '@/store/modules/user'

@Component({
  name: 'Products',
  components: {}
})
export default class Setting extends Vue {
  get name() {
    return UserModule.name
  }

  get roles() {
    return UserModule.roles
  }
}
</script>

<style lang="scss" scoped>
.products {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
