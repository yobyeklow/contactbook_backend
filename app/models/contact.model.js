const mongoose = require('mongoose');

const schema = mongoose.schema(
    {
        name:{
            type:String,
            required:[true,"Contact name is required"],
        },
        email:{
            type:String,
            trim:true,
            lowercase:true
        },
        address:String,
        phone:String,
        favourite:Boolean,
    },
    {
        timestamp:true
    }
);

schema.method("toJSON", function(){
    const {__v,_id, ...object} = this.toObject();
    object.id = id;
    return object;
});

module.exports = mongoose.model ("contact",schema);