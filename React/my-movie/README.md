# 🎬 My Movie (React)

A small React app that searches OMDb, supports **signup/login with Firebase Auth**, and lets logged-in users **save a playlist** to **Cloud Firestore**. When you revisit the site, your playlist is fetched from Firestore automatically.

---

## ✨ Features

- 🔐 **Firebase Auth** (email/password): sign up & log in
- 🧭 **Client routing** with `react-router-dom`
- 🔎 Search OMDb and view movie details
- 📜 **Playlist** visible **after login**
- 💾 **Save playlist to Firestore**
- ☁️ On load, **fetch playlist from Firestore**

---

## ✅ Required Modules

These are the core runtime deps used by the app:

- [`react-router-dom`](https://reactrouter.com/)
- [`axios`](https://axios-http.com/)
- [`firebase`](https://firebase.google.com/)

Install (from the project root, e.g. `React/my-movie`):

```bash
# npm
npm i react-router-dom axios firebase

# or pnpm
pnpm add react-router-dom axios firebase
````

---

## 🧰 Prerequisites

* **Node.js** ≥ 18
* An **OMDb API key** (free tier): [https://www.omdbapi.com/apikey.aspx](https://www.omdbapi.com/apikey.aspx)
* A **Firebase project** with:

  * Authentication → **Email/Password** enabled
  * Firestore Database → in **Test Mode** (for development)

---


## 🔥 Firebase Setup (Auth + Firestore)

1. **Create a Firebase project** in the Firebase console.
2. **Add a Web app** and copy the web config into your `.env` (above).
3. **Enable Auth** → Sign-in method → turn on **Email/Password**.
4. **Create Firestore** (start in **Test mode** for local dev).

**Suggested Firestore data model** (per user playlist):

```
users/{uid}/playlist/{imdbID}  ->  {
  imdbID: string,
  Title: string,
  Poster: string,
  Year: string,
  ...any details you store
}
```

**Example (development) rules** — keep these strict for production later:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{uid}/ {
      allow read, write: if request.auth != null && request.auth.uid == uid;
    }
  }
}
```

---

## ▶️ Run the App

```bash
# install deps
npm i

# start dev server (Vite or CRA script)
npm run dev   # (Vite)
# or
npm start     # (CRA)
```

Open the printed local URL (e.g., `http://localhost:5173/`).

---

## 🧠 How It Works

### 1) Auth (Firebase)

* The app subscribes to `onAuthStateChanged(auth, callback)`.
* After **login/signup**, the user object is set in state (and/or Context).
* Routes/components that require auth check this state.

### 2) Playlist visibility

* When **not logged in**: the playlist UI is hidden/disabled.
* After **login**: the **playlist** section appears.

### 3) Save to Firestore

* Clicking “Save” stores a document under `users/{uid}/playlist` with the movie data.

### 4) Fetch on load

* On app load (and when auth state changes to a signed-in user), the app reads `users/{uid}/playlist` and renders the list.

### 5) OMDb requests

* Title search: `GET https://www.omdbapi.com/?s={title}&apikey=...`
* Details per movie: `GET https://www.omdbapi.com/?i={imdbID}&plot=full&apikey=...`
* Typically fetched with `axios`, and batched with `Promise.allSettled` for resiliency.



## 📜 License

MIT.

