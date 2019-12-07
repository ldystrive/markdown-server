var addon = require('bindings')('ot');

console.log(addon.hello())
try {
  addon.addInsert('233ad')
} catch (err) {
  console.log(err)
}
console.log(addon.toString(), ' 111')