const successResponse = (res, message, data) => {
    res.status(200).json({
        status: 'success',
        message: message || 'Request was successful',
        data: data || {},
    });
};
const errorResponse = (res, message, statusCode = 400) => {
    res.status(statusCode).json({
        status: 'error',
        message: message || 'Something went wrong',
    });
};

module.exports = { successResponse, errorResponse };
