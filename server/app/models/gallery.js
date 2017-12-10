var Mongoose = require('mongoose');
var Schema = Mongoose.Schema;

var GallerySchema = new Schema({
    user: {type: Schema.Types.ObjectId, required: true},
    name: {type: String, required: true},
    dateCreated: {type: Date, default: Date.today},
    file: [{
        filename: String,
        thumbFile: String,
        originalName: String,
        dateUploaded: Date
    }]
});

module.exports =
    Mongoose.model('MyModelGallery', GallerySchema);
