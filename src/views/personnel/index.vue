<template>
  <div class="personnel-container">
    <div class="personnel-text">
      name:{{ name }}
    </div>
    <div class="personnel-text">
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
  name: 'Personnel',
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
.personnel {
  &-container {
    margin: 30px;
  }

  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
