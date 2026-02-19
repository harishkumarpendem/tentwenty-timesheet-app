const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Dummy user
const USER = {
  email: "admin",
  password: "password",
};

let timesheets = [];

const statuses = ["COMPLETED", "INCOMPLETE", "MISSING"];

for (let i = 1; i <= 25; i++) {
  timesheets.push({
    id: i,
    week: i,
    date: `${1 + i}- ${5 + i} January, 2024`,
    status: statuses[i % 3], // rotate statuses
  });
}


// LOGIN
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === USER.email && password === USER.password) {
    return res.json({
      token: "dummy-jwt-token",
      user: { email },
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// GET TIMESHEETS
app.get("/timesheets", (req, res) => {
  res.json(timesheets);
});

// CREATE TIMESHEET
app.post("/timesheets", (req, res) => {
  const newTimesheet = {
    id: Date.now(),
    ...req.body,
  };

  timesheets.push(newTimesheet);
  res.json(newTimesheet);
});

// UPDATE TIMESHEET
app.put("/timesheets/:id", (req, res) => {
  const id = Number(req.params.id);

  timesheets = timesheets.map((sheet) =>
    sheet.id === id ? { ...sheet, ...req.body } : sheet
  );

  res.json({ message: "Updated successfully" });
});

// DELETE TIMESHEET
app.delete("/timesheets/:id", (req, res) => {
  const id = Number(req.params.id);

  timesheets = timesheets.filter((sheet) => sheet.id !== id);

  res.json({ message: "Deleted successfully" });
});

// START SERVER
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
