const express=require('express');
var app = express();
const mongoose=require('mongoose');
const session = require("express-session");
var bodyParser = require("body-parser");
const User=require('./schema');
const { default: axios } = require('axios');
const request=require('request');
const cheerio=require('cheerio');



const DB='mongodb+srv://saikatgitcrawler:saikat123@cluster0.32zog.mongodb.net/gitcrawler?retryWrites=true&w=majority';
mongoose.connect(DB,
    {
        useNewUrlParser:true,
        useCreateIndex:true,
        useUnifiedTopology:true,
        useFindAndModify:false
    }).then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err);
});


app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.post('/signup',async(req,res)=>{
    console.log("hitting from react with signup");
    var email=req.body.email;
    var password=req.body.password;
    var cpassword=req.body.cpassword;
    if(!email || !password  || !cpassword){
        return res.status(422).json({status:"Plz fill all the form"});
    }
    else if(!email.includes("@")){
        return res.json({status:"Invalid email"});
    }
    else if(password != cpassword){
        return res.status({status:"Password must be same"});
    }
    try{
        var exist=await User.findOne({email:email});
        if(exist){
            return res.status(200).json({status:"Email already in Use"});
        }
        else{
            var user= new User({
                email:email,
                password:password
            });
            var saved=await user.save();
            if(saved){
                console.log("User Saved successfully");
                return res.status(200).json({status:"User Saved Successfully"});
            }
        }

    }
    catch(err){
        console.log(err);
    }
})


app.post('/login',async(req,res)=>{
    console.log("hitting from react with login");
    var email=req.body.email;
    var password=req.body.password;
    if(!(email && password)){
        return res.json({status:"Plz fill all the details"});
    }
    try{
        var exist= await User.findOne({email:email,password:password});
        if(exist){
            console.log("user exists");
            return res.status(200).json({status:"Logged In"});
        }
        else{
            console.log("not exist user");
            return res.status(200).json({status:"Invalid Email Or Password"});
        }

    }catch(err){
        console.log(err);
        return res.json({status:"error"});
    }
})


//Get users by name
app.post("/search",async(req,resp)=>{
    console.log("hitting search through axios");
    var name=req.body.users;
    //var url='https://github.com/search?q=riya&type=users';
    var url='https://github.com/search?q='+name+'&type=users';
    console.log(url);
    //request and cheerio
    request(url,(err,res,html)=>{
    if(!err && res.statusCode==200){
        const $=cheerio.load(html);
        
        var element=$('#user_search_results > div.Box.border-0').children();
        var userinfo=[];
       element.each((i,ele)=>{
            var nam=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-auto > div:nth-child(1) > div.f4.text-normal > a.mr-1').text();
            var username=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-auto > div:nth-child(1) > div.f4.text-normal > a.color-text-secondary').text();
            var location=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-auto > div.d-flex.flex-wrap.text-small.color-text-secondary > div').text().trim();
            var imgsrc=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-shrink-0.mr-2 > a > img').attr('src');
            var userobj={
                name:nam,
                username:username,
                location:location,
                imgsrc:imgsrc
            }
            userinfo.push(userobj)

        })
        console.log("printing user info",userinfo);
        return resp.status(200).json(userinfo);
    }
})
})


app.get("/usersearch/:name",async(req,resp)=>{
    var name=req.params.name;
    
    var link='https://github.com/'+name;
    console.log(link);
    request(link,(err,res,html)=>{
    if(!err && res.statusCode==200){
        const $=cheerio.load(html);
        
        var contribution=$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-9.mb-4.mb-md-0 > div:nth-child(2) > div > div.mt-4.position-relative > div.js-yearly-contributions > div > h2').text().trim();
        var image=$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.position-relative.d-inline-block.col-2.col-md-12.mr-3.mr-md-0.flex-shrink-0 > a > img').attr('src');
        var username=$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.clearfix.d-flex.d-md-block.flex-items-center.mb-4.mb-md-0 > div.vcard-names-container.float-left.col-12.py-3.js-sticky.js-user-profile-sticky-fields > h1 > span.p-nickname.vcard-username.d-block').text().trim();
        var followers=$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(1) > span').text().trim();
        var stars=$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(3) > span').text().trim();
        var following=$('#js-pjax-container > div.container-xl.px-3.px-md-4.px-lg-5 > div > div.flex-shrink-0.col-12.col-md-3.mb-4.mb-md-0 > div > div.d-flex.flex-column > div.js-profile-editable-area.d-flex.flex-column.d-md-block > div.flex-order-1.flex-md-order-none.mt-2.mt-md-0 > div > a:nth-child(2) > span').text().trim();
        var obj=[];
        var ob={
            image:image,
            username:username,
            followers:followers,
            stars:stars,
            following:following,
            contribution:contribution
        }
        obj.push(ob);
        console.log(obj); 
        return   resp.status(200).json(obj);
     
    }
})
});


app.get("/trendingrepo",async(req,resp)=>{
    
    request('https://github.com/trending',(err,res,html)=>{
    if(!err && res.statusCode==200){
        const $=cheerio.load(html);
        var element=$('#js-pjax-container > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2)').children();
        //console.log(element);
        var repoinfo=[];
        element.each((i,ele)=>{
            var reponame=$('#js-pjax-container > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article:nth-child('+(i+1)+') > h1 > a').text().trim();
            var aboutrepo=$('#js-pjax-container > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article:nth-child('+(i+1)+') > p').text().trim();
            var language=$('#js-pjax-container > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article:nth-child('+(i+1)+') > div.f6.color-text-secondary.mt-2 > span.d-inline-block.ml-0.mr-3 > span:nth-child(2)').text().trim();
            
            var stars=$('#js-pjax-container > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article:nth-child('+(i+1)+') > div.f6.color-text-secondary.mt-2 > a:nth-child(2)').text().trim();
                        
            var forked=$('#js-pjax-container > div.position-relative.container-lg.p-responsive.pt-6 > div > div:nth-child(2) > article:nth-child('+(i+1)+') > div.f6.color-text-secondary.mt-2 > a:nth-child(3)').text().trim();
            
            var repo={
                reponame:reponame,
                aboutrepo:aboutrepo,
                language:language,
                stars:stars,
                forked:forked
            }
            repoinfo.push(repo);
        })
        console.log(repoinfo);
        
        return resp.status(200).json(repoinfo);
     
    }
    else{
        console.log(error);
    }
})

});


//pagination

app.get("/pagination/:no/:users",async(req,resp)=>{
    var no=req.params.no;
    var users=req.params.users
    console.log(no);
    console.log(users);
    var url="https://github.com/search?p="+no+"&q="+users+"&type=Users";
    request(url,(err,res,html)=>{
        if(!err && res.statusCode==200){
            const $=cheerio.load(html);
            
            var element=$('#user_search_results > div.Box.border-0').children();
            var userinfo=[];
           element.each((i,ele)=>{
                var nam=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-auto > div:nth-child(1) > div.f4.text-normal > a.mr-1').text();
                var username=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-auto > div:nth-child(1) > div.f4.text-normal > a.color-text-secondary').text();
                var location=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-auto > div.d-flex.flex-wrap.text-small.color-text-secondary > div').text().trim();
                var imgsrc=$('#user_search_results > div.Box.border-0 > div:nth-child('+(i+1)+') > div.flex-shrink-0.mr-2 > a > img').attr('src');
                var userobj={
                    name:nam,
                    username:username,
                    location:location,
                    imgsrc:imgsrc
                }
                userinfo.push(userobj)
    
            })
            console.log("printing user info",userinfo);
            return resp.status(200).json(userinfo);
        }
    })
})

if ( process.env.NODE_ENV == "production"){

    app.use(express.static("my-app/build"));
}

const  port =  process.env.PORT || 5000;
app.listen(port, () => {
  console.log("server is listening");
});

