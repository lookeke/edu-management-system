const DATABASE_USER = 'root'
const DATABASE_PASS = 'admin'
const DATABASE_URL = '192.168.0.152'
const DATABASE_PORT = 27017
const DATABASE_NAME = 'edu_system'
const DATABASE = `mongodb://${ DATABASE_USER }:${ DATABASE_PASS }@${ DATABASE_URL }:${ DATABASE_PORT }/${ DATABASE_NAME }`

export {
	DATABASE,
}
