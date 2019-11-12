settings = {
	login: process.env.LOGIN,
	password: process.env.PASSWORD,
	dbName: process.env.DBNAME
}

settings.url = `mongodb+srv://${settings.login}:${settings.password}@cluster0-ji8lc.gcp.mongodb.net/test?retryWrites=true&w=majority`

module.exports = settings;