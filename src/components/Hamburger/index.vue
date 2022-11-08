<template>
  <div
    :class="[{'is-active': getIsActive}]"
    @click="toggleClick"
  >
    <svg-icon
      name="hamburger"
      width="20"
      height="20"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component({
  name: 'Hamburger',
  components: {}
  })
export default class Hamburger extends Vue {
  @Prop({ default: false }) private isActive!: boolean

  get getIsActive() : boolean {
    return this.isActive
  }

  toggleClick() {
    this.$emit('toggle-click')
  }
}
</script>

<style lang="scss" scoped>
.svg-icon {
  vertical-align: middle;
}

.is-active {
  transform: rotate(180deg);
}
</style>
