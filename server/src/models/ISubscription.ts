export interface ISubscription {

    /**
     * The URL to cloud message service.
     */
    endpoint: string,

    /**
     * The expiration time of the subscription.
     */
    expirationTime?: any,

    keys: {
        /**
         * Encryption key used to encrypt the message before sending it to the Push Service.
         */
        p256dh: string,

        /**
         * Authentication secret.
         */
        auth: string;
    };
}
