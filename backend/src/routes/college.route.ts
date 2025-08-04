import { Router } from 'express';
import { 
  getAllColleges, 
  createCollege, 
  getCollegeById,
  updateCollege, // <-- Import update
  deleteCollege  // <-- Import delete
} from '../controllers/college.controller';

const router = Router();

router.route('/')
  .get(getAllColleges)
  .post(createCollege);

// Chain all methods for the /:id route
router.route('/:id')
  .get(getCollegeById)
  .put(updateCollege)
  .delete(deleteCollege);

export default router;
