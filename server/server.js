const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");
const corsOptions = {
  origin: "http://localhost:3000",
};

// Set up SQLite
// Items in the global namespace are accessible throught out the node application
const sqlite3 = require("sqlite3").verbose();
global.db = new sqlite3.Database("./db/1Space-db.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1);
  } else {
    console.log("Database connected");
    // tell SQLite to pay attention to foreign key constraints
    global.db.run("PRAGMA foreign_keys=ON");
  }
});

app.use(cors(corsOptions));

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
        url: "#",
        img: "/images/task-manager.png",
        alt: "Task Manager",
      },
      {
        name: "Finance Board",
        description:
          "Keep your budget in check! Easily track income and expenses to stay financially savvy.",
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

// Make the web application listen for HTTP requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
