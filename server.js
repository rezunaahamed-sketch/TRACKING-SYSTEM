require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const { Server } = require('socket.io');
const authRoutes = require('./routes/auth');
const User = require('./models/User');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());
app.use(express.static('public'));
app.use('/api', authRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

io.on('connection', (socket) => {
  socket.on('locationUpdate', async (data) => {
    const { trackingId, lat, lng } = data;

    await User.findOneAndUpdate(
      { trackingId },
      { lat, lng }
    );

    io.emit('locationUpdate', { trackingId, lat, lng });
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log("Server running on port " + PORT));
