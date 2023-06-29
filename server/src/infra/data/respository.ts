import mongoose, { model } from "mongoose";
import { ISubscription } from "../../models/ISubscription";
import { SubscriptionSchema } from "./schemas";

const Subscription = model<ISubscription>("Subscription", SubscriptionSchema);

const connect = async () => {
    if (!process.env.MONGODB_URI)
        throw new Error("MongoDB URI not found");

    await mongoose.connect(process.env.MONGODB_URI, { autoIndex: true })
        .then(() => {
            console.log("Connected to MongoDB.");
        })
        .catch(err => {
            console.log("MongoDB connection error: ", err);
        });
};

const addSubscription = async (subscription: ISubscription) => {
    await connect();
    const subscriptionData = new Subscription(subscription);
    subscriptionData.save().then(async (file) => {
        console.log("New subscription saved: ", file);
        await mongoose.disconnect();
        Promise.resolve(file);
    }).catch(async err => {
        console.log("Error saving subscription: ", err);
        await mongoose.disconnect();
        Promise.reject(err);
    });
};

const listSubscriptions = async () => {
    await connect();
    const subscriptions = await Subscription.find().limit(1000).exec();
    await mongoose.disconnect();
    return Promise.resolve(subscriptions);
};

const deleteAllSubscriptions = async () => {
    await connect();
    await Subscription.deleteMany().exec();
    console.log("All subscriptions deleted.");
    await mongoose.disconnect();
};

export const db = {
    addSubscription: addSubscription,
    listSubscriptions: listSubscriptions,
    deleteAllSubscriptions: deleteAllSubscriptions
};
