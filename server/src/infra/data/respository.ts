import mongoose, { model } from "mongoose";
import { ISubscription } from "../../models/ISubscription";
import { SubscriptionSchema } from "./schemas";

const Subscription = model<ISubscription>("Subscription", SubscriptionSchema);

const connect = async () => {
    if (!process.env.MONGODB_URI)
        throw new Error("MongoDB URI not found");

    await mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
        .then(() => {
            console.info("Connected to MongoDB.");
        })
        .catch(err => {
            console.error("MongoDB connection error: ", err);
        });
};

const disconnect = async () => {
    await mongoose.disconnect();
    console.info("Disconnected from MongoDB.");
};

const addSubscription = async (subscription: ISubscription) => {
    try {
        await connect();
        const subscriptionData = new Subscription(subscription);
        const saved = await subscriptionData.save();
        console.log("New subscription saved: ", saved.toJSON());
        return saved.toJSON();
    }
    catch (err) {
        console.error("Error saving subscription: ", err);
        return "Error saving subscription: " + err;
    }
    finally {
        await disconnect();
    }
};

const listSubscriptions = async () => {
    try {
        await connect();
        const subscriptions = await Subscription.find().lean().exec();
        return subscriptions;
    }
    catch (err) {
        console.error("Error listing subscriptions: ", err);
    }
    finally {
        await disconnect();
    }
};

const deleteAllSubscriptions = async () => {
    let message = "All subscriptions deleted.";
    try {
        await connect();
        await Subscription.deleteMany().exec();
    }
    catch (err) {
        message = "Error deleting subscriptions: ", err;
        console.error(message);
    }
    finally {
        await disconnect();
        console.log(message);
        return message;
    }
};

export const db = {
    addSubscription,
    listSubscriptions,
    deleteAllSubscriptions
};
