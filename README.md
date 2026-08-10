# Restaurant Chatbot

A restaurant chatbot application with a React frontend and an Express/MongoDB backend. Users can place orders through chat-style commands, view current orders, check order history, and proceed to payment via Paystack.

## Features

- Chat-based ordering flow
- Menu display and item selection
- Quantity entry and order updates
- Current order view
- Order history storage
- Checkout flow with Paystack payment verification
- Session-based order tracking

## Project Structure

- `client/` — React frontend
  - `src/components/` — chat UI and order components
  - `src/services/chatApi.js` — Axios API client for server requests
  - `src/pages/Home.jsx` — main layout
- `server/` — Express backend
  - `config/db.js` — MongoDB connection logic
  - `controllers/` — chat and order controllers
  - `routes/` — API routes for chat and orders
  - `services/chatbotService.js` — bot response logic
  - `models/Order.js` — Mongoose order schema
- `.gitignore` — ignores local env files, node_modules, logs, and editor settings

## Prerequisites

- Node.js 18+ installed
- npm installed
- MongoDB Atlas or local MongoDB instance
- Paystack account and secret key (for checkout verification)

## Setup

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd "Restaurant Chatbot"
```

### 2. Install client dependencies

```bash
cd client
npm install
```

### 3. Install server dependencies

```bash
cd ../server
npm install
```

### 4. Configure environment variables

Create a `.env` file inside `server/` with the following values:

```env
PORT=4000
MONGO_URI=<your-mongodb-uri>
SESSION_SECRET=<your-random-session-secret>
PAYSTACK_SECRET_KEY=<your-paystack-secret-key>
```

> Example of a secure session secret:
> `deb0fd94d21f002c77ef7e398e3629e10379b731a4ab93090aa625844ad8c2fe`

## Running the App

### Start the backend

```bash
cd server
npm run dev
```

### Start the frontend

```bash
cd client
npm run dev
```

The frontend should open via Vite, and the backend runs on `http://localhost:4000`.

## API Endpoints

- `POST /api/chat` — send a chat message and receive bot response
- `POST /api/orders` — add an item to the current order
- `GET /api/orders/current/:sessionId` — fetch the active pending order
- `GET /api/orders/history/:sessionId` — fetch paid order history
- `PUT /api/orders/checkout` — verify Paystack payment and complete checkout

## Chat Commands

- `1` — Place an order / open the menu
- `97` — View current order
- `98` — View order history
- `99` — Checkout
- `0` — Cancel order

## Notes

- The frontend uses `client/src/services/chatApi.js` to send chat messages to the server.
- The server handles bot logic in `server/services/chatbotService.js`.
- The server will continue running even if MongoDB is unavailable, but order persistence requires a working database.
- Make sure your MongoDB Atlas cluster allows connections from your network IP.

## Recommended Next Steps

- Add validation for user input in the chat frontend
- Improve the chat UI styling and message formatting
- Add authentication if you want users to log in
- Add tests for bot behavior and API endpoints

## License

This repository is provided as-is for learning and development.
