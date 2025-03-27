import express from 'express';
import * as controller from '../controllers/smogController.js';
import { authenticateToken } from '../utils/auth.js';

// สร้าง instance ของ Router จาก Express เพื่อใช้ในการกำหนดเส้นทาง (routes) สำหรับ API
const router = express.Router();
//  const smogRouter = express.Router();



/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: เข้าสู่ระบบ
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: เข้าสู่ระบบสำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid credentials"
 */
router.post('/login', (req, res) => {
  controller.loginController(req, res);
});


/**
 * @swagger
 * /api/smog:
 *   post:
 *     summary: ข้อมูลหมอกควัน
 *     responses:
 *       200:
 *         description: ข้อความตัวอย่าง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.post('/smog', authenticateToken, (req, res) => {
  controller.smogController(req, res);
});



/**
 * @swagger
 * /api/smog/icd10:
 *   post:
 *     summary: ค้นหาจาก ICD-10
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagcode:
 *                 type: string
 *                 example: "J40"
 *     responses:
 *       200:
 *         description: ข้อมูลที่คิวรี่ได้จากฐานข้อมูล
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 example: [{}]
 */
router.post('/smog/icd10', authenticateToken, (req, res) => {
  const { diagcode } = req.body;
  controller.icd10Controller(req, res);
});


// สร้าง smog 
/**
 * @swagger
 * /api/smog/create:
 *   post:
 *     summary: สร้างข้อมูลหมอกควันใหม่
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               hospcode:
 *                 type: string
 *                 example: "00000"
 *               hospitalname:
 *                 type: string
 *                 example: "Hospital Name"
 *               pid:
 *                 type: string
 *                 example: "1234567"
 *               birth:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               sex:
 *                 type: string
 *                 example: "1"
 *               addrcode_moo:
 *                 type: string
 *                 example: "57010109"
 *               addrcode:
 *                 type: string
 *                 example: "570101"
 *               subdistrict:
 *                 type: string
 *                 example: "Subdistrict"
 *               district:
 *                 type: string
 *                 example: "District"
 *               province:
 *                 type: string
 *                 example: "Province"
 *               hn:
 *                 type: string
 *                 example: "HN123456"
 *               seq:
 *                 type: string
 *                 example: "SEQ123456"
 *               date_serv:
 *                 type: string
 *                 format: date
 *                 example: "2025-03-26"
 *               diagtype:
 *                 type: string
 *                 example: "1"
 *               diagcode:
 *                 type: string
 *                 example: "J40"
 *               clinic:
 *                 type: string
 *                 example: "Clinic"
 *               provider:
 *                 type: string
 *                 example: "Provider"
 *               d_update:
 *                 type: string
 *                 format: date-time
 *                 example: "2025-03-26 12:00:00"
 *               cid:
 *                 type: string
 *                 example: "1234567890123"
 *               appoint:
 *                 type: string
 *                 example: "Y"
 *               admit:
 *                 type: string
 *                 example: "N"
 *               er:
 *                 type: string
 *                 example: "N"
 *     responses:
 *       200:
 *         description: สร้างข้อมูลหมอกควันใหม่สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 hospcode:
 *                   type: string
 *                   example: "00000"
 *                 hospitalname:
 *                   type: string
 *                   example: "Hospital Name"
 *                 pid:
 *                   type: string
 *                   example: "1234567"
 *                 birth:
 *                   type: string
 *                   format: date
 *                   example: "2000-01-01"
 *                 sex:
 *                   type: string
 *                   example: "1"
 *                 addrcode_moo:
 *                   type: string
 *                   example: "57010109"
 *                 addrcode:
 *                   type: string
 *                   example: "570101"
 *                 subdistrict:
 *                   type: string
 *                   example: "Subdistrict"
 *                 district:
 *                   type: string
 *                   example: "District"
 *                 province:
 *                   type: string
 *                   example: "Province"
 *                 hn:
 *                   type: string
 *                   example: "123456"
 *                 seq:
 *                   type: string
 *                   example: "SEQ123456"
 *                 date_serv:
 *                   type: string
 *                   format: date
 *                   example: "2025-03-26"
 *                 diagtype:
 *                   type: string
 *                   example: "01"
 *                 diagcode:
 *                   type: string
 *                   example: "J40"
 *                 clinic:
 *                   type: string
 *                   example: "Clinic"
 *                 provider:
 *                   type: string
 *                   example: "Provider"
 *                 d_update:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-03-26 12:00:00"
 *                 cid:
 *                   type: string
 *                   example: "1234567890123"
 *                 appoint:
 *                   type: string
 *                   example: "Y"
 *                 admit:
 *                   type: string
 *                   example: "N"
 *                 er:
 *                   type: string
 *                   example: "N"
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 */
router.post('/smog/create', authenticateToken, (req, res) => {
  controller.createSmog(req, res);
}   );


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


/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: สร้างผู้ใช้ใหม่
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: ""
 *               password:
 *                 type: string
 *                 example: ""
 *               email:
 *                 type: string
 *                 example: ""
 *               status:
 *                 type: string
 *                 example: "Y"
 *     responses:
 *       200:
 *         description: สร้างผู้ใช้ใหม่สำเร็จ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 username:
 *                   type: string
 *                   example: "newuser"
 *                 email:
 *                   type: string
 *                   example: "newuser@example.com"
 *                 status:
 *                   type: string
 *                   example: "Y"
 *       400:
 *         description: ข้อมูลไม่ถูกต้อง
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input"
 */
router.post('/user', (req, res) => {
  controller.createUser(req, res);
});



  export default router;
  