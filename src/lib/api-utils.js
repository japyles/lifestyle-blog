export class ApiError extends Error {
    constructor(statusCode, message) {
      super(message)
      this.statusCode = statusCode
    }
  }
  
  export const handleError = (err, res) => {
    if (err instanceof ApiError) {
      res.status(err.statusCode).json({
        success: false,
        message: err.message
      })
    } else if (err.name === 'ValidationError') {
      res.status(400).json({
        success: false,
        message: Object.values(err.errors).map(error => error.message)
      })
    } else {
      console.error(err)
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      })
    }
  }
  
  