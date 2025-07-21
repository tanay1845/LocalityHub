const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      required: [true, "Service type is required"],
      enum: [
        "Cleaning",
        "Electrician",
        "Plumbing",
        "Painting",
        "Pest-control",
        "Gas",
        "Water-Prof",
        "Water Purifier",
      ],
      trim: true,
    },

    description: {
      type: String,
      required: [true, "Service description is required"],
      minlength: [10, "Description must be at least 10 characters long"],
      maxlength: [1000, "Description cannot exceed 1000 characters"],
      trim: true,
    },

    price: {
      type: Number,
      required: [true, "Service price is required"],
      min: [0, "Price must be a positive number"],
    },

    state: {
      type: String,
      required: [true, "State is required"],
      trim: true,
    },

    city: {
      type: String,
      required: [true, "City is required"],
      trim: true,
    },

    pincode: {
      type: String,
      required: [true, "Pincode is required"],
      match: [/^[1-9][0-9]{5}$/, "Invalid Indian pincode format"],
    },

    providerName: {
      type: String,
      required: [true, "Provider name is required"],
      trim: true,
      minlength: [3, "Provider name must be at least 3 characters long"],
    },

    imageUrl: {
      type: String,
      required: [true, "Service image URL is required"],
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp)$/.test(v);
        },
        message: "Must be a valid image URL",
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

const Service = mongoose.model("Service", serviceSchema);
export default Service;
