import { VuexModule, Module, Action, Mutation, getModule } from 'vuex-module-decorators'
// import { login, logout, getUserInfo } from '@/api/users'
import { getToken, setToken, removeToken } from '@/utils/cookies'
import store from '@/store'
import { dataToken, IUser, user } from './dummyData'

export interface IUserState {
  token: string
  name: string
  avatar: string
  introduction: string
  roles: string[]
}

@Module({ dynamic: true, store, name: 'user' })
class User extends VuexModule implements IUserState {
  public token = getToken() || ''
  public name = ''
  public avatar = ''
  public introduction = ''
  public roles: string[] = []

  @Mutation
  private SET_TOKEN(token: string) {
    this.token = token
  }

  @Mutation
  private SET_NAME(name: string) {
    this.name = name
  }

  @Mutation
  private SET_AVATAR(avatar: string) {
    this.avatar = avatar
  }

  @Mutation
  private SET_INTRODUCTION(introduction: string) {
    this.introduction = introduction
  }

  @Mutation
  private SET_ROLES(roles: string[]) {
    this.roles = roles
  }

  @Action
  public async Login(userInfo: { username: string, password: string }) {
    let { username, password } = userInfo
    username = username.trim()
    // const { data } = await login({ username, password })

    // Start dummy data
    let data: any = {}
    if (username === 'admin' && password) {
      data = dataToken.admin
    } else {
      data = dataToken.user
    }
    // End dummy data

    setToken(data.accessToken)
    this.SET_TOKEN(data.accessToken)
  }

  @Action
  public ResetToken() {
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }

  @Action
  public async GetUserInfo() {
    if (this.token === '') {
      throw Error('GetUserInfo: token is undefined!')
    }
    // const { data } = await getUserInfo({ /* Your params here */ })

    // Start dummy data
    let data: IUser = {} as IUser
    if (this.token && this.token === 'admin-token') {
      data = user.find(item => item.username === 'admin') as IUser
    } else {
      data = user.find(item => item.username === 'user') as IUser
    }
    // End dummy data

    if (!data) {
      throw Error('Verification failed, please Login again.')
    }
    const { roles, name, avatar, introduction } = data
    // roles must be a non-empty array
    if (!roles || roles.length <= 0) {
      throw Error('GetUserInfo: roles must be a non-null array!')
    }
    this.SET_ROLES(roles)
    this.SET_NAME(name)
    this.SET_AVATAR(avatar)
    this.SET_INTRODUCTION(introduction)
  }

  @Action
  public async LogOut() {
    if (this.token === '') {
      throw Error('LogOut: token is undefined!')
    }
    // await logout()
    removeToken()
    this.SET_TOKEN('')
    this.SET_ROLES([])
  }
}

export const UserModule = getModule(User)
