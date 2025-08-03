import fs from 'fs';
import path from 'path';

import resumeModel from '../models/resumeModel.js';
import upload from '../middleware/uploadMiddleware.js';

export const uploadResumeImages = async (req, res) => {
  try {
    //congigure multer to handle uploadResumeImages
    upload.fields([{name : "thumbnail"} , { name : "profileImage"}])
    (req, res, async (err) => {
      if (err) {
        return res.status(400).json({ message : "Error uploading images",error: err.message });
      }
      const resumeID = req.params.id;
     
      // Save the paths to the database
      const resumeData = await resumeModel.findOne(
        { userId: req.user._id, _id: resumeID },
      );
      if (!resumeData) {
        return res.status(404).json({ message: 'Resume not found or user not authorized.' });
      }
      //use process cwd to get the current working directory
       const uploadsFolder = path.join(process.cwd(), 'uploads');
       const baseUrl = `${req.protocol}://${req.get('host')}`;
       const newThumbnail =  req.files.thumbnail?.[0];
       const newProfileImage =  req.files.profileImage?.[0];

      if (newThumbnail) {
        if(resumeData.thumbnailLink){
          const oldThumbnailPath = path.join(uploadsFolder, path.basename(resumeData.thumbnailLink));
          if(fs.existsSync(oldThumbnailPath)) {
            fs.unlinkSync(oldThumbnailPath); // Delete the old thumbnail file
          }
          resumeData.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
        }
      }

      //save for profilePreviewImage 
      if (newProfileImage) {
        if(resumeData.profileInfo?.profilePreviewUrl){
          const oldProfileImagePath = path.join(uploadsFolder, path.basename(resumeData.profileInfo?.profilePreviewUrl));
          if(fs.existsSync(oldProfileImagePath)) {
            fs.unlinkSync(oldProfileImagePath); // Delete the old profile image file
          }
        }
        resumeData.profileInfo.profilePreviewUrl =`${baseUrl}/uploads/${newProfileImage.filename}`;
      }

      await resumeData.save();
      res.status(200).json({
        message: 'Images uploaded successfully',
        resumeData: {
          thumbnailLink: resumeData.thumbnailLink,
          profilePreviewUrl: resumeData.profileInfo?.profilePreviewUrl,
        },
      });
    });
    
    
  } catch (error) {
    console.error('Error uploading images:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
 }