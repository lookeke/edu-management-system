import * as crypto from 'crypto-js'

export const decrypt = (word: string) => {
const key = crypto.enc.Utf8.parse(process.env.ENCRYPT_KEY)
	const decrypt = crypto.AES.decrypt(word, key, {
		mode: crypto.mode.ECB,
		padding: crypto.pad.Pkcs7
	})
	const decryptedStr = decrypt.toString(crypto.enc.Utf8)
	return decryptedStr.toString()
}
