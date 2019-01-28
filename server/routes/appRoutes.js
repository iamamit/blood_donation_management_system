var express=require('express');
var jwt=require('jsonwebtoken');
var session=require('express-session');
var cookieParser=require('cookie-parser');
var router =express.Router();

var user=require('../models/dataSchema');


router.use(cookieParser());
router.use(session({secret:"secret Key"}));

router.get('/checksession',(req,resp)=>{
    req.session['check']="Session checked";
         console.log(req.session);
     resp.send(req.session);
});
router.post('/create',(req,resp,next)=>{
    var newUser=new user({
    name:req.body.name,
    email:req.body.email,
    password:req.body.password,
    bloodgroup:req.body.bloodgroup,
    address:req.body.address,
    contact:req.body.contact,
    role:req.body.role

    });
    
    newUser.save((err,country)=>{
        if(err)
        resp.status(500).json({errmsg:err});
        else{
            
            let payload={subject:user._id};
            let token=jwt.sign(payload,'secretKey');
           
        resp.status(200).send({token});
        
        }
    });

  
});



  router.get('/donor/read',(req,resp,next)=>{
      
      user.find({role:'donor'},(err,user)=>{
         if(err)
           resp.status(500).json({errmsg:err});
           resp.status(200).json({msg:user});       
      });
   
  });

  router.post('/donor/blood/read',(req,resp,next)=>{
    let bloodgroup=req.body.bloodgroup;
    console.log("blood group is "+bloodgroup);


    
      if(bloodgroup==" " || bloodgroup==undefined )
      {
        user.find({role:'donor'},(err,user)=>{
            if(err)
              resp.status(500).json({errmsg:err});
              resp.status(200).json({msg:user});       
         }); 
      }
      else{
      user.find({role:'donor',bloodgroup:bloodgroup},(err,user)=>{
          if(err)
            resp.status(500).json({errmsg:err});
            resp.status(200).json({msg:user});       
       });   
    }
 
});



  router.post('/getdonor',(req,resp,next)=>{
    user.find({email:req.body.email},(err,user)=>{
       if(err)
         resp.status(500).send(err);
         resp.status(200).send(user);       
    });
 
});

  router.post('/requestdonor',(req,resp,next)=>{
      const donorEmail=req.body.donorEmail;
      const acceptorEmail=req.body.acceptorEmail;
    user.update({email:acceptorEmail},{$addToSet:{list:donorEmail}},(err,user)=>{
       if(err)
         resp.status(500).send(err);
         const list=user.list;
         console.log(list)
         resp.status(200).send(user);       
    });
 
});

  router.post('/acceptor/read',(req,resp,next)=>{
    let email=req.body.email;
    user.find({role:'donor',email:email},(err,data)=>{
       if(err)
       resp.send('err : '+err);
       let accUser=[]
       for(var i=0;i<data[0].list.length;i++)
       {
           accUser.push(data[0].list[i]);
       }
       console.log(accUser);
       user.find({email:{$in:accUser}},(err2,data2)=>{
         if(err2)
         resp.send('err2 : '+err2);
         resp.send(data2);
       })
    })
  
    });


   
    
    router.post('/authenticate',(req,resp,next)=>{
        const email=req.body.email;
        const password=req.body.password;
        user.find({email:email,password:password},(err,user)=>{
            if(err)
              resp.status(500).json({errmsg:err});
            else if(!user || user.length==0)
            {
                resp.status(501).json({errmsg:err});
            }
        
            else{
               
                
                req.session['role']=user[0].role;
                let role=req.session['role'];
                console.log(role);
                let payload={subject:user._id};
                let token=jwt.sign(payload,'secretKey');
                const body={token,role}
              resp.status(200).send(body);   
            }    
         });

     
        });

        router.post('/findrole',(req,resp,next)=>{
            const email=req.body.email;
            
            user.find({email:email},(err,user)=>{
                if(err)
                  resp.status(500).json({errmsg:err});
                else if(!user || user.length==0)
                {
                    resp.status(501).json({errmsg:err});
                }
            
                else{
                    
                  resp.status(200).send(user);   
                }    
             });
    
         
            });
   
    router.put('/update',(req,resp,next)=>{
        user.findById(req.body._id,(err,user)=>{
           if(err)
           resp.status(500).json({errmsg:err});
           user.name=req.body.name;
           user.email=req.body.email;
           user.password=req.body.password;
           user.bloodgroup=req.body.bloodgroup;
           user.address=req.body.address;
           user.contact=req.body.contact;
           user.role=req.body.role;
           resp.status(200).json({msg:user});
        });
      
        });


        //db.test.update({name:"Amit"},{$push:{list:"four"}});

       
     


            router.post('/acceptor/approve',(req,resp,next)=>{
                const donorEmail=req.body.donorEmail;
                const acceptorEmail=req.body.acceptorEmail;
                console.log(acceptorEmail);
                console.log(donorEmail);
              user.update({email:donorEmail},{$addToSet:{list_approve:acceptorEmail}},(err,user)=>{
                 if(err)
                   resp.status(500).send(err);
                   const list=user.list_donor;
                   console.log(user.email)
                   resp.status(200).send(user);       
              });
           
          });

          router.post('/acceptor/mydonors',(req,resp,next)=>{
            const email=req.body.email;
            user.find({email:email},(err,data)=>{
                if(err)
                  resp.status(500).send(err);
                //  console.log(data.list_approve);
                  
                  let appDonor=[];
                  for(var i=0;i<data[0].list_approve.length;i++)
                  {
                    appDonor.push(data[0].list_approve[i]);
                    console.log(data[0].list_approve[i])
                  }
                  console.log(appDonor);
                  user.find({email:{$in:appDonor}},(err2,data2)=>{
                    resp.status(200).send(data2); 
                  });
                  //resp.status(200).send(data[0].list_approve);
                   
            });
       
      });
    
    module.exports=router;
