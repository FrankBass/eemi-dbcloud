

const { Router } = require("express");
const router = new Router();

router.use(require("./user"));
router.use(require("./article"));
router.use(require("./comment"));
router.use(require("./like"));

module.exports = router;
