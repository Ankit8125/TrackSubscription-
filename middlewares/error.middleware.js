// Some blocks of code that are executed before or after something allowing us to intercept what is happening.
const errorMiddleware = (err, req, res, next) => {
   try {
    let error = {...err}

    error.message = err.message
    console.error(err);

    // Mongoose bad ObjectId = When user provides invalid ObjectId format in URL parameters
    if(err.name === 'CastError'){
      const message = 'Resource not found'
      error = new Error(message)
      error.statusCode = 404;
    }

    // Mongoose duplicate key = When user tries to save document with duplicate value in unique field
    if(err.code === 11000){
      const message = 'Duplicate field value entered'
      error = new Error(message)
      error.statusCode = 400
    }

    // Mongoose Validation error = When required fields are missing or Data doesn't match schema constraints (minLength, maxLength, enum, etc.)
    if(err.name === 'ValidationError'){
      const message = Object.values(err.errors).map(val => val.message)
      error = new Error(message.join(', '))
      error.statusCode = 400
    }

    res.status(error.statusCode || 500).json({
      success: false,
      error: error.message || 'Server Error'
    })

   } catch (error) {
    next(error)
   }
}

export default errorMiddleware