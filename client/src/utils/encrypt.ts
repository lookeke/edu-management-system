import * as crypto from 'crypto-js'

 import { key } from '@/config/encrypt'

export const encrypt = (word: string) => {
	const encrypted = crypto.AES.encrypt(word, key, {
		mode: crypto.mode.ECB,
		padding: crypto.pad.Pkcs7
	})
	return encrypted.toString()
}
