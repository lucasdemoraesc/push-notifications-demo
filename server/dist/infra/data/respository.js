"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const schemas_1 = require("./schemas");
const Subscription = (0, mongoose_1.model)("Subscription", schemas_1.SubscriptionSchema);
const connect = () => __awaiter(void 0, void 0, void 0, function* () {
    if (!process.env.MONGODB_URI)
        throw new Error("MongoDB URI not found");
    yield mongoose_1.default.connect(process.env.MONGODB_URI, { autoIndex: true })
        .then(() => {
        console.info("Connected to MongoDB.");
    })
        .catch(err => {
        console.error("MongoDB connection error: ", err);
    });
});
const disconnect = () => __awaiter(void 0, void 0, void 0, function* () {
    yield mongoose_1.default.disconnect();
    console.info("Disconnected from MongoDB.");
});
const addSubscription = (subscription) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect();
        const subscriptionData = new Subscription(subscription);
        const saved = yield subscriptionData.save();
        console.log("New subscription saved: ", saved.toJSON());
        return saved.toJSON();
    }
    catch (err) {
        console.error("Error saving subscription: ", err);
        return "Error saving subscription: " + err;
    }
    finally {
        yield disconnect();
    }
});
const listSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect();
        const subscriptions = yield Subscription.find().lean().exec();
        return subscriptions;
    }
    catch (err) {
        console.error("Error listing subscriptions: ", err);
    }
    finally {
        yield disconnect();
    }
});
const deleteAllSubscriptions = () => __awaiter(void 0, void 0, void 0, function* () {
    let message = "All subscriptions deleted.";
    try {
        yield connect();
        yield Subscription.deleteMany().exec();
    }
    catch (err) {
        message = "Error deleting subscriptions: ", err;
        console.error(message);
    }
    finally {
        yield disconnect();
        console.log(message);
        return message;
    }
});
exports.db = {
    addSubscription,
    listSubscriptions,
    deleteAllSubscriptions
};
