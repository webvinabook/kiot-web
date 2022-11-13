<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <svg-icon
        name="language"
        class="international-icon"
      />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        :disabled="language==='vi'"
        command="vi"
      >
        {{ $t('text.vietnamese') }}
      </el-dropdown-item>
      <el-dropdown-item
        :disabled="language==='en'"
        command="en"
      >
        {{ $t('text.english') }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { AppModule } from '@/store/modules/app'
import settings from '../../settings'
@Component({
  name: 'Login'
})
export default class extends Vue {
  get language() {
    return AppModule.language
  }

  private handleSetLanguage(lang: string) {
    this.$i18n.locale = lang
    AppModule.SetLanguage(lang)
    document.documentElement.lang = lang
    const title = this.$route.meta && this.$route.meta.title ? `${this.$t(`item.${this.$route.meta.title}`)} - ${settings.title}` : `${settings.title}`
    document.title = title
    this.$message({
      message: this.$t('helpText.changeLanguageTips').toString(),
      type: 'success'
    })
  }
}
</script>
