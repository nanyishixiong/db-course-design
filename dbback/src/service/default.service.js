class DeFaultService {
  constructor(model, name) {
    this.model = model
    this.name = name
    this[`create${this.name}`] = this.create.bind(this)
    this[`modify${this.name}`] = this.modify.bind(this)
    this[`delete${this.name}`] = this.delete.bind(this)
    this[`query${this.name}`] = this.query.bind(this)
  }

  async create(data) {
    let res;
    if (Array.isArray(data)) {
      res = await this.model.bulkCreate(data)
    } else {
      res = await this.model.create(data)
    }
    return res.dataValues
  }

  async modify(data, whereOpt) {
    const res = await this.model.update(data, { where: whereOpt })
    return res
  }

  async delete(whereOpt) {
    let res;
    if (Object.keys(whereOpt).length) {
      res = await this.model.destroy({ where: whereOpt })
    } else {
      res = await this.model.destroy({
        truncate: true
      });
    }
    return res
  }

  async query(whereOpt) {
    let res;
    if (Object.keys(whereOpt).length) {
      res = await this.model.findAll({ where: whereOpt })
    } else {
      res = await this.model.findAll()
    }
    return res
  }
}

module.exports = DeFaultService