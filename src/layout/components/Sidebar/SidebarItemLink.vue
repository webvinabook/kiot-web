<template>
  <a
    v-if="isExternal(toProp)"
    :href="toProp"
    target="_blank"
    rel="noopener"
  >
    <slot />
  </a>
  <router-link
    v-else
    :to="toProp"
  >
    <slot />
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { isExternal } from '@/utils/validate'

@Component({
  name: 'SidebarItemLink',
  components: {}
})

export default class SidebarItemLink extends Vue {
  @Prop({ required: true }) private to!: string

  get toProp() : string {
    return this.to
  }

  isExternal = isExternal
}
</script>
