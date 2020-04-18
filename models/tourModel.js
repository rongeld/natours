const mongoose = require('mongoose');
const slugify = require('slugify');
// const User = require('./userModel');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxLength: [40, 'A tour name must have less than 40 characters'],
      minLegnth: [5, 'A tour must have more than 10 characters']
    },
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration']
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have a group size']
    },
    difficulty: {
      type: String,
      required: [true, 'Tour must have difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Should be one of: easy, medium, difficult'
      }
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'rating must be above 1'],
      max: [5, 'rating must be below 5']
    },
    ratingsQuantity: {
      type: Number,
      default: 4.5
    },
    price: {
      type: Number,
      required: [true, 'Tour has to have a pRIce']
    },
    priceDiscount: {
      type: Number,
      validate: {
        message: 'Discount ({VALUE}) cannot be bigger than the price',
        validator: function(val) {
          return val < this.price;
        }
      }
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour has to have a description']
    },
    description: {
      type: String,
      trim: true
    },
    imageCover: {
      type: String,
      required: [true, 'Tour has to have a cover image']
    },
    slug: String,
    images: [String],
    startLocation: {
      type: {
        type: String,
        default: 'Point',
        enum: ['Point']
      },
      coordinates: [Number],
      address: String,
      description: String
    },
    locations: [
      {
        type: {
          type: String,
          default: 'Point',
          enum: ['Point']
        },
        coordinates: [Number],
        address: String,
        description: String,
        day: Number
      }
    ],
    guides: [
      // establishing referansinc in mongoose MONGO DB !!!!
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
      }
    ],
    createdAt: {
      type: Date,
      default: Date.now()
    },
    startDates: [Date]
  },
  {
    toJSON: {
      virtuals: true
    },
    toObject: {
      virtuals: true
    }
  }
);

tourSchema.virtual('durationWeeks').get(function() {
  return this.duration / 7;
});

// virtual populate
tourSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'tour',
  localField: '_id'
});

// DOCUMENT MIDDLEWARE: runs before .save() and .create()
tourSchema.pre('save', function(next) {
  this.slug = slugify(this.name, {
    lower: true
  });

  next();
});

tourSchema.pre(/^find/, function() {
  this.populate({
    path: 'guides',
    select: '-__v -passwordChangedAt'
  });
});

// tourSchema.pre('save', async function() {
//   const guidesPromises = this.guides.map(async id =>
//     User.findById(id).select('name photo')
//   );
//   this.guides = await Promise.all(guidesPromises);
// });

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
