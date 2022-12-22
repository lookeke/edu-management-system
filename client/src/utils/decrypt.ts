import * as crypto from 'crypto-js'

import { key } from '@/config/encrypt'

export const decrypt = (word: string) => {
	const decrypt = crypto.AES.decrypt(word, key, {
		mode: crypto.mode.ECB,
		padding: crypto.pad.Pkcs7
	})
	const decryptedStr = decrypt.toString(crypto.enc.Utf8)
	return decryptedStr.toString()
}
