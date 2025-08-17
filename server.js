import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const TURNSTILE_SECRET = "0x4AAAAAABsjE2Cl6D30HmqvuJd8RplNjG0"; // your secret key

app.post('/verify-turnstile', async (req, res) => {
  const { token } = req.body;
  if (!token) return res.json({ success: false });

  try {
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${TURNSTILE_SECRET}&response=${token}`
    });
    const data = await response.json();
    res.json({ success: data.success });
  } catch (err) {
    res.json({ success: false });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running...");
});
