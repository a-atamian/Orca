'use strict'

const Operator = require('../operator')

function OperatorG (orca, x, y, passive) {
  Operator.call(this, orca, x, y, 'g', passive)

  this.name = 'generator'
  this.info = 'Writes distant operators with offset.'

  this.ports.haste.x = { x: -3, y: 0 }
  this.ports.haste.y = { x: -2, y: 0 }
  this.ports.haste.len = { x: -1, y: 0 }

  this.run = function () {
    const len = this.listen(this.ports.haste.len, true, 1)
    const x = this.listen(this.ports.haste.x, true)
    const y = this.listen(this.ports.haste.y, true) + 1

    for (let i = 0; i < len; i++) {
      const port = { x: i + 1, y: y, unlock: true }
      this.ports.input[`val${i}`] = port

      const res = this.listen(port)
      this.ports.output = { x: x + i, y: y, unlock: true }
      this.output(`${res}`, true)
      this.ports.output.x -= 1
    }
  }
}

module.exports = OperatorG
