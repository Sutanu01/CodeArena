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
    if (!evt) {
      return sendResponse(400, false, "Invalid webhook event", res);
    }
    if(evt.type==="user.updated" || evt.type==="user.created"){
      const {id,username,email_addresses,image_url} = evt.data;
      await UserModel.findOneAndUpdate({
        clerkId: id
      }, {
        username,
        email: email_addresses[0].email_address,
        avatar: image_url
      }, {
        new: true,
        upsert: true
      });
      console.log(`User with Clerk ID ${id} updated in database.`);
    }
    else if(evt.type==="user.deleted"){
      const clerkId = evt.data.id;
      const user = await UserModel.deleteOne({ clerkId});
      if(!user.deletedCount) {
        console.log(`No user found with Clerk ID ${clerkId} to delete.`);
        sendResponse(404, false, "User not found", res);
        return;
      }
      console.log(`User with Clerk ID ${clerkId} deleted from database.`);
    }
    sendResponse(200, true, "Webhook processed successfully", res);
    return;
});

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
    return;
  }
);

export { handleClerkUserChange, getUserData };
