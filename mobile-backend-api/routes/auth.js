var auth = {
    index: function(req, res) {
        res.status(200).json({
            message: "Welcome to Mobile Back End Api"
        });
    }
}

module.exports = auth;