const express = require('express');
const multer = require('multer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

// Set up CORS
app.use(cors());

// Set up static folder
app.use(express.static('public'));

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Handle file upload
app.post('/upload', upload.single('frame-image'), (req, res) => {
    const { title, price } = req.body;
    const file = req.file;

    if (!file) {
        return res.status(400).send('No file uploaded.');
    }

    // Save frame details (title, price) and file info to a database or file here
    res.send({ message: 'File uploaded successfully!', file: file, title: title, price: price });
});

// Serve demo images
app.get('/demos', (req, res) => {
    // This is just an example. You might want to serve actual demo data from a database
    res.send({
        demos: [
            { src: '/uploads/demo-frame1.jpg', alt: 'Demo Frame 1' },
            { src: '/uploads/demo-frame2.jpg', alt: 'Demo Frame 2' },
            { src: '/uploads/demo-frame3.jpg', alt: 'Demo Frame 3' }
        ]
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
