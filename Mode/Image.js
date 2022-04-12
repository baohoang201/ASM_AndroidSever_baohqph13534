const mongoose = require('mongoose')

const Image = mongoose.Schema({
    tenAnh:{
        type: String,
        required: [true , 'khong duoc de chong ten anh'],
        trim: true,
    },
    noiDung:{
        type: String,
        required: [true , 'khong duoc de chong noi dung'],
        trim: true,
    },
    linkAnh: {
        type: String,
        required: [true , 'khong duoc de chong link anh'],
        trim: true,
    }
})


module.exports = mongoose.model('Image' , Image)

