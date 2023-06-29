<div>
    <h1 align="center">
        Push notifications
    </h1>
    <div align="center" style="display: inline_block"><br>
        <img align="center" alt="Angular" height="36" width="40" src="https://angular.io/assets/images/logos/angular/angular.svg">
        <img align="center" alt="PWA" height="30" width="40" src="https://angular.io/generated/images/marketing/concept-icons/pwa.svg">
        <img align="center" alt="Node.js" height="30" width="40" src="https://nodejs.dev/static/images/brand/hexagon/js-green.svg">
    <h3 align="center">Demonstration of push notifications with angular and node.</h3>
    </div>
    <p align="center"><a href="https://demo-push-notifications.vercel.app/" target="_blank"><i>Demo 🔗</i></a></p>
    <p align="center">
        <a href="https://github.com/baptisteArno/typebot.io/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" /></a>
    </p>
	<hr>
</div>

<br>

## 📨 Demo

- Available in [`demo-push-notifications.vercel.app`](https://demo-push-notifications.vercel.app/).
- After accessing and allowing notifications receiving, send a notification request to the server.Example:
```bash
curl -X POST https://demo-push-notifications-server.vercel.app/notification/push/send -H "Content-Type: application/json" -d '{"title": "Test 1", "body": "Notification Test"}'
```
- "Title" and "Body" are the only mandatory properties.The list with all properties including optional is available [here](./server/src\models\INotification.ts).

## 🔧 Local setup

1. Clone the repository
```bash
git clone https://github.com/lucasdemoraesc/push-notifications-demo.git
```

2. Install dependencies
```bash
npm install # In the project root folder
```

3. Setup environment variables:
   - Copy [server/src/.env.example](server/src/.env.example) to server/src/.env
   - Replace placeholder values in the copied file.
     - A set of Vapid Keys can be generated [here](https://tools.reactpwa.com/vapid).

4. Start the client application
```bash
npm start:client # In the project root folder
```

5. Start the server application
```bash
npm start:server # In the project root folder
```

## 🧩 Used Technologies

- [Angular 16](https://angular.io/docs)
  - [PWA](https://angular.io/guide/service-worker-intro)
- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Vercel](https://vercel.com/)
