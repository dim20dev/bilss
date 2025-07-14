const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const USERS = [
  {
    username: 'robloxUser',
    passwordHash: '$2b$10$rVvApxGRtULLOXcZlq3qE.SvOJZFCbdXSGVOwQX1z6zThNdC/2M6y' // hashed "1234"
  }
];

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = USERS.find(u => u.username === username);

  if (user) {
    const match = await bcrypt.compare(password, user.passwordHash);
    if (match) {
      console.log(`✔ Login success: ${username}`);
      return res.json({ success: true });
    }
  }

  console.log(`✖ Login failed: ${username}`);
  return res.json({ success: false });
});

app.listen(PORT, () => {
  console.log(`🔐 Server running on http://localhost:${PORT}`);
});
