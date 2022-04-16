class RegistersDAO {
  constructor (dbClient) {
    this.db = dbClient
    this.getAll = this.getAll.bind(this)
    this.getById = this.getById.bind(this)
    this.create = this.create.bind(this)
    this.update = this.update.bind(this)
    this.delete = this.delete.bind(this)
  }

  async getAll () {
    const response = await this.db.query('SELECT id, firstName, lastName, email FROM registers')
    const rows = response[0]
    return rows
  }

  async getById (id) {
    const response = await this.db.query('SELECT id, firstName, lastName, email FROM registers WHERE id = ?', [id])
    const rows = response[0]
    return rows[0]
  }

  async create (register) {
    const response = await this.db.query('INSERT INTO registers (firstName, lastName, email) VALUES (?, ?, ?)', [register.firstName, register.lastName, register.email])
    const result = response[0]
    return result.insertId
  }

  async update (register) {
    const response = await this.db.query('UPDATE registers SET firstName = ?, lastName = ?, email = ? WHERE id = ?', [register.firstName, register.lastName, register.email, register.id])
    const result = response[0]
    return result
  }

  async delete (id) {
    const response = await this.db.query('DELETE FROM registers WHERE id = ?', [id])
    const result = response[0]
    return result
  }
}

module.exports = RegistersDAO
