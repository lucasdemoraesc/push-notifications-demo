"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionSchema = exports.NotificationSchema = void 0;
const mongoose_1 = require("mongoose");
exports.NotificationSchema = new mongoose_1.Schema({
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
});
exports.SubscriptionSchema = new mongoose_1.Schema({
    endpoint: { type: String, required: true },
    expirationTime: String,
    keys: {
        p256dh: { type: String, required: true },
        auth: { type: String, required: true },
    },
});
