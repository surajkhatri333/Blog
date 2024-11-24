// import Admin, { findOne } from '../models/adminModel';
// import { sign, verify } from 'jsonwebtoken';

// // Register a new admin
// export async function registerAdmin(req, res) {
//   const { username, email, password,role } = req.body;
//   try {
//     const admin = new Admin({ username, email, password });
//     await admin.save();
//     res.status(201).json({ message: 'Admin registered successfully' });
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// }

// // Login as admin
// export async function loginAdmin(req, res) {
//   const { email, password } = req.body;
//   try {
//     const admin = await findOne({ email });
//     if (!admin) return res.status(404).json({ error: 'Admin not found' });

//     const isMatch = await admin.comparePassword(password);
//     if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' });

//     // Generate a JWT token
//     const token = sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, message: 'Admin logged in successfully' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// }

// // Middleware to protect admin routes
// export function isAdmin(req, res, next) {
//   const token = req.headers['authorization'];
//   if (!token) return res.status(403).json({ error: 'No token provided' });

//   verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) return res.status(401).json({ error: 'Unauthorized' });
//     if (decoded.role !== 'admin') return res.status(403).json({ error: 'Access denied' });
//     req.userId = decoded.id;
//     next();
//   });
// }
