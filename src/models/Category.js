import mongoose from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  }
}, {
  timestamps: true
})

categorySchema.plugin(uniqueValidator, { message: '{PATH} already exists' })

export default mongoose.models.Category || mongoose.model('Category', categorySchema)

