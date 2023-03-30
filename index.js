
const axios = require('axios')
const fs = require("fs")
const path = require("path")


const readFilepro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, (err, data) => {
            if (err) {
                reject("Unable to readfile")
            }
            resolve(data)
        })
    })
}

const writeFilepro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                reject("unable to write file")
            }
            resolve("File written succesfully")
        })
    })
}

readFilepro(path.join(__dirname, "/dog.txt"))
    .then((result) => {
        axios.get(`https://dog.ceo/api/breed/${result}/images/random`)
            .then((res) => {
                writeFilepro('dog_breed.txt', res.data.message)
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                //console.log(res.data)
            })
            .catch((err) => {
                console.log(err.message)
            })
    })
    .catch((err) => {
        console.log(err)
    })


// file.readFile(`${__dirname}/dog.txt`, (err, data) => {
//     console.log(`${data}`)
//     const breed = data.toString('utf8');

//     axios.get(`https://dog.ceo/api/breed/${breed}/images/random`)
//         .then((res) => {
//             console.log(res.data)
//             file.writeFile("dog_breed.txt", res.data.message, () => {
//                 console.log("file written successfully")
//             })
//         })
//         .catch((err) => {
//             console.log(err.message)
//             //throw new Error("Unable to fetch data")
//         })
// })
