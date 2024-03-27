const { Router } = require("express")
const { deletePost, editPost, createPost, getCatPost, getPost, getUserPost, getPosts } = require("../controllers/postsController")
const router = Router();
const authMiddleware = require("../middleware/authMiddleware")
const { getUri } = require('../cloudinary/dataUrl');
const { cloudinary, uploadThumbnail } = require('../cloudinary/cloudinary');
const {upload} = require('../cloudinary/multer')




// router.post('/test',upload,async (req, res) => {
    //     // const upload = multer({ storage }).single("file");
    //     try {
        
        //         const file = req.file;
        //         console.log(file.size);
        
        //         if (!file) {
            //             return res.status(400).json({ message: "No file uploaded" });
            //         }
            
            //         // Convert file data to data URI
            //         const dataUri = getUri(file);
            
            //         // Upload data URI to Cloudinary
            //         const cloudinaryResponse=await cloudinary.uploader.upload(dataUri,uploadThumbnail,async(err,result)=>{
                //            const {url,public_id} = result;
                
                //         });
                
                
                //         // Respond with Cloudinary upload result
                //         // res.json(cloudinaryResponse);
                //         await cloudinary.uploader.destroy(cloudinaryResponse.public_id);
                //         res.json(cloudinaryResponse);
                
                //     } catch (error) {
                    //         res.status(500).json({ error: error.message });
//     }
//     // Process the file upload after this line

// });

router.post('/',upload, authMiddleware, createPost)
router.get('/', getPosts)
router.patch('/:id',upload, authMiddleware, editPost)
router.get('/categories/:category', getCatPost)
router.get('/:id', getPost)
router.get('/user/:id', getUserPost)
router.delete('/:id', authMiddleware, deletePost)

module.exports = router;