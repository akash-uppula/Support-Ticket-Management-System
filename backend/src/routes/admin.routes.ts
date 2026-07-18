import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";

import authorize from "../middleware/role.middleware.js";

import {
  getAllTicketsController,
  updateTicketController,
  getDashboardController,
} from "../controllers/admin.controller.js";

const router = Router();

router.get(
  "/tickets",

  authenticate,

  authorize("admin"),

  getAllTicketsController,
);

router.patch(
  "/tickets/:id",

  authenticate,

  authorize("admin"),

  updateTicketController,
);

router.get(
  "/dashboard",

  authenticate,

  authorize("admin"),

  getDashboardController,
);

export default router;
