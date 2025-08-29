# BFHL Express API

An Express (Node.js) implementation of the VIT Full-Stack assignment API.  
It exposes a single POST endpoint `/bfhl` that parses a mixed array, returns categorized values, a computed sum (as a string), and a “reverse + alternating-caps” concatenation of letters.  
A helper `GET /bfhl` endpoint returns `{ "operation_code": 1 }` for health checks.

---

## ✨ Features

- **Categorization**
  - `odd_numbers`, `even_numbers` — numbers are returned **as strings** (e.g., `"334"`, not `334`)
  - `alphabets` — purely alphabetic tokens uppercased (e.g., `"ab"` → `"AB"`)
  - `special_characters` — **single-character** non-alphanumeric symbols (e.g., `"&"`, `"*"`)
- **Aggregate fields**
  - `sum` — arithmetic sum of all numeric tokens, returned as a **string**
  - `concat_string` — take **letters from all tokens** (including mixed like `"abc123"`), reverse them, then apply alternating caps starting **Upper** at index 0
- **Identity (hardcoded as requested)**
  - `user_id`: `kanishk_sharma`
  - `email`: `kanishk.sharma2022a@vitstudent.ac.in`
  - `roll_number`: `22BCE1416`
- **Error envelope**
  - Invalid/missing payloads return `200 OK` with `is_success: false` and empty arrays
  - Invalid JSON also returns `200 OK` with `is_success: false` and `error: "Invalid JSON"`

---

## 📦 Project Structure

