export interface INotificationAction {

    /**
     * A string identifying a user action to be displayed on the notification.
     */
    action: string;

    /**
     * A string containing action text to be shown to the user.
     */
    title: string;

    /**
     * A string containing the URL of an icon to display with the action.
     */
    icon?: string;
}
