import resumeModel from "../models/resumeModel.js";
import fs from "fs";
import path from "path";

export const createResume = async (req, res) => {
  try {
    const {title } = req.body;

    
    //default templates this is the default template for the resume
    //you can change this template as per your requirement
     const defaultResumeData = {  
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: '',
                },
            ],
            interests: [''],
            thumbnailLink: '', // <-- Add this line

  } 

  const newResume = await resumeModel.create({
      userId: req.user._id,
      title: title || "My Resume",
      //this was need bcoz in the req.body we are not sending the resume data
      //so we are using the defaultResumeData to create the resume
      ...defaultResumeData,
      ...req.body
    });

    if (newResume) {
      return res.status(201).json({
        success: true,
        message: "Resume created successfully",
        resume: newResume
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Failed to create resume"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message
    });
  }
} 

export const getResume = async (req, res) => {

  try {
    // Find the resume for the authenticated user
    const resume = await resumeModel.findOne({ userId: req.user._id }).sort({
      updatedAt: -1
    });

    if (resume) {
      return res.status(200).json({
        success: true,
        resume
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error failed to get resume",
      error: error.message
    });
  }
}

//get resume by ID
export const getResumeById = async (req, res) => { 

  try {
    const resume = await resumeModel.findById({_id : req.params.id , userId : req.user._id});

    if (resume) {
      return res.status(200).json({
        success: true,
        resume
      });
    } else {
      return res.status(404).json({
        success: false,
        message: "Resume not found"
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error failed to get resume",
      error: error.message
    });
  }
}

//update resume 
export const updateResume = async (req,res) =>{
  try {
    const resume = await resumeModel.findOne({_id : req.params.id , userId: req.user._id});

    if(!resume){
      return res.status(404).json({
        success: false,
        message: "Resume not found or you are not authorized to update this resume"
      })
    }
    //merge updated data with existing resume data
    Object.assign(resume, req.body);
    //save the updated resume
    const savedResume = await resume.save()

    if (!savedResume) {
      return res.status(400).json({
        success: false,
        message: "Failed to update resume"
      });
    }
    return res.status(200).json({
      success: true,
      message: "Resume updated successfully",
      resume: savedResume
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error failed to update resume",
      error: error.message
    });
  }
}

//delete resume
export const deleteResume = async (req, res) => { 
  try { 
    const resume = await resumeModel.findOne({_id : req.params.id , userId: req.user._id});

    if(!resume){
      return res.status(404).json({
        success: false,
        message: "Resume not found or you are not authorized to delete this resume"
      });
    }

    //create a upload folder and store the resume in that folder
    const uploadsFolder = path.join(process.cwd(), 'uploads');
    //delete thumbnail
    if(resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if(fs.existsSync(oldThumbnail)) {
        fs.unlinkSync(oldThumbnail); //delete the old thumbnail
      }
    }

    if(resume.profileInfo.profilePreviewUrl) {
      const oldPreview = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
      if(fs.existsSync(oldPreview)) {
        fs.unlinkSync(oldPreview); //delete the old preview image
      }
    }
    //check if the uploads folder exists, if not create it
    
    //delete resume doc
    const deletedResume = await resumeModel.findOneAndDelete({_id: req.params.id, userId: req.user._id});

    if (!deletedResume) {
      return res.status(400).json({
        success: false,
        message: "Failed to delete resume"
      });
    }else{
      return res.status(200).json({
        success: true,
        message: "Resume deleted successfully"
      });
    }

  }catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error failed to delete resume",
      error: error.message
    });
  }
}