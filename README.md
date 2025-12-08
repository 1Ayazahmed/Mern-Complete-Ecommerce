# Mern-Complete-Ecommerce

A full-featured e-commerce platform built with the MERN stack (MongoDB, Express.js, React, Node.js). This README documents how to run the project and the key frontend libraries used (Redux Toolkit, Tailwind CSS, shadcn/ui, etc.).

## Features

- User authentication and authorization (JWT)
- Product management
- Shopping cart functionality
- Order processing
- User profile management

## Tech Stack

- Frontend: React (Vite)
- State: Redux Toolkit
- UI helpers: shadcn/ui (optional components), Tailwind CSS, sonner (toasts), lucide (icons)
- HTTP client: axios
- Backend: Node.js + Express
- Database: MongoDB (Mongoose)

## Getting Started

### Prerequisites

- Node.js (>=16)
- MongoDB (Atlas or local)
- npm or yarn

### Install & Run

1. Clone the repository

```bash
git clone https://github.com/1Ayazahmed/Mern-Complete-Ecommerce.git
cd Mern-Complete-Ecommerce
```

2. Backend

```bash
cd backend
npm install
# copy .env.example -> .env and set values (MONGODB_URI, JWT_SECRET_KEY, MAIL_USER, MAIL_PASSWORD)
npm run dev    # or `npm start` depending on script
```

3. Frontend

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` (or the port Vite prints) for the frontend and `http://localhost:3000` for backend API.

## Frontend Libraries & Notes

This project uses several libraries that you should be aware of and how to work with them.

- Redux Toolkit
	- Location: `frontend/src/redux/` (store and `userSlice.js`).
	- Usage: dispatch `setUser(user)` after a successful login to store user info in Redux. If you want the user to persist after page reload, persist the user object and tokens to `localStorage` and rehydrate the store on app startup (example: read `localStorage.user` in `main.jsx` and dispatch `setUser(...)`).

- Tailwind CSS
	- Already configured in the frontend. Use utility classes in components (e.g. `bg-[#1f1f1f]`, `text-gray-400`).
	- If you need to reconfigure, check `tailwind.config.js` and `postcss.config.js`.

- shadcn/ui (shad cn)
	- Used for UI primitives (cards, inputs, buttons). Setup was performed with `npx shadcn@latest add`.
	- Components live under `frontend/src/components/ui/`.

- sonner
	- Toast notifications. Usage example: `toast.success('Message')`.

- lucide-react
	- Icon set used in various components (e.g. `ShoppingCart`, `Eye` icons).

- axios
	- HTTP client used to call backend APIs (e.g. login, logout). Requests that require authentication should include `Authorization: Bearer <accessToken>` header.

## Recommended Minimal Fixes (if you see `user` as `null` in Navbar)

1. After login, ensure the backend response includes `user` and tokens. Example response shape the frontend expects:

```json
{
	"success": true,
	"message": "Welcome Back ...",
	"user": { "_id": "...", "firstName": "...", "role": "admin" },
	"accessToken": "...",
	"refreshToken": "..."
}
```

2. Dispatch `setUser(res.data.user)` in `Signin.jsx` after a successful login. To survive reloads, save the user and tokens to `localStorage` and rehydrate Redux store on startup.

3. Ensure `Navbar.jsx` uses `useSelector((state) => state.user.user)` or destructures `{ user } = state.user` depending on your slice shape.

## Troubleshooting

- If frontend shows `No routes matched location "/verify/<token>"` make sure `App.jsx` defines a route that accepts a token param (e.g. `/verify/:token`).
- If backend cannot connect to MongoDB and you see `ENODATA`/`querySrv` errors, check `MONGODB_URI` in `backend/.env` (avoid trailing slashes and ensure the SRV host is correct).
- If changes don't take effect, fully stop and restart dev servers (Vite and nodemon) — some edits require restarting to clear caches.

## Useful Commands

- Start backend (dev):
```bash
cd backend
npm run dev
```

- Start frontend (Vite):
```bash
cd frontend
npm run dev
```

## Contributing

Pull requests welcome. If you accidentally committed sensitive files (like `.env`), remove them from the repo and rotate any secrets.

## License

[MIT](https://choosealicense.com/licenses/mit/)