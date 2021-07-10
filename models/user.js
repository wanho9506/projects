const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true,
    },
    name: {
        type: String,
        require: true,
        
    },
    password: String,

//회원정보 등록에 이미지는 나중에.

    sex: String,
    birth:Date,
    phone: String,
      
});


UserSchema.virtual('userId').get(function () {
    return this._id.toHexString();
});
UserSchema.set('toJSON', {
    virtuals: true,
});
//_id 값을 바로 가지게 함.

module.exports = mongoose.model('User', UserSchema);

