const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(express.static(path.join(__dirname, "public")));

const session = require("express-session");
app.use(cors(corsOptions));
app.use(express.json());

app.use(
  session({
    secret: "1SPacESeSSIonSecReT",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
    },
  })
);

// Set up SQLite
const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./db/database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON");
  }
});

// Middleware to check if the user is logged in
function requireLogin(req, res, next) {
  console.log("Checking login status...");
  if (req.session.user) {
    console.log("User is logged in:", req.session.user);
    return next();
  } else {
    console.log("User is not logged in. Redirecting to home.");
    return res.redirect("/");
  }
}

app.get("/", (req, res) => {
  // Send the HTML file to the client
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Login handling
app.post("/authenticate", (req, res) => {
  const { idToken, email, name } = req.body;

  req.session.token = { id: idToken };
  req.session.user = { name: name, email: email };

  db.get(`SELECT * FROM user WHERE user_email = ?`, [email], (err, row) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (row) {
      res.json({ message: "User authenticated and session created" });
    } else {
      db.run(
        `INSERT INTO user (user_email, user_name) VALUES (?, ?)`,
        [email, name],
        function (err) {
          if (err) {
            console.error(err.message);
            return res.status(500).json({ error: "Database error" });
          }

          res.json({ message: "User authenticated and session created" });
        }
      );
    }
  });
});

app.get("/home", requireLogin, (req, res) => {
  res.json({
    Title: "Dashboard",
    Subtitle: `Hi ${req.session.user.name}, Explore your 1Space!`,
    Links: [
      {
        name: "Task Manager",
        description:
          "Stay on top of your to-dos! Add, label, and manage tasks while earning fun badges along the way!",
        url: "/taskManager",
        img: "/images/task-manager.png",
        alt: "Task Manager",
      },
      {
        name: "Finance Board",
        description:
          "Keep your budget in check! Easily track income and expenses to stay financially savvy.",
        url: "/financial-organizer",
        img: "/images/finance-board.png",
        alt: "Finance Board",
      },
      {
        name: "Budget Hub",
        description:
          "Join piggy bank the astronaut to hunt for the latest budget deals around you!",
        img: "/images/budget-hub.png",
        alt: "Budget Hub",
      },
    ],
  });
});

// Adding transaction or task entry
app.post("/add/:type", requireLogin, (req, res) => {
  const { type } = req.params;
  const { title, category, description, amount } = req.body;
  const { email, name } = req.session.user;

  console.log(req.body);
  console.log(req.session.user);

  if (type === "transaction") {
    // Query to get the user_id based on email and name
    db.get(
      `SELECT user_id FROM user WHERE user_email = ? AND user_name = ?`,
      [email, name],
      (err, row) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }

        if (!row) {
          return res.status(404).json({ error: "User not found" });
        }

        const userId = row.user_id;

        db.run(
          `INSERT INTO expense (expense_name, expense_description, expense_category, expense_amount, user_id)
         VALUES (?, ?, ?, ?, ?)`,
          [title, description, category, amount, userId],
          function (err) {
            if (err) {
              return res.status(500).json({ error: "Failed to add expense" });
            }
            res.status(201).json({ message: "Expense added successfully" });
          }
        );
      }
    );
  } else {
    // Query to get the user_id based on email and name
    db.get(
      `SELECT user_id FROM user WHERE user_email = ? AND user_name = ?`,
      [email, name],
      (err, row) => {
        if (err) {
          return res.status(500).json({ error: "Database error" });
        }

        if (!row) {
          return res.status(404).json({ error: "User not found" });
        }

        const userId = row.user_id;

        db.run(
          `INSERT INTO task (task_name, task_description, task_category, finish_by, user_id)
         VALUES (?, ?, ?, ?, ?)`,
          [title, description, category, amount, userId],
          function (err) {
            if (err) {
              return res.status(500).json({ error: "Failed to add task" });
            }
            res.status(201).json({ message: "task added successfully" });
          }
        );
      }
    );
  }
});

app.get("/expense-get", requireLogin, async (req, res) => {
  try {
    const query = "SELECT * FROM expense;";
    const rows = await new Promise((resolve, reject) => {
      db.all(query, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    res.json(rows);
  } catch (error) {
    console.error("Error fetching expenses: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/delete/:type/:id", requireLogin, async (req, res) => {
  const { type, id } = req.params;

  if (type === "transaction") {
    try {
      await new Promise((resolve, reject) => {
        db.run(
          "DELETE FROM expense WHERE expense_id = ?",
          [id],
          function (err) {
            if (err) {
              reject(err);
            } else {
              resolve();
            }
          }
        );
      });
      res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
      console.error("Error deleting expense:", error);
      res.status(500).json({ message: "Error deleting expense" });
    }
  }
});

// Logout handling
app.post("/logout", (req, res) => {
  // Destroy session
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err.message);
      return res.status(500).json({ message: "Failed to logout." });
    }

    res.clearCookie("connect.sid");

    console.log("User logged out and session destroyed.");
    res.json({ message: "Logout successful." });
  });
});

// --- TO CHECK ---

/**
 * @desc Check to see users
 */
app.get("/list-users", (req, res, next) => {
  const query = "SELECT * FROM user;";

  global.db.all(query, function (err, rows) {
    if (err) {
      next(err);
    } else {
      res.json(rows);
    }
  });
});

/**
 * @desc Check to see expense entries
 */
app.get("/list-expense-entries", (req, res, next) => {
  const query = "SELECT * FROM expense;";

  global.db.all(query, function (err, rows) {
    if (err) {
      next(err);
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
