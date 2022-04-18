const RegistersDAO = require('../models/dao/RegistersDAO')

class RegisterController {
  constructor (db) {
    this.registersDao = new RegistersDAO(db)
    this.renderHomeWithRegister = this.renderHomeWithRegister.bind(this)
    this.renderSingleRegister = this.renderSingleRegister.bind(this)
    this.renderRegisterUpdateForm = this.renderRegisterUpdateForm.bind(this)
    this.insertAndRenderRegister = this.insertAndRenderRegister.bind(this)
    this.updateAndRenderRegister = this.updateAndRenderRegister.bind(this)
    this.deleteRegisterAndRenderResponse = this.deleteRegisterAndRenderResponse.bind(this)
  }

  async renderHomeWithRegister (req, res) {
    const registers = await this.registersDao.getAll()
    res.render('home', {
      registers
    })
  }

  async renderSingleRegister (req, res) {
    const id = req.params.id

    // TODO: Esta información debería venir de la base de datos

    try {
      const register = await this.registersDao.getById(id)

      if (!register) {
        res.status(404).render('404')
        return
      }

      res.render('register', {
        id,
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  renderRegisterCreationForm (req, res) {
    res.render('register-form')
  }

  async renderRegisterUpdateForm (req, res) {
    const id = req.params.id

    try {
      const register = await this.registersDao.getById(id)

      if (!register) {
        res.status(404).render('404')
        return
      }

      res.render('register-form', {
        id,
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async insertAndRenderRegister (req, res) {
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    const register = { firstName, lastName, email }

    try {
      const id = await this.registersDao.create(register)

      res.redirect(`/register/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async updateAndRenderRegister (req, res) {
    const id = req.params.id
    const firstName = req.body.firstName
    const lastName = req.body.lastName
    const email = req.body.email

    try {
      const register = { firstName, lastName, email, id }

      await this.registersDao.update(register)

      res.redirect(`/register/${id}`)
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }

  async deleteRegisterAndRenderResponse (req, res) {
    const id = req.params.id

    try {
      const register = await this.registersDao.getById(id)

      if (!register) {
        res.status(404).render('404')
        return
      }

      await this.registersDao.delete(id)

      // TODO: El titulo debe venir de la base de datos
      res.render('register-deleted', {
        id,
        firstName: register.firstName,
        lastName: register.lastName,
        email: register.email
      })
    } catch (error) {
      console.log(error)
      res.status(500).render('500')
    }
  }
}

module.exports = RegisterController
