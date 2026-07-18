import { Request, Response } from "express";

import {
  createTicket,
  getMyTickets,
  updateTicket,
  deleteTicket,
} from "../services/ticket.service.js";

import asyncHandler from "../utils/asyncHandler.js";

import apiResponse from "../utils/apiResponse.js";

import { HTTP_STATUS } from "../constants/httpStatus.js";

import { createTicketSchema } from "../validations/ticket.validation.js";

// ----------------------------Create Ticket Controller----------------------------

export const createTicketController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = createTicketSchema.parse(req.body);

    const ticket = await createTicket(data, req.user!.id);

    res
      .status(HTTP_STATUS.CREATED)
      .json(apiResponse(true, "Ticket created successfully", ticket));
  },
);

// ----------------------------Get My Tickets Controller----------------------------

export const getMyTicketsController = asyncHandler(
  async (req: Request, res: Response) => {
    const tickets = await getMyTickets(req.user!.id);

    res
      .status(HTTP_STATUS.OK)
      .json(apiResponse(true, "Tickets fetched successfully", tickets));
  },
);

// ----------------------------Update Ticket Controller----------------------------

export const updateTicketController = asyncHandler(
  async (req: Request, res: Response) => {
    const ticket = await updateTicket(
      req.params.id as string,

      req.user!.id,

      req.body,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(apiResponse(true, "Ticket updated successfully", ticket));
  },
);

// ----------------------------Delete Ticket Controller----------------------------

export const deleteTicketController = asyncHandler(
  async (req: Request, res: Response) => {
    const ticket = await deleteTicket(
      req.params.id as string,

      req.user!.id,
    );

    res
      .status(HTTP_STATUS.OK)
      .json(apiResponse(true, "Ticket deleted successfully", ticket));
  },
);
