const fs = require('fs')
const path = require('path')

let tableName

try {
    tableName = process
    .argv
    .find((arg) =>
        arg.includes('--tableName=')
    ).split('=')[1]
} catch(err) {
    return console.error('--tableName parameter not found. Please specify a table name.')
}

const fileName = new Date().getTime() + `_${tableName}.sql`

fs.writeFile(path.resolve(__dirname, `../migrations/${fileName}`), '', (err) => {
    if (err) throw new Error(err)
    console.log('Created new migration file in migrations folder.')
})