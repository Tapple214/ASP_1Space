// Entry point
const express = require("express");
const app = express();
const port = 3001;
const cors = require("cors");
const path = require("path");
const corsOptions = {
  origin: "http://localhost:3000",
};

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
        img: "/images/finance-board.png",
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
        img: "/images/finance-board.png",
        alt: "Budget Hub",
      },
    ],
  });
});

// Make the web application listen for HTTP requests
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
