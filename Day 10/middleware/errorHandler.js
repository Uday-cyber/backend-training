const errorHandler = (err, req, res, next) => {
    console.log(err.stack);

    const statusCode = err.name === 'ValidationError' ? 400 : 500;

    res.status(statusCode).json({
        error: err.message || 'Something went wrong'
    });
};

export default errorHandler;