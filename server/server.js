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

app.get("/api/auth/check", (req, res) => {
  if (req.session.user) {
    res.status(200).json({ authenticated: true });
  } else {
    res.status(200).json({ authenticated: false });
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
  res.sendFile(path.join(__dirname, "../client/public", "index.html"));
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

// Home page
app.get("/home", requireLogin, (req, res) => {
  res.json({
    Title: "Dashboard",
    Subtitle: `Hi ${req.session.user.name}, Explore your 1Space!`,
    Links: [
      {
        name: "Task Manager",
        description:
          "Stay on top of your to-dos! Add, label, and manage tasks while earning fun badges along the way!",
        url: "task-manager",
        img: "/images/task-manager.png",
        alt: "Task Manager",
      },
      {
        name: "Finance Board",
        description:
          "Keep your budget in check! Easily track income and expenses to stay financially savvy.",
        url: "finance-board",
        img: "/images/finance-board.png",
        alt: "Finance Board",
      },
      {
        name: "Budget Hub",
        description:
          "Join piggy bank the astronaut to hunt for the latest budget deals around you!",
        url: "budget-hub",
        img: "/images/budget-hub.png",
        alt: "Budget Hub",
      },
    ],
  });
});

app.get("/get/FinancialOverview", requireLogin, async (req, res) => {
  const { email, name } = req.session.user;

  try {
    // Step 1: Fetch the user_id based on email and name
    const userIdQuery =
      "SELECT user_id FROM user WHERE user_email = ? AND user_name = ?;";
    const userIdResult = await new Promise((resolve, reject) => {
      db.get(userIdQuery, [email, name], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!userIdResult) {
      return res.status(404).json({ error: "User not found" });
    }

    const { user_id } = userIdResult;

    // Step 2: Fetch the financial overview data based on the user_id
    const financialOverviewQuery =
      "SELECT * FROM financial_overview WHERE user_id = ?;";
    const financialOverviewRows = await new Promise((resolve, reject) => {
      db.all(financialOverviewQuery, [user_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.json(financialOverviewRows);
  } catch (error) {
    console.error("Error fetching financial overview: ", error);
    res.status(500).json({ error: "Failed to fetch financial overview" });
  }
});

// POST route to create or update a financial overview entry
app.post("/add/FinancialOverview", requireLogin, async (req, res) => {
  const { income, monthBudget, rent, debt, invest, others } = req.body;
  const { email, name } = req.session.user;

  // Validate the input data
  if (
    typeof income !== "number" ||
    typeof monthBudget !== "number" ||
    typeof rent !== "number" ||
    typeof debt !== "number" ||
    typeof invest !== "number" ||
    typeof others !== "number"
  ) {
    return res.status(400).json({ error: "Invalid input data" });
  }

  try {
    // Fetch the user ID from the database based on email and name
    const userQuery = `SELECT user_id FROM user WHERE user_email = ? AND user_name = ?`;
    const userResult = await new Promise((resolve, reject) => {
      db.get(userQuery, [email, name], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });

    if (!userResult) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = userResult.user_id;

    // Check if an entry already exists for the user
    const checkQuery = `SELECT overview_id FROM financial_overview WHERE user_id = ?`;
    const existingEntry = await new Promise((resolve, reject) => {
      db.get(checkQuery, [userId], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });

    if (existingEntry) {
      // Update the existing entry
      const updateQuery = `UPDATE financial_overview 
                           SET income = ?, month_budget = ?, rent = ?, debt = ?, invest = ?, others = ? 
                           WHERE overview_id = ?`;
      await new Promise((resolve, reject) => {
        db.run(
          updateQuery,
          [
            income,
            monthBudget,
            rent,
            debt,
            invest,
            others,
            existingEntry.overview_id,
          ],
          function (err) {
            if (err) {
              return reject(err);
            }
            resolve();
          }
        );
      });

      res
        .status(200)
        .json({ message: "Financial overview updated successfully" });
    } else {
      // Insert a new entry
      const insertQuery = `INSERT INTO financial_overview (income, month_budget, rent, debt, invest, others, user_id) 
                           VALUES (?, ?, ?, ?, ?, ?, ?)`;
      const result = await new Promise((resolve, reject) => {
        db.run(
          insertQuery,
          [income, monthBudget, rent, debt, invest, others, userId],
          function (err) {
            if (err) {
              return reject(err);
            }
            resolve(this);
          }
        );
      });

      res.status(201).json({
        message: "Financial overview created successfully",
        overviewId: result.lastID,
      });
    }
  } catch (error) {
    console.error("Error creating or updating financial overview:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Transaction or task entry handling/management
app.post("/add/:type", requireLogin, (req, res) => {
  const { type } = req.params;
  const { title, category, description, amount } = req.body;
  const { email, name } = req.session.user;

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

app.get("/get/:type", requireLogin, async (req, res) => {
  const { type } = req.params;
  const { email, name } = req.session.user;

  try {
    // Step 1: Fetch the user_id based on email and name
    const userIdQuery =
      "SELECT user_id FROM user WHERE user_email = ? AND user_name = ?;";
    const userIdResult = await new Promise((resolve, reject) => {
      db.get(userIdQuery, [email, name], (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });

    if (!userIdResult) {
      return res.status(404).json({ error: "User not found" });
    }

    const { user_id } = userIdResult;

    // Step 2: Fetch the data based on the user_id and type
    let query;
    if (type === "transaction") {
      query = "SELECT * FROM expense WHERE user_id = ?;";
    } else {
      query = "SELECT * FROM task WHERE user_id = ?;";
    }

    const rows = await new Promise((resolve, reject) => {
      db.all(query, [user_id], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.json(rows);
  } catch (error) {
    console.error(
      `Error fetching ${type === "transaction" ? "expenses" : "tasks"}: `,
      error
    );
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
  } else {
    try {
      await new Promise((resolve, reject) => {
        db.run("DELETE FROM task WHERE task_id = ?", [id], function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        });
      });
      res.status(200).json({ message: "task deleted successfully" });
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ message: "Error deleting task" });
    }
  }
});

// Handles task completions
app.put("/api/tasks/:id", requireLogin, async (req, res) => {
  const { id } = req.params;
  const { is_complete, completed_at } = req.body;
  const { email } = req.session.user;

  try {
    const userId = await new Promise((resolve, reject) => {
      db.get(
        `SELECT user_id FROM user WHERE user_email = ?`,
        [email],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row.user_id);
          } else {
            reject(new Error("User not found"));
          }
        }
      );
    });

    await new Promise((resolve, reject) => {
      db.run(
        `UPDATE task SET is_complete = ?, completed_at = ? WHERE task_id = ? AND user_id = ?`,
        [is_complete, completed_at, id, userId],
        function (err) {
          if (err) {
            reject(err);
          } else if (this.changes === 0) {
            reject(new Error("Task not found or does not belong to the user"));
          } else {
            resolve();
          }
        }
      );
    });

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ message: "Error updating task" });
  }
});

// Handles adding of badges
app.post("/api/badges", requireLogin, async (req, res) => {
  const { badgeName, badgeDescription } = req.body;
  const { email } = req.session.user;

  try {
    const userId = await new Promise((resolve, reject) => {
      db.get(
        `SELECT user_id FROM user WHERE user_email = ?`,
        [email],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row.user_id);
          } else {
            reject(new Error("User not found"));
          }
        }
      );
    });

    const badgeExists = await new Promise((resolve, reject) => {
      db.get(
        `SELECT * FROM badge WHERE badge_name = ? AND user_id = ?`,
        [badgeName, userId],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(true); // Badge already exists
          } else {
            resolve(false); // Badge does not exist
          }
        }
      );
    });

    if (badgeExists) {
      return res
        .status(200)
        .json({ message: "Badge already awarded to the user" });
    }

    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO badge (badge_name, badge_description, user_id) VALUES (?, ?, ?)`,
        [badgeName, badgeDescription, userId],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        }
      );
    });

    res.status(201).json({ message: "Badge added successfully" });
  } catch (error) {
    console.error("Error adding badge to database:", error.message);
    res.status(500).json({ message: "Error adding badge to database" });
  }
});

//Handles fetching the badges
app.get("/api/badges", requireLogin, async (req, res) => {
  const { email } = req.session.user;

  try {
    const userId = await new Promise((resolve, reject) => {
      db.get(
        `SELECT user_id FROM user WHERE user_email = ?`,
        [email],
        (err, row) => {
          if (err) {
            reject(err);
          } else if (row) {
            resolve(row.user_id);
          } else {
            reject(new Error("User not found"));
          }
        }
      );
    });

    const badges = await new Promise((resolve, reject) => {
      db.all(`SELECT * FROM badge WHERE user_id = ?`, [userId], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    res.json(badges);
  } catch (error) {
    console.error("Error fetching badges:", error.message);
    res.status(500).json({ message: "Error fetching badges" });
  }
});

app.get("/complete/task/:id", requireLogin, async (req, res) => {
  const { id } = req.params;

  try {
    await new Promise((resolve, reject) => {
      db.run(
        "UPDATE task SET is_complete = true WHERE task_id = ?",
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
    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    res.status(500).json({ message: "Error updating task" });
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

/**
 * @desc Check to see financial overview
 */
app.get("/list-finance-overview", (req, res, next) => {
  const query = "SELECT * FROM financial_overview;";

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
