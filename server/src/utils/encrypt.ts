import * as crypto from 'crypto-js'

const encryptData = (word: string) => {
const key = crypto.enc.Utf8.parse(process.env.ENCRYPT_KEY)
	const encrypted = crypto.AES.encrypt(word, key, {
		mode: crypto.mode.ECB,
		padding: crypto.pad.Pkcs7
	})
	return encrypted.toString()
}
