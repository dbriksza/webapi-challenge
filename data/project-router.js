const router = require("express").Router();
const db = require("./helpers/projectModel");

function validateProjectID(req, res, next) {
  db.get(req.params.id)
    .then(next())
    .catch(err => {
      res.status(404).json({ message: "project not found" });
    });
}

router.use("/:id", validateProjectID);

router.get("/", (req, res) => {
  db.get()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to get projects" });
    });
});

router.get("/:id", (req, res) => {
  db.get(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "unable to find project with specified ID" });
    });
});

router.get("/:id/actions", (req, res) => {
  db.getProjectActions(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res
        .status(500)
        .json({ message: "unable to find project with specified ID" });
    });
});

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(db => {
      res.status(201).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to add project" });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "project was not deleted" });
    });
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to edit project" });
    });
});

module.exports = router;
