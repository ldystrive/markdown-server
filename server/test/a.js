const files = require('../common/files')

const f = async ()=> {
    const a = await files.addFile('a')
    console.log(a)
}
f()