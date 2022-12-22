import * as crypto from 'crypto-js'
// 十六位十六进制数作为密钥
const key = crypto.enc.Utf8.parse(import.meta.env.VITE_APP_ENCRYPT_KEY)
export {
	key
}
