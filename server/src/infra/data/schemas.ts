import { Schema } from "mongoose";
import { INotification } from "../../models/INotification";
import { ISubscription } from "../../models/ISubscription";

export const NotificationSchema = new Schema<INotification>(
    {
        title: { type: String, required: true },
        body: { type: String, required: true },
        badge: String,
        dir: String,
        icon: String,
        image: String,
        lang: String,
        renotify: Boolean,
        requireInteraction: Boolean,
        silent: Boolean,
        tag: String,
        timestamp: String,
        vibrate: [Number],
        actions: [
            {
                action: { type: String, required: true },
                title: { type: String, required: true },
                icon: String,
            },
        ],
    }
);

export const SubscriptionSchema = new Schema<ISubscription>(
    {
        endpoint: { type: String, required: true },
        expirationTime: String,
        keys: {
            p256dh: { type: String, required: true },
            auth: { type: String, required: true },
        },
    }
);
