import express from "express";
import fileUpload from "express-fileupload";
import { readFile, readFileSync } from "fs";
import path from "path";

const app = express();

app.use(fileUpload());

app.get('/appcast/:version', (request, response) => {
    const version = request.params.version;
    const filePath = path.join(__dirname, `files/${version}.json`)
    const data = readFileSync(filePath)
    response.json(JSON.parse(data.toString()))
})

app.post('/upload', (request, response) => {
    if (!request.files || Object.keys(request.files).length === 0) {
        return response.status(400).send('No files were uploaded.')
    }

    Object.keys(request.files).forEach((key) => {
        let sampleFile = (request.files as fileUpload.FileArray)[key]
        if (sampleFile instanceof Array) {
            sampleFile.forEach((item) => {
                item.mv(__dirname + '/files/' + item.name, (err) => {
                    if (err) {
                        return response.status(500).send(err)
                    }
                })
                response.send('Files uploaded')
            })
        } else {
            sampleFile.mv(__dirname + '/files/' + sampleFile.name, (err) => {
                if (err) {
                    return response.status(500).send(err)
                }
                response.send('File uploaded')
            })
        } 
    })   
})

app.get('/download/:filename', (request, response) => {
    let filename = request.params.filename;
    response.download(__dirname + '/files/' + filename, (err) => {
        if (err) {
            return response.status(500).send(err)
        }
    })
})

app.listen(8000)