exports.Hello = (endpoint, app) => {
    app.get(endpoint, (req, res) => {
        res.send('Hello World!')
    })
}