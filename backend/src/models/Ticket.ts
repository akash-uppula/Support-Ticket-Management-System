import { Schema, model, HydratedDocument, Types } from "mongoose";

export interface ITicket {
  title: string;

  description: string;

  category: "Technical" | "Billing" | "Account" | "Bug" | "Feature Request";

  priority: "Low" | "Medium" | "High";

  status: "Open" | "In Progress" | "Resolved" | "Closed";

  createdBy: Types.ObjectId;
}

const ticketSchema = new Schema<ITicket>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      enum: ["Technical", "Billing", "Account", "Bug", "Feature Request"],
      required: true,
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Medium",
    },

    status: {
      type: String,
      enum: ["Open", "In Progress", "Resolved", "Closed"],
      default: "Open",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  {
    timestamps: true,
  },
);

export type Ticket = HydratedDocument<ITicket>;

const TicketModel = model<ITicket>("Ticket", ticketSchema);

export default TicketModel;
