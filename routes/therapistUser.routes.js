// import { SignUpTherapist } from "../controllers/v1/therapistUser.controllers.js";
// import { SignInTherapist } from "../controllers/v1/therapistUser.controllers.js";
// import { GetTherapistProfileData } from "../controllers/v1/therapistUser.controllers.js";
// import { EditTherapistProfileData } from "../controllers/v1/therapistUser.controllers.js";
// import { GetTherapistServicesData } from "../controllers/v1/therapistUser.controllers.js";
// import { EditTherapistServicesData } from "../controllers/v1/therapistUser.controllers.js";


// export default async function handler(req, res) {
//     if (req.method === 'POST') {
//         if (req.query.action === 'SignUpTherapist') {
//             return await SignUpTherapist(req, res);
//         } else if (req.query.action === 'SignInTherapist') {
//             return await SignInTherapist(req, res);
//         } else if (req.query.action === 'EditTherapistProfileData') {
//             return await EditTherapistProfileData(req, res);
//         }else if (req.query.action === 'EditTherapistServicesData') {
//             return await EditTherapistServicesData(req, res);
//         }
//     } else if (req.method === 'GET') {
//         if (req.query.action === 'GetTherapistProfileData') {
//             return await GetTherapistProfileData(req, res);
//         } else if (req.query.action === 'GetTherapistServicesData') {
//             return await GetTherapistServicesData(req, res);
//         }
//     }

//     res.status(405).json({ message: 'Method Not Allowed' });
// }