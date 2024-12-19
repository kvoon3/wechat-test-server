import sha1 from 'sha1'
import wxConfig from '~/wx.config'

interface WxToken {
  signature: string
  echostr: string // random string
  timestamp: string
  nonce: string // random number
}

export default eventHandler((event) => {
  const {
    echostr,
    timestamp,
    signature,
    nonce,
  } = getQuery<WxToken>(event)

  const { token } = wxConfig

  const isWxServer = signature === sha1([token, timestamp, nonce].sort().join(''))

  return isWxServer ? echostr : 'Invalid signature'
})
