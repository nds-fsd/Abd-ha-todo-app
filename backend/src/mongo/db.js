const mongoose = require('mongoose');

mongoose.connect('<mongodb+srv://haouchineabdelhak:<abd--111>@cluster0.toswsad.mongodb.net/>', 

{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});
