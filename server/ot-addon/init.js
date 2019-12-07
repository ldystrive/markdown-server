var addon = require('bindings')('ot');

console.log(addon.hello())

addon.addInsert('233ad')
console.log(addon.toString())