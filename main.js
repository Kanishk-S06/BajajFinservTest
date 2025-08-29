const express = require('express');
const app = express();

app.disable('x-powered-by');
app.use(express.json({ limit: '100kb' }));

const USER_ID = 'kanishk_sharma_06062003';
const EMAIL = 'kanishk.sharma2022a@vitstudent.ac.in';
const ROLL = '22BCE1416';

const isIntegerString = (s) => /^[-+]?\d+$/.test(s);
const isAlphabeticString = (s) => /^[A-Za-z]+$/.test(s);


app.post('/bfhl', (req, res) => {
  if (!req.is('application/json') || !req.body || !Array.isArray(req.body.data)) {
    return res.status(200).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Payload must be JSON with a 'data' array."
    });
  }

  try {
    const data = req.body.data;

    const even_numbers = [];
    const odd_numbers = [];
    const alphabets = [];
    const special_characters = [];
    const letters = [];
    let sum = 0;

    for (const item of data) {
      if (typeof item !== 'string' && typeof item !== 'number') continue;
      const str = String(item);

      if (isIntegerString(str)) {
        const n = parseInt(str, 10);
        (Math.abs(n) % 2 === 0 ? even_numbers : odd_numbers).push(str);
        sum += n; 
      } else if (isAlphabeticString(str)) {
        alphabets.push(str.toUpperCase());
        for (const ch of str) letters.push(ch);
      } else if (str.length === 1 && /[^A-Za-z0-9]/.test(str)) {
        special_characters.push(str);
      } else {
        for (const ch of str) if (/[A-Za-z]/.test(ch)) letters.push(ch);
      }
    }

    const reversed = letters.reverse();
    const concat_string = reversed
      .map((ch, i) => (i % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
      .join('');

    return res.status(200).json({
      is_success: true,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers,
      even_numbers,
      alphabets,
      special_characters,
      sum: String(sum),
      concat_string,
    });
  } catch (e) {
    return res.status(200).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Internal processing error"
    });
  }
});

app.use((err, req, res, next) => {
  if (err && (err.type === 'entity.parse.failed' || err instanceof SyntaxError)) {
    return res.status(200).json({
      is_success: false,
      user_id: USER_ID,
      email: EMAIL,
      roll_number: ROLL,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      error: "Invalid JSON"
    });
  }
  return res.status(200).json({
    is_success: false,
    user_id: USER_ID,
    email: EMAIL,
    roll_number: ROLL,
    odd_numbers: [],
    even_numbers: [],
    alphabets: [],
    special_characters: [],
    sum: "0",
    concat_string: "",
    error: "Unhandled error"
  });
});



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening on ${PORT}`));
