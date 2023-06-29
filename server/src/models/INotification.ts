import { INotificationAction } from "./INotificationActions";

export interface INotification {

    /**
     * The actions array of the notification as specified in the constructor's options parameter.
     */
    actions?: INotificationAction[],

    /**
     * The URL of them image used to represent the notification when there is not enough space
     * to display the notification itself.
     */
    badge?: string,

    /**
     * The body of the notification.
     */
    body: string,

    /**
     * The text direction of the notification as specified in the constructor's options
     * parameter.
     */
    dir?: "auto" | "ltr" | "rtl",

    /**
     * The URL of the image used as an icon of the notification as specified in the
     * constructor's options parameter.
     */
    icon?: string,

    /**
     * The URL of an image to be displayed as part of the notification, as specified in
     * the constructor's options parameter.
     */
    image?: string,

    /**
     * The language code of the notification as specified in the constructor's options parameter.
     */
    lang?: string,

    /**
     * Specifies whether the user should be notified after a new notification replaces an old one.
     */
    renotify?: boolean,

    /**
     * A boolean value indicating that a notification should remain active until the user clicks
     * or dismisses it, rather than closing automatically.
     */
    requireInteraction?: boolean,

    /**
     * Specifies whether the notification should be silent — i.e., no sounds or vibrations
     * should be issued, regardless of the device settings.
     */
    silent?: boolean,

    /**
     * The ID of the notification (if any) as specified in the constructor's options parameter.
     */
    tag?: string,

    /**
     * Specifies the time at which a notification is created or applicable (past, present, or future).
     */
    timestamp?: string,

    /**
     * The title of the notification as specified in the first parameter of the constructor.
     */
    title: string,

    /**
     * Specifies a vibration pattern for devices with vibration hardware to emit.
     * Example: [200, 100, 200]
     */
    vibrate?: number[];
}
