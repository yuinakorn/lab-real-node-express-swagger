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

export { getUsers };