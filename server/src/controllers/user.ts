import UserModel from "../models/User.js";
import { Request, Response, NextFunction } from "express";
import { TryCatch, sendResponse } from "../utils/features.js";
import { verifyWebhook } from "@clerk/express/webhooks";
import { WebhookEvent } from "@clerk/express/webhooks";

const handleClerkUserChange = TryCatch(
  async (req: Request, res: Response, next: NextFunction) => {
    const webhookSecret = process.env.CLERK_WEBHOOK_SIGNING_SECRET;
    if (!webhookSecret) {
      return sendResponse(500, false, "Webhook secret not configured", res);
    }
    const evt: WebhookEvent = await verifyWebhook(req, {
      signingSecret: webhookSecret,
    });

    console.log(evt.type);
    console.log(evt.data);
    // if(evt.type ==="user.created"){
    //     console.log(evt.data);
    // }
   }
 );

const getUserData = TryCatch(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username } = req.query;

    if (typeof username !== "string" || !username.trim()) {
      sendResponse(400, false, "Invalid username", res);
      return;
    }

    const user = await UserModel.findOne({ username });
    if (!user) {
      sendResponse(404, false, "User not found", res);
      return;
    }

    sendResponse(200, true, "User found", res, user);
  }
);

export { handleClerkUserChange, getUserData };
