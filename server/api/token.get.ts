import wxConfig from '~/wx.config'

interface WxTokenModel {
  access_token: string
  expires_in: number
}

interface AppTokenModel extends WxTokenModel {
  created: number
}

export default eventHandler(async () => {
  const { appID, appsecret } = wxConfig
  const userID = 'admin'

  const tokenStorage = useStorage('token')

  let token = await tokenStorage.getItem<AppTokenModel>(userID)

  if (!token) {
    token = {
      ...(await $fetch<WxTokenModel>(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appID}&secret=${appsecret}`)),
      created: Date.now(),
    }

    tokenStorage.setItem(userID, token)
  }

  return token
})
