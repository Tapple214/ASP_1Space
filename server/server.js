const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");
const { url } = require("inspector");
const corsOptions = {
  origin: "http://localhost:3000",
};

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

app.use(cors(corsOptions));
app.use(express.json());

// Sending data to http://localhost:3001/ - Home page
app.get("/", (req, res) => {
  res.json({
    Title: "Dashboard",
    Subtitle: "Hi (username) Explore your 1Space!",
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

// Sending data to http://localhost:3001/login - Login page
app.get("/login", (req, res) => {
  res.json({
    Title: "Welcome to 1Space",
    Subtitle: "Login to begin your adventure",
    Logo: "/images/logo.png",
    Rocket: "/images/rocket.png",
  });
});

// Login handling
app.post("/authenticate", (req, res) => {
  const { idToken } = req.body;
  console.log("Received ID Token:", idToken);

  // Insert or update user token
  db.run(
    `INSERT OR REPLACE INTO user (user_token) VALUES (?)`,
    [idToken],
    function (err) {
      if (err) {
        console.error("Error processing token:", err.message);
        return res.status(500).json({ message: "Failed to process token." });
      }

      console.log("Token processed.");
      res.json({ message: "Token received and processed." });
    }
  );
});

// Logout handling
app.post("/logout", (req, res) => {
  const { idToken } = req.body;
  console.log("Received ID Token for logout:", idToken);

  // Delete user token from the database
  db.run(`DELETE FROM user WHERE user_token = ?`, [idToken], function (err) {
    if (err) {
      console.error("Error processing logout:", err.message);
      return res.status(500).json({ message: "Failed to logout." });
    }

    console.log("User logged out.");
    res.json({ message: "Logout successful." });
  });
});

// --- TO CHECK ---

/**
 * @desc Check to see users
 */
app.get("/list-users", (req, res, next) => {
  // Define the query
  query = "SELECT * FROM user;";

  // Execute the query and render the page with the results
  global.db.all(query, function (err, rows) {
    if (err) {
      next(err); // Send the error on to the error handler
    } else {
      res.json(rows); // Render page as simple json
    }
  });
});

// Make the web application listen for HTTP requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
