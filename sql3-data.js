const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('users.db');

db.run(`CREATE TABLE IF NOT EXISTS users(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    age INTEGER NOT NULL)`);

module.exports = {
    async getUsers() {
        return new Promise((resolve, reject) =>
            db.all(`SELECT * FROM users`, [], (err, rows) => err ? reject(err) : resolve(rows))
        );
    },
    async addUser(user) {
        const id = await new Promise((resolve, reject) => {
            db.run(`INSERT INTO users (name, age) VALUES (?, ?)`, [user.name, user.age], function (err) {
                err ? reject(err) : resolve(this.changes);
            });
        });
        return {id, ...user};
    },
    async getUserById(id) {
        return await new Promise((resolve, reject) =>
            db.get(`SELECT * FROM users WHERE id = ?`, [id], (err, row) => err ? reject(err) : resolve(row))
        );
    },
    async deleteUser(id){
        const changes = await new Promise((resolve, reject) => {
            db.run(`DELETE FROM users WHERE id = ?`,[id], function (err) {
                err ? reject(err) : resolve(this.changes);
            });
        });
        return changes > 0;
    },
    async updateUser(id, updatedData) {
        const changes = await new Promise((resolve, reject) => {
            db.run(`UPDATE users SET name = ?, age = ? WHERE id = ?`,[updatedData.name, updatedData.age, id], function (err) {
                err ? reject(err) : resolve(this.changes);
            });
        });
        return changes ? this.getUserById(id) : null;
    }
}
