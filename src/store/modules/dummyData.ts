export interface IUser {
    id: number
    username: string
    password: string
    name: string
    avatar: string
    email: string
    introduction: string
    phone: string
    roles: string[]
}

export const user: IUser[] = [
  {
    id: 0,
    username: 'admin',
    password: 'any',
    name: 'Van Nhan',
    avatar: '',
    email: 'nhanhv.qt@gmail.com',
    introduction: 'I am a super administrator',
    phone: '0942670695',
    roles: ['admin']
  },
  {
    id: 1,
    username: 'user',
    password: 'any',
    name: 'Nguyen Van A',
    avatar: '',
    email: 'nguyenvana@gmail.com',
    introduction: 'I am a user',
    phone: '0355748155',
    roles: ['user']
  }
]

export const dataToken = {
  admin: {
    accessToken: 'admin-token'
  },
  user: {
    accessToken: 'user-token'
  }
}
