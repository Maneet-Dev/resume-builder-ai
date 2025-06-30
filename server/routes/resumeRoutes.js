const express = require('express');
const router = express.Router();
const Resume = require('../models/Resume');

router.post('/', async (req,res) => {
    try {
        const newResume = new Resume(req.body);
        const saved = await newResume.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({error : err.message});
    }
});

router.get('/', async (req,res) => {
    try {
        const resumes = await Resume.find();
        res.json(resumes);
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

router.get('/:id', async (req,res) => {
    try {
        const resume = await Resume.findById(req.params.id);
        if(!resume) {
            return res.status(404).json({message:'resume not found'});
        }
        res.json(resume);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Server error'});
    }
});

router.put('/:id', async (req,res) => {
    try {
        const updatedResume = await Resume.findByIdAndUpdate(req.params.id,req.body, {new:true, runValidators: true});
        if (!updatedResume) {
            return res.status(404).json({message:'resume not found'});
        }
        res.json(updatedResume);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
    }
});

router.delete('/:id', async (req,res) => {
    try {
        const deletedResume = await Resume.findByIdAndDelete(req.params.id);

        if(!deletedResume) {
            return res.status(404).json({message:'Resume not found'});
        }

        res.json({message: 'Resume deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({message:'Server error'});
    }
});

module.exports = router;