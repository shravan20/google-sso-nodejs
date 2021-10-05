

const getAuthScreenView = (request, response) => {
        response.render('auth');
}

const getLoginSuccess = (request, response) => {
    response.send({data:request.profile})
}

const getLoginFailure = (request, response) => {
    response.send('Failure');
}



module.exports = {
    getAuthScreenView,
    getLoginSuccess,
    getLoginFailure
};