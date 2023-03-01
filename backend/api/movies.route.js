import express from 'express';

const router = express.Router();
// This is where all the routes are defined
router.route('/').get((req, res) => res.send('hello world'));

export default router;
