import express from 'express';
import * as controller from '../controllers/smogController.js';
// import { authenticateToken } from '../utils/auth.js';

// สร้าง instance ของ Router จาก Express เพื่อใช้ในการกำหนดเส้นทาง (routes) สำหรับ API
const router = express.Router();
//  const smogRouter = express.Router();


/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: ดึงรายชื่อผู้ใช้ทั้งหมด
 *     responses:
 *       200:
 *         description: รายชื่อผู้ใช้
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   username:
 *                     type: string
 *                   password:
 *                     type: string
 *                   email:
 *                     type: string
 *                   status:
 *                     type: string
 */
router.get('/users', (req, res) => {
    // res.json([{ id: 1, name: 'John Doe' }]);
    controller.getUsers(req, res);
  });

  export default router;
  