const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};

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

app.get("/", (req, res) => {
  res.json({
    Title: "Welcome to 1Space",
    Subtitle: "Login to begin your adventure",
    Logo: "/images/logo.png",
    Rocket: "/images/rocket.png",
  });
});

// Login handling
app.post("/authenticate", (req, res) => {
  const { idToken, email, name } = req.body;

  console.log("Email in eithenticacte:", email);
  console.log("Session alsoooo:", req.session);

  req.session.token = { id: idToken };
  req.session.user = { name: name, email: email };

  console.log("Session after setting:", req.session);

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

          // req.session.token = idToken;
          // req.session.name = name;
          // req.session.email = email;

          // console.log("Session after setting:", req.session);

          res.json({ message: "User authenticated and session created" });
        }
      );
    }
  });
});

// Middleware to check if the user is logged in
function requireLogin(req, res, next) {
  console.log("inside require login", req.session.user);
  console.log("same bro", req.sessionStore.sessions);

  if (req.session.user) {
    next();
  } else {
    res.redirect("/");
  }
}

app.get("/home", requireLogin, (req, res) => {
  console.log("Session object in /home:", req.session);
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
