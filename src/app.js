import express from 'express';
import cors from 'cors'

let corsOptions = {
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders: ['x-auth-token']
  };
  
//Routes 
import publicRoute from './routes/public.js'
import protectedRoute from './routes/protected.js';
import authentication from './middleware/authMiddleware.js';

const app = express();
app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/public',publicRoute);
app.use('/api/protected',authentication, protectedRoute);

// test api
app.get("/api/test", (req, res) => {
    res.json({message:"All works fine-- start"});
});

export default app;