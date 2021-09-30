const mongoose = require("mongoose");
//const user = require("../models/user");
const List = mongoose.model("List");
const User = mongoose.model("User");
const Rating = mongoose.model("Rating");
const bodyParser = require("body-parser")

var mongoosePaginate = require('mongoose-paginate');

exports.createList = async (req, res) => {
  const { title,description, track, category} = req.body;
  const userId = req.payload.id;
  const listExist = await List.findOne({ title });
  if (listExist) throw "form with that name already exists!";
  const list = new List({
    userId,
    title, 
    description,
    track,
    category
  });
  await list.save();
  res.json({message: "list created!",
  });
};

exports.getAllList = async (req, res) => {
    try{
        const lists = await List.find({}).populate();
        res.json(lists);
    } catch(err){
        console.log(err)
    }
    
};

exports.getAllListAdmin = async (req, res) => {
    try{
        const id=req.params.id;
        const pageno=req.query.page;
        const limitno =parseInt(req.query.limit);
        //console.log(page,limit)
        const user = await User.findById(id);
        //console.log(user);
        if(user.role=="admin"){
            await List.paginate({},{page:pageno,limit:limitno} ,function(err, result){
                if(err){
                    res.json(err)
                }else{
                    res.json(result)
                }

            });
            
        } else if(user.role=="user"){
            res.json("admin role required")
        }
         
    } catch(err){
        console.log(err)
    }
    
};


exports.getList = async (req, res) => {
    const id = req.params.id;
    let list = await List.findById(id);
    res.json(list);
    
};
exports.getUserList = async (req, res) => {
    
    const userId = req.params.userId
    //console.log(userId)
    let list = await List.find({"userId":userId});
    res.json(list);
    
};

exports.deleteList = async (req, res) => {
    const id = req.params.id;
    //console.log(id);
    

    await List.findByIdAndDelete(id);
    res.json(`id ${id} list has been deleted`);
};



exports.updateList = async (req, res) => {
    try{
        const id = req.params.id;
        const updated= await List.findByIdAndUpdate(id, req.body, {new: true})
        res.json({ message: updated });
    } catch(err){
        console.log(err)
    }
    
};
//-----------------------------------------------------------------------
exports.getAllByFilter = async (req, res) => {
    try{
        let cat =req.query.category;
        let title= req.query.title
        let sort = req.query.sort
        if(sort=="new"){
            if(cat){
                let listByCat= await List.find({"category": cat}).sort({createdAt:-1})
                res.json({message:`list by ${cat}`,listByCat});
            } else if(title){
                let listByTitle= await List.find({"title": title}).sort({createdAt:-1})
                res.json({message:`list by ${cat}`,listByTitle});
            }else{
                let lists = await List.find({}).sort({createdAt:-1});
            res.json(lists);
            }
        } else if (sort=="old"){
            if(cat){
                let listByCat= await List.find({"category": cat}).sort({createdAt:1})
                res.json({message:`list by ${cat}`,listByCat});
            } else if(title){
                let listByTitle= await List.find({"title": title}).sort({createdAt:1})
                res.json({message:`list by ${cat}`,listByTitle});
            }else{
                let lists = await List.find({}).sort({createdAt:1});
            res.json(lists);
            }
        } else if (cat){
            let listByCat= await List.find({"category": cat}).sort({createdAt:1})
            res.json({message:`list by ${cat}`,listByCat});
        } else if(title){
            let listByTitle= await List.find({"title": title}).sort({createdAt:1})
            res.json({message:`list by ${cat}`,listByTitle});
        }else{
            let lists = await List.find({});
        res.json(lists);
        }
    } catch(err){
        console.log(err)
    }
    
};
//---------------------------------------------------------------------------

exports.getUserList2 = async (req, res) => {
    const userId = req.payload.userId
    //console.log(userId)
    let list = await List.find({"userId":userId});
    res.json(list);
};

exports.likeList = async(req,res) =>{
    const userId= req.payload.id;
    const listId=req.params.id;
    await List.findByIdAndUpdate(listId,{$push:{like:userId}},{new:true}).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    });
}
exports.unlikeList = async(req,res) =>{
    const userId= req.payload.id;
    const listId=req.params.id;
    await List.findByIdAndUpdate(listId,{$pull:{like:userId}},{new:true}).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    });
}
exports.addrating= async(req,res)=>{
    try{
        const listId=req.params.id;
        const userId=req.payload.id;
        const {comment,rate}=req.body;
        const rating  = new Rating({
            userId,
            listId, 
            comment,
            rate
        });
        await rating.save();
        await List.findByIdAndUpdate(listId,{$push:{rating:rating}},{new:true}).exec((err,result)=>{
            if(err){
                res.status(422).json({error:err});
            }else{
                res.json(result,rating);
            }
        });
    }catch(err){
        console.log(err)}
};

exports.getbyRating = async (req, res) => {
    try{
        let userId =req.payload.id;
        let like= req.query.like
        let rating = req.query.rating
        if(like=="yes"){
            let list = await List.aggregate.sortByCount(likes);
            res.json(list)
        }else if(rating=="yes"){
            let list = await List.aggregate.sortByCount(rating);
            res.json(list)
        }else{
            res.json("put either like or rating as yes")
        }
    }catch(err){
        res.json(err)
    }
}

exports.doneList = async(req,res) =>{
    const userId= req.payload.id;
    const listId=req.params.id;
    await List.find({userId:userId,track:true}).exec((err,result)=>{
        if(err){
            res.status(422).json({error:err});
        }else{
            res.json(result);
        }
    });
}
 