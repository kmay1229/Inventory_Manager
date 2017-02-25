const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');

const app = express();

const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
}))


app.listen(3000, function () {
    console.log('listening on 3000')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})