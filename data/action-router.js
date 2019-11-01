const router = require("express").Router();
const db = require("./helpers/actionModel");

function validateActionID(req, res, next) {
  db.get(req.params.id)
    .then(next())
    .catch(err => {
      res.status(404).json({ message: "action not found" });
    });
}

router.use("/:id", validateActionID);

router.get("/", (req, res) => {
  db.get()
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to get actions" });
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
        .json({ message: "unable to find action with specified ID" });
    });
});

router.post("/", (req, res) => {
  db.insert(req.body)
    .then(db => {
      res.status(201).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to add action" });
    });
});

router.delete("/:id", (req, res) => {
  db.remove(req.params.id)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "action was not deleted" });
    });
});

router.put("/:id", (req, res) => {
  db.update(req.params.id, req.body)
    .then(db => {
      res.status(200).json(db);
    })
    .catch(err => {
      res.status(500).json({ message: "unable to edit action" });
    });
});

module.exports = router;
