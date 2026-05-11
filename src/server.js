const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// simple health route (IMPORTANT for Jenkins)
app.get('/', (req, res) => {
    res.status(200).send('OK - Server Running');
});

// startup logging (VERY IMPORTANT)
const server = app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://127.0.0.1:${PORT}`);
});

// prevent silent crash
server.on('error', (err) => {
    console.error('Server failed to start:', err);
    process.exit(1);
});
