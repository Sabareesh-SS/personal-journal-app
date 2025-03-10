require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./db'); 

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());

// Get all journals
app.get('/api/journals', (req, res) => {
  db.query('SELECT * FROM journals', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving journals' });
    } else {
      res.json(results);
    }
  });
});

// Create a new journal
app.post('/api/journals', (req, res) => {
  const { title, content, image } = req.body;
  db.query(
    'INSERT INTO journals (title, content, image) VALUES (?, ?, ?)',
    [title, content, image],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error saving journal' });
      } else {
        res.status(200).json({ id: result.insertId, title, content, image });
      }
    }
  );
});

// Get a single journal by ID
app.get('/api/journals/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM journals WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving journal' });
    } else {
      res.json(result[0]);
    }
  });
});

// Update a journal
app.put('/api/journals/:id', (req, res) => {
  const { id } = req.params;
  const { title, content, image } = req.body;
  db.query(
    'UPDATE journals SET title = ?, content = ?, image = ? WHERE id = ?',
    [title, content, image, id],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error updating journal' });
      } else {
        res.json({ message: 'Journal updated successfully' });
      }
    }
  );
});

// Delete a journal
app.delete('/api/journals/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM journals WHERE id = ?', [id], (err, result) => {
    if (err) {
      res.status(500).json({ message: 'Error deleting journal' });
    } else {
      res.json({ message: 'Journal deleted successfully' });
    }
  });
});


// Sign-up
app.post('/api/register', (req, res) => {
  try {
    const { email, password } = req.body;
    db.query('SELECT * FROM login WHERE email = ?', [email], (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ message: 'User already exists' });
      }
      db.query(
        'INSERT INTO login (email, password, role) VALUES (?, ?, "user")',
        [email, password],
        (err, result) => {
          if (err) {
            return res.status(500).json({ message: 'Database error' });
          }
          res.json({ message: 'User registered successfully' });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Sign-in
app.post('/api/login', (req, res) => {
  try {
    const { email, password } = req.body;
    db.query('SELECT * FROM login WHERE email = ?', [email], (err, results) => {
      if (results.length === 0) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      const user = results[0];
      if (password !== user.password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      res.json({ message: 'Login successful', role: user.role }); // Return role
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get user role based on email
app.get('/api/user-role', (req, res) => {
  const { email } = req.query;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  db.query('SELECT role FROM login WHERE email = ?', [email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error' });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ role: result[0].role });
  });
});



// Submit a support request
app.post('/api/support', (req, res) => {
  const { email, subject, message } = req.body;
  if (!email || !subject || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  db.query(
    'INSERT INTO support (email, subjects, details) VALUES (?, ?, ?)',
    [email, subject, message],
    (err, result) => {
      if (err) {
        res.status(500).json({ message: 'Error saving support request' });
      } else {
        res.status(200).json({ message: 'Support request submitted successfully' });
      }
    }
  );
});

// Get all support requests (For Admin)
app.get('/api/supports', (req, res) => {
  db.query('SELECT * FROM support', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving support records' });
    } else {
      res.json(results);
    }
  });
});



// Get all users with email and role
app.get('/api/users', (req, res) => {
  db.query('SELECT email, role FROM login', (err, results) => {
    if (err) {
      res.status(500).json({ message: 'Error retrieving users' });
    } else {
      res.json(results);
    }
  });
});

app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
