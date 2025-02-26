import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from './database';
import doctorRoutes from './routes/doctores.routes';
import citasRoutes from './routes/citas';
import pacientesRoutes from './routes/pacientes.routes';
import authRoutes from './routes/auth.routes';


// Cargar variables de entorno
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Permite recibir datos en formato JSON
app.use(cors({
  origin: ['http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Ruta de prueba para asegurar que el servidor funciona
app.get('/', (req: Request, res: Response) => {
  res.send('Servidor del sistema de consultorio funcionando correctamente.');
});

// Rutas de la API
app.use('/api/doctores', doctorRoutes);
app.use('/api/citas', citasRoutes);
app.use('/api/pacientes', pacientesRoutes);
app.use('/api/auth', authRoutes);

// Conexión a la base de datos
pool.connect()
  .then(() => {
    console.log('Conexión exitosa a PostgreSQL');
  })
  .catch((err: Error) => {
    console.error('Error al conectar con PostgreSQL:', err);
  });

// Middleware de manejo de errores correcto
app.use((err: Error, req: Request, res: Response, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});

// Configurar CORS para permitir varios orígenes
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:5174'], // Permitir ambos orígenes
  methods: 'GET,POST,PUT,DELETE',
  credentials: true, // Permitir cookies si es necesario
};

app.use(cors(corsOptions));