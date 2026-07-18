import { Request, Response } from "express";

import asyncHandler from "../utils/asyncHandler.js";

import apiResponse from "../utils/apiResponse.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import {
  getAllTickets,
  updateTicketByAdmin,
  getDashboardStats,
} from "../services/admin.service.js";

// ---------------- View All Tickets ----------------

export const getAllTicketsController = asyncHandler(
  async (req: Request, res: Response) => {
    const tickets = await getAllTickets();

    res
      .status(HTTP_STATUS.OK)
      .json(apiResponse(true, "Tickets fetched successfully", tickets));
  },
);

// ---------------- Update Ticket ----------------

export const updateTicketController = asyncHandler(
  async (req: Request, res: Response) => {
    const ticket = await updateTicketByAdmin(
      req.params.id as string,

      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(apiResponse(true, "Ticket updated successfully", ticket));
  },
);

// ---------------- Dashboard ----------------

export const getDashboardController = asyncHandler(
  async (req: Request, res: Response) => {
    const dashboard = await getDashboardStats();

    res
      .status(HTTP_STATUS.OK)
      .json(
        apiResponse(true, "Dashboard data fetched successfully", dashboard),
      );
  },
);
