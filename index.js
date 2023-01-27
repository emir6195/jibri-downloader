const express = require('express');
const fs = require('fs');

const app = express();


// dirname example => '/Users/turkgen/.jitsi-meet-cfg/jibri/recordings/'
const dirname = process.env.JIBRI_DOWNLOADER_DIRNAME;
const port = process.env.JIBRI_DOWNLOADER_PORT
const host = '0.0.0.0'

app.get('/recordings/:recording_folder', (req, res) => {
    const video_folder = dirname + req.params.recording_folder;
    fs.readdir(video_folder, (err, files) => {
        if (files) {
            files.forEach(file => {
                if (err) {
                    res.status(500).send({ error: err })
                }
                else {
                    if (file.endsWith('.mp4')) {
                        res.download(video_folder + '/' + file);
                    }
                }
            });
        } else {
            res.status(404).send({ message: 'File not found!' })
        }
    });
});


// serve
app.listen(port, host, ()=>{
    console.log('Jibri downloader server is started on port=>', port)
});