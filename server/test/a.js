const files = require('../common/files')

const f = async ()=> {
    const a = await files.addFile('a')
    console.log(a)
    const b = await files.addFile('b')
    console.log(b)
    const c = await files.addFile('c')
    await files.getFiles(c)
}
f()