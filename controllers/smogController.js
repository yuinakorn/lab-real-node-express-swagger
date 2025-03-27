import mysql from 'mysql2/promise'; // เพิ่ม mysql2/promise สำหรับการเชื่อมต่อ MySQL
import { generateToken } from '../utils/auth.js';

// การตั้งค่าการเชื่อมต่อ MySQL
const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

// สร้าง connection pool
const pool = mysql.createPool(dbConfig);

// check connection
pool.getConnection((err, conn) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
    } else {
        console.log('Database connected');
    }
    if (conn) conn.release();
    return;
});


const loginController = async (req, res) => {
    const { username, password } = req.body;

    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password]);
        conn.release();

        if (rows.length > 0) {
            const user = rows[0];
            const token = generateToken(user.id, user.username);
            return res.json({ token });
        } else {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


// ฟังก์ชันสำหรับ query ข้อมูลจากฐานข้อมูล
const smogController = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const sql = `SELECT LEFT(date_serv,7) date_serv, YEAR(date_serv) yy,MONTH(date_serv) mm,
                        left(diagcode,3) diagcode3, count(*) cc 
                        FROM smog_lp 
                        GROUP BY LEFT(date_serv,7), left(diagcode,3)`
        const [rows] = await conn.query(sql);
        // const [rows] = await conn.query('SELECT * FROM smog_lp LIMIT 50');

        conn.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// ฟังก์ชันรับค่า diagcode มาคิวรี่ข้อมูลจากฐานข้อมูล
const icd10Controller = async (req, res) => {
    const { diagcode } = req.body;
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT * FROM smog_lp WHERE diagcode = ? LIMIT 50', [diagcode]);
        conn.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


const createSmog = async (req, res) => {
    const smogData = req.body;

    // ตรวจสอบข้อมูลที่ส่งเข้ามา
    const requiredFields = [
        'hospcode', 'hospitalname', 'pid', 'birth', 'sex', 'addrcode_moo', 'addrcode', 'subdistrict', 'district', 'province',
        'hn', 'seq', 'date_serv', 'diagtype', 'diagcode', 'clinic', 'provider', 'd_update', 'cid', 'appoint', 'admit', 'er'
    ];

    for (const field of requiredFields) {
        if (!smogData[field]) {
            return res.status(400).json({ message: "Invalid input" });
        }
    }

    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query(
            `REPLACE INTO smog_lp (${requiredFields.join(', ')}) VALUES (${requiredFields.map(() => '?').join(', ')})`,
            requiredFields.map(field => smogData[field])
        );
        const [smog] = await conn.query('SELECT * FROM smog_lp WHERE hospcode = ? AND seq = ? AND diagcode = ? ', [result.hospcode, result.seq, result.diagcode]);
        conn.release();
        res.json(smog[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// แสดง users ทั้งหมด
const getUsers = async (req, res) => {
    try {
        const conn = await pool.getConnection();
        const [rows] = await conn.query('SELECT id,username,email,status FROM users');
        conn.release();
        res.json(rows);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// สร้าง user ใหม่
const createUser = async (req, res) => {
    const { username, password, email, status } = req.body;

    // ตรวจสอบข้อมูลที่ส่งเข้ามา
    if (!username || !password || !email || !status || username.trim() === "" || password.trim() === "") {
        return res.status(400).json({ message: "Invalid input" });
    }

    try {
        const conn = await pool.getConnection();
        const [result] = await conn.query('INSERT INTO users (username, password, email, status) VALUES (?, ?, ?, ?)', [username, password, email, status]);
        const [user] = await conn.query('SELECT username, email, status FROM users WHERE id = ?', [result.insertId]);
        conn.release();
        res.json(user[0]);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getUsers, createUser, smogController, icd10Controller, loginController, createSmog };