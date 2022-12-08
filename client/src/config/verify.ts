// 账号校验： 4-16位字母数字
export const usrVerifyRex = /^[a-zA-Z0-9_-]{4,16}$/
// 密码校验： 最少6位字符
export const pwdVerifyRex = /^\S{6,}$/
