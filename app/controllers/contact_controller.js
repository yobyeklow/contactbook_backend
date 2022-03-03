const handlePromise = require("../helpers/promise_helper");
const mongoose = require('mongoose');
const handlePromise = require("../helpers/promise.helper");
const Contact = require('../models/contact.model');


exports.create = async function(req,res,next){
    if(!req.body.name){
        return next(new BadRequestError (400,"Name can not be empty"));
    }
    const contact = new Contact ({
        name:req.body.name,
        email:req.body.email,
        address:req.body.address,
        phone:req.body.phone,
        favorite:req.body.favorite === true,
    });

    const [error,document] = await handlePromise(contact.save());

    if (error){
        return next(new BadRequestError(500,"An error occurred while creating the contact"))
    }
    return res.send(document);
}
exports.findAll = async function(req,res,next){
    const condition = {};
    const {name} = req.query;
    if (name){
        condition.name = {$regex: new RegExp(name), $option:"i"};
    }

    const [error,document] = await handlePromise(Contact.find(condition));

    if(error){
        return next (new BadRequestError(500,"An error occurred while creating the contact"))
    }

    return res.send(documents);
}
exports.findAllFavorite = async function(req,res,next){
    const [error,documents] = await handlePromise(Contact.find({favorite:true,}))
    if(error){
        return next(new BadRequestError(500,"An error occurred while retrieving favorite contacts"));
    }
    return res.send (documents);
}
exports.findOne = async function(req,res,next){
    const {id} = req.params;
    const condition = {
        _id: id && mongoose.isValidObjectId(id) ? id:null,
    };

    const [error,document] = await handlePromise(Contact.findOne(condition));

    if (error){
        return next (new BadRequestError(500,`Error retrieving contact with id=${req.params.id}`));
    }
    if (!document){
        return next(new BadRequestError(404,"Contact not found"));
    }
    return res.send(document);
}
exports.update = async function(req,res,next){
    if (Object.keys(req.body).length === 0){
        return next(new BadRequestError(400,"Data to update can not be empty"));
    }
    const {id}= req.params;
    const condition ={
        _id:id&&mongoose.isValidObjectId(id)?id:null,
    }
    const [error,document] = await handlePromise(
        Contact.findOneandUpdate(condition,req.body,{
            new:true,
        })
    );
  
    if (error){
        return next (new BadRequestError(500,`Error updating contact with id=${req.params.id}`));
    }
    if (!document){
        return next(new BadRequestError(404,"Contact not found"));
    }
    return res.send({message:"Contact was update successfully"});
}
exports.delete = async function(req,res,next){
    const {id} = req.params;
    const condition = {
        _id:id && mongoose.isValidObjectId(id) ? id:null,
    };
    const [error,document] = await handlePromise(
        Contact.findOneAndDelete(condition)
    );
    if (error){
        return next (new BadRequestError(500,`Could not delete contact with id=${req.params.id}`));
    }
    if (!document){
        return next(new BadRequestError(404,"Contact not found"));
    }
    return res.send ({message:"Contact was deleted successfully"});
}
exports.deleteAll = async function(req,res,next){
    const [error,data]= await handlePromise(
        Contact.deleteMany({})
    );
    if(error){
        return next(new BadRequestError(500,"An error occcured while removing all contacts"));
    }
    return res.send({
        message: `${data.deleteCount} contacts were deleted successfully`,
    });
};