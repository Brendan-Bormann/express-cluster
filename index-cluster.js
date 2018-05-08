process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

// Is the file being executed in master mode?
if (cluster.isMaster) {
    // Cause index.js to be executed *again* in child mode
    cluster.fork();
    cluster.fork();

    /*
        Limit the number of children;
        Upper limit of children prevents new forks from being more effective
        Keep the thread pool and cpu cores and logical cores in mind when deceiding number of possible forks
    */

} else {
    // I'm a child, I'm going to act like a server and do nothing else
    const express = require('express');
    const crypto = require('crypto');
    const app = express();

    app.get('/', (req, res) => {
        crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
            res.send('Hi there');
        });
    });

    app.get('/fast', (req, res) => {
        res.send('That was fast!');
    });

    app.listen(3000, () => {
        console.log('App listening on port 3000!');
    });

}