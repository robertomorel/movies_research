import mongoose from 'mongoose';

// -- Login e senha criados para *
mongoose.connect(
  'mongodb+srv://robertomorel:robertomorel@cluster0-e3ktb.mongodb.net/xptocomp?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);
