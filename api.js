import express from 'express';
import dotenv from 'dotenv';
import swaggerSpec from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import router from './routes/smogRouter.js';
import cors from 'cors';

const app = express();

// Enable CORS
app.use(cors());

// Middleware สำหรับให้ API รองรับ JSON
app.use(express.json());

// ตั้งค่า Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/', router);

dotenv.config();

const PORT = process.env.PORT || 8001 || 8002;


// เปิดเซิร์ฟเวอร์
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/api-docs`);
});