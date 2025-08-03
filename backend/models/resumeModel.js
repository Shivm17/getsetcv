import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    thumbnailLink: {
      type: String,
      required: false,
    },
    template: {
      theme: String,
      colorPalette: [String],
    },
    profileInfo: {
      profilePreviewUrl: String,
      fullname: String,
      designation: String,
      summary: String,
    },
    contactInfo: {
      email: String,
      phone: String,
      location: String,
      website: String,
      linkedin: String,
      github: String,
    },
    workExperience: [
      {
        company: String,
        role: String,
        startDate: Date,
        endDate: Date,
        description: String,
      },
    ],
    education: [
      {
        degree: String,
        institution: String,
        startDate: Date,
        endDate: Date,
      },
    ],
    skills: [
      {
        name: String,
        progress: Number,
      },
    ],
    projects: [
      {
        title: String,
        description: String,
        liveDemo: String,
        github: String,
      },
    ],
    certifications: [
      {
        title: String,
        issuer: String,
        date: Date,
      },
    ],
    languages: [
      {
        name: String,
        progress: Number,
      },
    ],

    interests: [String],
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }, // Automatically manage createdAt and updatedAt fields
  }
);

export default mongoose.models.Resume || mongoose.model("Resume", resumeSchema);