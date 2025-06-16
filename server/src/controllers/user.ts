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
    if (evt.type === "user.updated" || evt.type === "user.created") {
      const { id, username, email_addresses, image_url } = evt.data;
      await UserModel.findOneAndUpdate(
        {
          clerkId: id,
        },
        {
          username,
          email: email_addresses[0].email_address,
          avatar: image_url,
        },
        {
          new: true,
          upsert: true,
        }
      );
    } else if (evt.type === "user.deleted") {
      const clerkId = evt.data.id;
      const user = await UserModel.deleteOne({ clerkId });
      if (!user.deletedCount) {
        sendResponse(404, false, "User not found", res);
        return;
      }
    }
    sendResponse(200, true, "Webhook processed successfully", res);
    return;
  }
);

const getUserData = TryCatch(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { username ,clerkId} = req.query;
    if (clerkId && username) {
      sendResponse(
        400,
        false,
        "Please provide either clerkId or username, not both",
        res
      );
      return;
    }
    if (!clerkId && !username) {
      sendResponse(
        400,
        false,
        "Please provide either clerkId or Username",
        res
      );
      return;
    }
    if (username) {
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
    } else if (clerkId) {
      if (typeof clerkId !== "string" || !clerkId.trim()) {
        sendResponse(400, false, "Invalid Clerk ID", res);
        return;
      }

      const user = await UserModel.findOne({ clerkId });
      if (!user) {
        sendResponse(404, false, "User not found", res);
        return;
      }

      sendResponse(200, true, "User found", res, user);
      return;
    }
  }
);

const unlinkCodeforces = TryCatch(
  async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const {userId}=req.body;
    if(!userId) {
      sendResponse(400, false, "User ID is required", res);
      return;
    }
    const user = await UserModel.findById(userId);
    if(!user) {
      sendResponse(404, false, "User not found", res);
      return;
    }
    user.codeforces_info = {
      username: "",
      rating: 0,
      maxRating: 0,
      rank: "",
      maxRank: "",
      solved_ques: [],
      rating_changes: []
    };
    await user.save();
    sendResponse(200, true, "Codeforces unlinked successfully", res, user);
  }
)

export { handleClerkUserChange, getUserData,unlinkCodeforces };
