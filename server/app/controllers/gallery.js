var express = require('express'),
    router = express.Router(),
    logger = require('../../config/logger'),
    passportService = require('../../config/passport'),
    passport = require('passport'),
    multer = require('multer'),
    mkdirp = require('mkdirp'),
    thumb = require('node-thumbnail').thumb,
    path = require('path');

var mongoose = require('mongoose');
var Gallery = mongoose.model('MyModelGallery');

module.exports = function (app, config) {
    app.use('/api', router);

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            var path = config.uploads + req.params.userId + "/";
            mkdirp(path, function(err) {
                if(err){
                    res.status(500).json(err);
                } else {
                    cb(null, path);
                }
            });
        },
        filename: function (req, file, cb) {
            let fileName = file.originalname.split('.');
            cb(null, fileName[0] + new Date().getTime() + "." + fileName[fileName.length - 1]);
        }
    });

    var upload = multer({ storage: storage,
        fileFilter: function(req, file, cb) {
            var ext = path.extname(file.originalname);
            if (ext !== '.png' && ext !== '.jpg' && ext !== '.jpeg') {
                return cb(res.end('Only images are allowed'), null);
            }
            cb(null, true);
        }
    });

    router.post('/galleries/upload/:userId/:galleryId', upload.any(), function(req, res, next){
        logger.log('Upload file for gallery ' + req.params.galleryId + ' and ' + req.params.userId, 'verbose');

        Gallery.findById(req.params.galleryId)
            .then(async gallery => {
                if(req.files){
                    await req.files.forEach(picture => {
                        thumb({
                            source: config.uploads + req.params.userId + "/" + picture.filename,
                            destination: config.uploads + req.params.userId + "/",
                            width: 200,
                            prefix: 'thumb_',
                            suffix: '',
                        }, (files, err, stdout, stderr) => {
                            console.log('Thumbnail made for image.');
                        }, (err) => {
                            console.log('Error making thumbnail.');
                        });
                    });

                    req.files.forEach(picture => {
                        gallery.file.push({
                            filename: picture.filename,
                            thumbFile: 'thumb_' + picture.filename,
                            originalName: picture.originalname,
                            dateUploaded: new Date()
                        });
                    });

                    Gallery.findByIdAndUpdate(req.params.galleryId, gallery, {new:true, multi:false})
                        .then((gallery) => {
                            res.status(200).json(gallery);
                        })
                        .catch((error) => {
                            return next(error);
                        });
                } else {
                    console.log('no files');
                }
            })
            .catch(error => {
                return next(error);
            });
    });

    router.get('/galleries/user/:userId/:fileName', function (req, res) {
        res.sendFile(config.root + '/public/uploads/' + req.params.userId + '/' + req.params.fileName);
    });

    router.get('/galleries/user/:userId', function (req, res, next) {
        logger.log('Get all galleries for a user', 'verbose');

        Gallery.find()
            .where('user')
            .equals(req.params.userId)
            .sort(req.query.order)
            .exec()
            .then(result => {
                if(result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: "No galleries"});
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.post('/galleries', function (req, res, next) {
        logger.log('Create gallery', 'verbose');
        var gallery = new Gallery(req.body);

        gallery.save().then(result => {
            res.status(201).json(result);
        }).catch(err => {
            return next(err);
        });
    });

    router.get('/galleries', function (req, res, next) {
        logger.log('Get all galleries', 'verbose');

        Gallery.find()
            .sort(req.query.order)
            .exec()
            .then(result => {
                if(result && result.length) {
                    res.status(200).json(result);
                } else {
                    res.status(404).json({message: "No galleries"});
                }
            })
            .catch(err => {
                return next(err);
            });
    });

    router.get('/galleries/:galleryId', function (req, res, next) {
        logger.log('Get gallery' + req.params.id, 'verbose');

        Gallery.findById(req.params.galleryId)
            .then(gallery => {
                if(gallery){
                    res.status(200).json(gallery);
                } else {
                    res.status(404).json({message: "No gallery found"});
                }
            })
            .catch(error => {
                return next(error);
            });

    });

    router.put('/galleries/:galleryId', function (req, res, next) {
        logger.log('Update gallery' + req.params.id, 'verbose');

        Gallery.findOneAndUpdate({_id: req.params.galleryId}, req.body, {new:true, multi:false})
            .then(gallery => {
                res.status(200).json(gallery);
            })
            .catch(error => {
                return next(error);
            });
    });

    router.delete('/galleries/:galleryId', function (req, res, next) {
        logger.log('Delete gallery' + req.params.id, 'verbose');

        Gallery.remove({ _id: req.params.galleryId })
            .then(gallery => {
                res.status(200).json({msg: "Gallery Deleted"});
            })
            .catch(error => {
                return next(error);
            });
    });

};
