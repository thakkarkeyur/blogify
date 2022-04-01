// Page not found - Error Handler
const notFound = (req, res, next) => {
    // Creating own new error
    const error = new Error(`Paage Not Found - ${req.originalUrl}`); 
    res.status(404);
    next(error);
}

// Error Handler
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json ({
        message: err?.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

module.exports = { errorHandler, notFound };