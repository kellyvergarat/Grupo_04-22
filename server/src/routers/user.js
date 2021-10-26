const { Router } = require('express');
const path = require('path');
const multer = require('multer');

const { PORT, HOST } = require('../config');
const user = require('../models/user');
const cors = require('cors');
const router = Router();

//settings multer
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public', 'avatars'),
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//midlewars
router.use(cors({origin: `${HOST}:8080`}));

router.post('/',upload.single('avatar'), async (req, res)=>{
        let {name, email, phone, country, city, password} = req.body;
        let avatar = req.file == undefined 
            ?`${HOST}:${PORT}/public/avatars/defaultavatar.png`
            :`${HOST}:${PORT}/public/avatars/${req.file.filename}`;
        const newUser = new user({name, email, phone, country, city, password, avatar});
        await newUser.save();
        const id = await user.find({email});
        res.json({status: 200, id: id[0]._id, userAvatar: id[0].avatar});
    });

router.route('/:id')
    .get(async (req, res)=>{
        const readUser = await user.findById(req.params.id);
        res.json(readUser).end();
    });

router.post('/sign-up', async (req, res)=>{
    const request = await user.find({email: req.body.email});
    if( request.length >= 1){
        request[0].password == req.body.password ? res.json({ status: 200, validation: true, id: request[0]._id}).end() : res.json({ status: 200, validation: false}).end();
    }else{
        res.json({ status: 404 }).end();
    }
});


module.exports = router;