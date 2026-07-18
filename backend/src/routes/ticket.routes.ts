import { Router } from "express";

import authenticate from "../middleware/auth.middleware.js";

import {
  createTicketController,
  getMyTicketsController,
  updateTicketController,
  deleteTicketController,
} from "../controllers/ticket.controller.js";

const router = Router();

router.post("/", authenticate, createTicketController);

router.get("/", authenticate, getMyTicketsController);

router.put("/:id", authenticate, updateTicketController);

router.delete("/:id", authenticate, deleteTicketController);

export default router;
