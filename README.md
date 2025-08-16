# HungerBox

HungerBox is a modern food ordering web application built with React and Vite. It allows users to browse restaurants, view menus, manage their cart, and place orders. The app features address management, location-based restaurant filtering, and a clean, responsive UI.

## Features

- Browse restaurants by city and location
- Search and filter restaurants
- View detailed menus and add items to cart
- Address book for managing delivery addresses
- Checkout and order confirmation flow
- Context-based state management for cart, location, and restaurants
- Modular UI components (cards, buttons, dialogs, etc.)
- Firebase integration for backend services

## Tech Stack

- React
- Vite
- Context API
- Firebase
- CSS Modules

## Project Structure

```
src/
  components/         # Reusable UI components
  config/             # Firebase configuration
  context/            # React Contexts for state management
  hooks/              # Custom React hooks
  lib/                # Utility functions
  pages/              # Application pages (Home, Menu, Checkout, etc.)
  schemas/            # Validation schemas
  App.jsx             # Main app component
  main.jsx            # Entry point
```

## Getting Started

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the development server:**

   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

## Configuration

- Update Firebase settings in `src/config/firebase.js` as needed.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.
