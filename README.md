
<div align="center">
	<img src="./src/assets/logoicon.PNG" alt="MovieHorizon Logo" width="220" />
	<h3>Explore movies, actors and details in a diferent and unique way.</h3>

	
![Technologie Icons](https://skillicons.dev/icons?i=html,css,tailwind,typescript,react,jest,firebase,nodejs,vite,figma,github,git "Technologie Icons")

</div>

---

## 🚀 Demo

👉 <a href=https://jlrodriguez31.github.io/MovieHorizon/>github.io/MovieHorizon</a>

---

## 🧠 Overview

MovieHorizon is a web app focused on movie discovery with a polished UI and smooth navigation between:

- Popular movies list (infinite scrolling)
- Movie detail pages with cast and production data
- Actor detail pages with filmography
- Authentication with Firebase (email/password + Google)
- Guest mode access to reduce user friction

---

## 🏗️ Architecture

The project is organized into clear layers and feature modules:

### 🔷 Presentation Layer

- Reusable UI components and feature blocks
- Route-based pages for each user flow
- Tailwind-powered responsive layouts

### 🔷 Data Layer

- TMDB data requests via Axios
- Server-state management with TanStack Query
- Typed models for API payloads

### 🔷 Auth Layer

- Firebase Auth provider and auth service
- Protected routes for private pages
- Guest session mode with session storage

---

## 📂 Project Structure

```text
src/
├── auth/
│   ├── components/
│   ├── context/
│   └── hooks/
├── components/
│   ├── animations/
│   ├── audio/
│   ├── Button/
│   ├── Card/
│   └── Logo/
├── config/
│   └── tmdb.ts
├── features/
│   ├── footer/
│   ├── header/
│   └── main/
├── pages/
│   ├── actorDetailsPage/
│   ├── loginPage/
│   ├── movieDetailsPage/
│   ├── moviePage/
│   ├── registerPage/
│   └── welcomePage/
├── routes/
└── types/
```

---

## ✨ Core Features

### 🔐 Authentication

- Register and login with email/password
- Google sign-in
- Route protection for private sections
- Guest access flow from Login page

### 🎬 Movie Discovery

- Popular movies feed from TMDB
- Infinite scroll using IntersectionObserver
- Card-based browsing UI

### 🎥 Movie Details

- Poster, backdrop and metadata
- Runtime, release date, revenue, genres
- Cast and crew references

### 🎭 Actor Details

- Actor profile information
- Filmography list
- Easy navigation between actor and movie pages

### 🎵 Ambient Experience

- Optional audio player component when authenticated

---

## 🧪 Technologies Used

- React 19
- TypeScript
- Vite
- Tailwind CSS v4
- TanStack Query
- React Router
- Firebase Auth
- Axios
- Storybook
- ESLint

---

## ⚙️ Setup & Installation

### 1) Clone and install

```bash
git clone https://github.com/JLrodriguez31/MovieHorizon.git
cd MovieApp-v2
npm install
```

### 2) Run locally

```bash
npm run dev
```

Open: `http://localhost:5173`

---

## 📜 Available Scripts

- `npm run dev` Starts local dev server
- `npm run build` Builds production bundle
- `npm run preview` Serves built app locally
- `npm run lint` Runs ESLint
- `npm run storybook` Starts Storybook
- `npm run build-storybook` Builds Storybook static bundle
- `npm run deploy` Deploys to GitHub Pages (after build)

---

## 👨‍💻 Author

Built by Juan Luis Rodriguez Chavarria.
