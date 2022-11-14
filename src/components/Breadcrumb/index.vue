<template>
  <el-breadcrumb
    class="app-breadcrumb"
    separator="/"
  >
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbs"
        :key="item.path"
      >
        <span
          v-if="item.redirect === 'noredirect' || index === breadcrumbs.length-1"
          class="no-redirect"
        >
          <div v-if="item.meta.title === 'home'">
            <svg-icon
              name="logo"
              class="logo-home"
            />
          </div>
          <span v-else>{{ $t('item.' + item.meta.title) }}</span>
        </span>
        <a
          v-else
          @click.prevent="handleLink(item)"
        >
          <div v-if="item.meta.title === 'home'">
            <svg-icon
              name="logo"
              class="logo-home"
            />
          </div>
          <span v-else>{{ $t('item.' + item.meta.title) }}</span>
        </a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { compile } from 'path-to-regexp'
import { Watch } from 'vue-property-decorator'
import { RouteRecord, Route } from 'vue-router'

@Component({
  name: 'Breadcrumb',
  components: {}
})
export default class Breadcrumb extends Vue {
  breadcrumbs: RouteRecord[] = [];

  @Watch('$route')
  private onRouteChange(route: Route) {
    // if you go to the redirect page, do not update the breadcrumbs
    if (route.path.startsWith('/redirect/')) {
      return
    }
    this.getBreadcrumb()
  }

  created() {
    this.getBreadcrumb()
  }

  private getBreadcrumb() {
    let matched: RouteRecord[] = this.$route.matched.filter(
      item => item.meta && item.meta.title
    )
    const first = matched[0]
    if (!this.isHome(first)) {
      matched = [
        { path: '/home', meta: { title: 'home' } } as unknown as RouteRecord
      ].concat(matched)
    }
    this.breadcrumbs = matched.filter(item => {
      return item.meta && item.meta.title && item.meta.breadcrumb !== false
    })
  }

  private isHome(route: RouteRecord) {
    const name = route && route.name
    if (!name) {
      return false
    }
    return name.trim().toLocaleLowerCase() === 'Home'.toLocaleLowerCase()
  }

  private pathCompile(path: string) {
    const { params } = this.$route
    const toPath = compile(path)
    return toPath(params)
  }

  private handleLink(item: any) {
    const { redirect, path } = item
    if (redirect) {
      this.$router.push(redirect).catch(err => {
        console.warn(err)
      })
      return
    }
    this.$router.push(this.pathCompile(path)).catch(err => {
      console.warn(err)
    })
  }
}
</script>

<style lang="scss" scoped>
.el-breadcrumb__inner,
.el-breadcrumb__inner a {
  font-weight: 400 !important;
}

.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }

  .logo-home {
    font-size: 30px;
    margin-right: 10px;
    margin-top: 10px;
  }
}
</style>
