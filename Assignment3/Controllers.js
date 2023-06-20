import mysql2 from 'mysql2'

const DbConnection = mysql2.createConnection({
host: 'localhost',
user: 'root',
password: '',
database: 'usersdata'
})

export default DbConnection