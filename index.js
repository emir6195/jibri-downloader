const express = require('express');
const fs = require('fs');

const app = express();
const dirname = '/Users/turkgen/.jitsi-meet-cfg/jibri/recordings/'

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
app.listen(5010);