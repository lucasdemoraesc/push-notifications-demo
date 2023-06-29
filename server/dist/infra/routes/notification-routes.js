"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRouter = void 0;
const express_1 = __importDefault(require("express"));
const web_push_1 = __importDefault(require("web-push"));
const respository_1 = require("../data/respository");
const router = express_1.default.Router();
exports.NotificationRouter = router;
router.get("/push/publickey", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/notification/push/publickey - called");
    return res.json({ publicKey: process.env.VAPID_PUBLICKEY });
}));
router.post("/push/subscribe", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/notification/push/subscribe - called");
    const body = req.body;
    console.log("New subscriber: " + JSON.stringify(body));
    const result = yield respository_1.db.addSubscription(body);
    return res.json(result);
}));
router.get("/push/subscribers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/notification/push/subscribers - called");
    const subscribers = yield respository_1.db.listSubscriptions();
    return res.json(subscribers);
}));
router.post("/push/send", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/notification/push/send - called");
    const notificationPayload = req.body;
    const subscriptions = yield respository_1.db.listSubscriptions();
    if (subscriptions && subscriptions.length > 0)
        Promise.all(subscriptions.map(sub => web_push_1.default.sendNotification(sub, JSON.stringify({ notification: notificationPayload }), {
            vapidDetails: {
                subject: "https://push-server-woad.vercel.app",
                publicKey: process.env.VAPID_PUBLICKEY,
                privateKey: process.env.VAPID_PRIVATEKEY
            }
        })))
            .then(() => console.log('Notifications sended.'))
            .catch(err => console.log("Error sending notification, reason: ", err));
    return res.json({ message: "Sending notification..." });
}));
router.delete("/push/subscribers", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/notification/push/subscribers - delete called");
    const result = yield respository_1.db.deleteAllSubscriptions();
    return res.json({ message: result });
}));
