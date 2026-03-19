const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// إضافة
app.post('/add', (req, res) => {
    const { amount, type, date, note } = req.body;

    db.run(
        `INSERT INTO expenses (amount, type, date, note) VALUES (?, ?, ?, ?)`,
        [amount, type, date, note],
        () => res.send("OK")
    );
});

// جلب
app.get('/all', (req, res) => {
    db.all(`SELECT * FROM expenses`, [], (err, rows) => {
        res.json(rows);
    });
});

// حذف
app.delete('/delete/:id', (req, res) => {
    db.run(`DELETE FROM expenses WHERE id=?`, [req.params.id], () => {
        res.send("Deleted");
    });
});
// تعديل مصروف
app.put('/edit/:id', (req, res) => {
    const { amount, type, date, note } = req.body;
    db.run(`UPDATE expenses SET amount=?, type=?, date=?, note=? WHERE id=?`,
        [amount, type, date, note, req.params.id],
        () => res.send("OK")
    );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Server running on port " + PORT));