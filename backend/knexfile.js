const DATABASE_URL = process.env.DATABASE_URL

module.exports = {
	client: 'postgresql',
	connection: `${DATABASE_URL}?ssl=true`,
	pool: {
		min: 2,
		max: 10
	},
	ssl: true
};