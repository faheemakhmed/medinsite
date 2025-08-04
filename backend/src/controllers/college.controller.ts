import { Request, Response } from 'express';
import { College } from '../models/college.model';
import mongoose from 'mongoose';

//--------------------------------------------------------------------------------------------------

// @desc    Get all colleges
// @route   GET /api/colleges
// @access  Public
export const getAllColleges = async (req: Request, res: Response) => {
  try {
    const colleges = await College.find({});
    res.status(200).json(colleges);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching colleges', error });
  }
};

//--------------------------------------------------------------------------------------------------

// @desc    Create a new college
// @route   POST /api/colleges
  // @access  Private (will be later)
export const createCollege = async (req: Request, res: Response) => {
  try {
    // Get the data from the request body
    const { name, state, city, yearOfEstablishment } = req.body;

    // Create a new college document in the database
    const newCollege = await College.create({
      name,
      state,
      city,
      yearOfEstablishment,
    });

    res.status(201).json(newCollege); // 201 means "Created"
  } catch (error) {
    res.status(400).json({ message: 'Error creating college', error }); // 400 means "Bad Request"
  }
};

//--------------------------------------------------------------------------------------------------

// @desc    Get a single college by ID
// @route   GET /api/colleges/:id
// @access  Public
export const getCollegeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params; // Get the ID from the URL parameters

    // Check if the ID is a valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid College ID format' });
    }

    const college = await College.findById(id);

    if (!college) {
      return res.status(404).json({ message: 'College not found' }); // 404 means "Not Found"
    }

    res.status(200).json(college);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching college', error });
  }
};

//--------------------------------------------------------------------------------------------------

// @desc    Update a college by ID
// @route   PUT /api/colleges/:id
// @access  Private (will be later)
export const updateCollege = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid College ID format' });
    }

    const updatedCollege = await College.findByIdAndUpdate(id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Run schema validators on update
    });

    if (!updatedCollege) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.status(200).json(updatedCollege);
  } catch (error) {
    res.status(400).json({ message: 'Error updating college', error });
  }
};

//--------------------------------------------------------------------------------------------------

// @desc    Delete a college by ID
// @route   DELETE /api/colleges/:id
// @access  Private (will be later)
export const deleteCollege = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid College ID format' });
    }

    const deletedCollege = await College.findByIdAndDelete(id);

    if (!deletedCollege) {
      return res.status(404).json({ message: 'College not found' });
    }

    res.status(200).json({ message: 'College deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting college', error });
  }
};