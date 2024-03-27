const Post = require("../models/postModels")
const User = require("../models/userModels")
const path = require("path")
const fs = require("fs")
const { v4: uuid } = require("uuid")
const HttpError = require("../models/errorModels")
const { getUri } = require("../cloudinary/dataUrl")
const { cloudinary, uploadThumbnail } = require('../cloudinary/cloudinary');

// CREATE A NEW POST

const createPost = async (req, res, next) => {
    try {
        const { title, category, description } = req.body;
        if (!title || !category || !description || !req.file) return next(new HttpError("Fill in all fields and choose a thumbnail", 422))
        const file = req.file;
        // const { thumbnail } = req.files

        // if (thumbnail.size > 20000000) return next(new HttpError("Thumbnail size should be less than 2mb", 422))
        if (file.size > 20000000) return next(new HttpError("Thumbnail size should be less than 2mb", 422))
        if (description.size < 60) {
            console.log(description.size);
            return next(new HttpError("Description length should be atleast 60 character"))
        }
        // const filename = thumbnail.name;
        // const splittedFilename = filename.split(".")
        // const newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]

        const dataUri = getUri(file);
        await cloudinary.uploader.upload(dataUri, uploadThumbnail, async (err, result) => {
            if (err) return next(new HttpError(err));
            else {
                const { public_id, url } = result;
                const newPost = await Post.create({ title, category, description, thumbnail: { public_id, url }, creator: req.user.id })
                if (!newPost) return next(new HttpError("Post couldn't be created", 422));

                const currUser = await User.findById(req.user.id);
                const userPostCount = currUser.posts + 1;

                await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })
                res.status(201).json(newPost)
            }
        })


        // thumbnail.mv(path.join(__dirname, "..", '/uploads', newFilename), async (err) => {
        //     if (err) return next(new HttpError(err))
        //     else {
        //         const newPost = await Post.create({ title, category, description, thumbnail: newFilename, creator: req.user.id })
        //         if (!newPost) return next(new HttpError("Post couldn't be created", 422));

        //         const currUser = await User.findById(req.user.id);
        //         const userPostCount = currUser.posts + 1;

        //         await User.findByIdAndUpdate(req.user.id, { posts: userPostCount })
        //         res.status(201).json(newPost)
        //     }
        // })


    } catch (error) {
        return next(new HttpError(error))
    }

}

// GET A POST
const getPost = async (req, res, next) => {
    try {
        const postId = req.params.id;
        const post = await Post.findById(postId);
        if (!post) return next(new HttpError("Post not found", 404))
        res.status(200).json(post);
    } catch (error) {
        return next(new HttpError("Post not found. Check your postId once again", 404))
    }

}

// GET ALL POSTS
const getPosts = async (req, res, next) => {
    try {
        const posts = await Post.find().sort({ updateAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}


// GET POSTS BY CATEGORY
const getCatPost = async (req, res, next) => {
    try {
        const { category } = req.params
        const catPosts = await Post.find({ category }).sort({ createdAt: -1 });
        res.status(200).json(catPosts);
    } catch (error) {
        return next(new HttpError(error))
    }
}

// GET AUTHOR/USER POST
const getUserPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const posts = await Post.find({ creator: id }).sort({ updateAt: -1 })
        res.status(200).json(posts)
    } catch (error) {
        return next(new HttpError(error))
    }
}

// GET EDIT POST
const editPost = async (req, res, next) => {
    try {

        let updatedPost, filename;
        const postId = req.params.id
        const { title, category, description } = req.body
        const oldPost = await Post.findById(postId)
        if (!title || !category) return next(new HttpError("Fill in all fields", 402))

        if (description.length < 60)  return next(new HttpError("Description length should be atleast 60 character"))
        
        if (req.user.id == oldPost.creator) {

            if (!req.file) {
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description }, { new: true })
            }
            else {
                await cloudinary.uploader.destroy(oldPost.thumbnail.public_id, async (err) => {
                    if (err) return next(new HttpError(err));
                })

                // fs.unlink(path.join(__dirname, '..', 'uploads', oldPost.thumbnail), async (err) => {
                //     if (err) return next(new HttpError(err))
                // })
                // const { thumbnail } = req.files;
                const file = req.file
                if (file.size > 2000000) return next(new HttpError("Thumbnail size should be less than 2mb", 403));

                // if (thumbnail.size > 2000000) return next(new HttpError("Thumbnail size should be less than 2mb", 403));
                const dataUri = getUri(file);
                const { public_id, url } = await cloudinary.uploader.upload(dataUri, uploadThumbnail, async (err) => {
                    if (err) return next(new HttpError(err));
                })
                updatedPost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail: { public_id, url } }, { new: true })
                // res.status(201).json(newPost)

                // filename = thumbnail.name;
                // const splittedFilename = filename.split(".")
                // const newFilename = splittedFilename[0] + uuid() + "." + splittedFilename[splittedFilename.length - 1]
                // thumbnail.mv(path.join(__dirname, '..', 'uploads', newFilename), async (err) => {
                //     if (err) return next(new HttpError(err))

                // })
                // updatePost = await Post.findByIdAndUpdate(postId, { title, category, description, thumbnail }, { new: true });
            }
            if (!updatedPost) return next(new HttpError("Couldn't update post", 400))
            res.status(200).json(updatedPost);
        }
    } catch (error) {

    }
}

// DELETE POST
const deletePost = async (req, res, next) => {

    try {
        const postId = req.params.id
        if (!postId) {
            return next(new HttpError("Post unavailable", 400))
        }
        const post = await Post.findById(postId);
        const { public_id } = post.thumbnail;

        if (req.user.id == post.creator) {

            await cloudinary.uploader.destroy(public_id, async (err) => {
                if (err) return next(new HttpError(err));
                await Post.findByIdAndDelete(postId);
                const currUser = await User.findById(post.creator)
                const userPostsCount = currUser.posts - 1;
                await User.findByIdAndUpdate(post.creator, { posts: userPostsCount })
            })
            // fs.unlink(path.join(__dirname, "..", "uploads", filename), async (err) => {
            //     if (err) return next(new HttpError(err));
            //     await Post.findByIdAndDelete(postId)
            //     const currUser = await User.findById(post.creator)
            //     const userPostsCount = currUser.posts - 1;
            //     await User.findByIdAndUpdate(post.creator, { posts: userPostsCount })
            // })
            res.json(`Post ${postId} deleted successfully`)
        }


    } catch (error) {
        return next(HttpError(error))
    }
}

module.exports = { deletePost, editPost, createPost, getCatPost, getPost, getUserPost, getPosts }