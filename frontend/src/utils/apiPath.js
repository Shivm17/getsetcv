export const BASE_URL = "http://localhost:3000";

//ROUTES USE FOR FRONTEND

export const API_PATHS = { 
   AUTH : {
      LOGIN: `${BASE_URL}/api/auth/login`,
      REGISTER: `${BASE_URL}/api/auth/register`,
      LOGOUT: `${BASE_URL}/api/auth/logout`,
      USER: `${BASE_URL}/api/user`,
      GET_PROFILE: `${BASE_URL}/api/auth/profile`,
      contactus:`${BASE_URL}/api/auth/contact-us`
   },
   RESUME:{
      CREATE: `${BASE_URL}/api/resume`,
      GET_ALL: `${BASE_URL}/api/resume`,
      GET_BY_ID: (id) => `${BASE_URL}/api/resume/${id}`,
      UPDATE: (id) => `${BASE_URL}/api/resume/update/${id}`,
      DELETE: (id) => `${BASE_URL}/api/resume/delete/${id}`,
      UPLOAD_IMAGES: (id) => `${BASE_URL}/api/resume/${id}/upload-images`
   },
   IMAGE:{
      UPLOAD_IMAGE: `${BASE_URL}/api/upload-image` 
   }
}