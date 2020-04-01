const router = require('express').Router();
const actionService = require('../services/ActionService');

const node = "actions";

router.get("/", async (request, response) => {
    actionService.findAll()
        .then(actions => {
            response.status(200).json(actions);
        })
        .catch(err => {
            response.status(400).json(err);
        }
    );
});

router.get("/id/:id", async (request, response) => {
    const id = request.params.id;

    actionService.findById(id)
        .then(actions => {
            response.status(200).json(actions);
        })
        .catch(err => {
            response.status(400).json(err);
        }
    );
});

router.post("/", async (request, response) => {
    const actions = request.body;

    // Save multiple actions
    actionService.create(actions)
        .then(actions => {
            response.status(200).json(actions);
        })
        .catch(err => {
            response.status(400).json(err);
        }
    );
});

router.put("/", async (request, response) => {
    const data = request.body;
    
    actionService.update(data)
        .then(period => {
            response.status(200).json(period);
        })
        .catch(err => {
            response.status(400).json(err);
        }
    );
});

module.exports = router;