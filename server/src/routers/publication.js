const { Router } = require('express');
const path = require('path');
const multer = require('multer');

const { PORT, HOST } = require('../config');
const publication = require('../models/publication');
const cors = require('cors');
const router = Router();

//settings multer
let storage = multer.diskStorage({
    destination: path.join(__dirname, '../public', 'publications'),
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

//midlewars
router.use(cors({origin: `${HOST}:8080`}));

router.get('/', async (req, res)=>{
    const allPublications = await publication.find();
    res.json(allPublications).end();
});

router.post('/',upload.single('publication'), async (req, res)=>{
        let {name, email, idUser} = req.body;
        let url = `${HOST}:${PORT}/public/publications/${req.file.filename}`;
        const newPublication = new publication({name, email, idUser, url});
        await newPublication.save();
        res.json({status: 200}).end();
    });

router.route('/:id')
    .get(async (req, res)=>{
        const readPublications = await publication.find({idUser: req.params.id});
        res.json(readPublications).end();
    })
    .put(upload.single('publication'),async (req, res)=>{
        let {name, email, idUser} = req.body;
        let url = `${HOST}:${PORT}/public/publications/${req.file.filename}`;
        await publication.findByIdAndUpdate(req.params.id, {name, email, idUser, url});
        res.json({status: 200}).end();
    })
    .delete(async (req, res)=>{
        await publication.findByIdAndRemove(req.params.id);
        res.send('ok').end();
    });

router.get('/read/:id', async (req, res)=>{
    const readPublication = await publication.findById(req.params.id);
    res.json(readPublication).end();
})

module.exports = router;