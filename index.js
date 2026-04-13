const express = require("express");
const path = require("path");
const fs = require("fs");

console.log("Starting app...");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

// Load project data
const projects = JSON.parse(
  fs.readFileSync(path.join(__dirname, "data/projects.json"))
);

// Routes
app.get("/", (req, res) => {
  res.render("index", { projects });
});

app.get("/about", (req, res) => {
  res.render("about");
});

app.get("/projects", (req, res) => {
  res.render("projects", { projects });
});

// Project Routes
app.get("/projects/:slug", (req, res) => {
  const slug = req.params.slug;

  const project = projects.find(p => p.slug === slug);

  if (!project) {
    return res.status(404).send("Project not found");
  }

  res.render("project", { project });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});