# NextBookStore 📚 - Your Online Bookstore with Next.js

[![GitHub Actions Workflow Status](https://github.com/victorts1991/react-next-shop-ts/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/victorts1991/react-next-shop-ts/actions/workflows/ci-cd.yml)

## 📖 About the Project

NextBookStore is a modern e-commerce web application built with **Next.js 15.x (App Router)**, designed to simulate an online bookstore. This project demonstrates web development best practices, including global state management, advanced responsiveness, a robust theme system, and a complete CI/CD pipeline for automated testing and deployment.

## ✨ Key Features

* **Book Catalog:** Explore a collection of books with details (title, author, price, description, image), fetching data from a local JSON file optimized for build-time.
* **Shopping Cart:** Add, remove, and adjust the quantity of books in the cart.
* **Global State Management:** Utilizes **Redux Toolkit** for efficient application state management (shopping cart), ensuring a clear and scalable data flow.
* **Light/Dark Mode:** Toggles the application's theme for a customizable user experience, using Tailwind CSS's class strategy.
* **Responsive Design:** Adaptive layout for various screen sizes (desktop, tablet, mobile).
* **Theme Preference Persistence:** The chosen theme (Light/Dark mode) is saved in the browser's Local Storage to persist across sessions.
* **Dynamic Routes:** Displaying book details via Next.js App Router dynamic routes (`/books/[id]`).

## 🚀 Technologies Used

* **Next.js 15.x (App Router):** Cutting-edge React framework for high-performance web applications, featuring Server Components for optimization.
* **React 19.x:** JavaScript library for building reactive user interfaces.
* **TypeScript:** Language that adds static typing and safety to JavaScript.
* **Tailwind CSS:** Utility-first CSS framework for rapid, responsive styling with a mobile-first approach.
* **Redux Toolkit:** A set of tools to simplify Redux development, providing recommended patterns and utilities.
* **React Icons:** A library of popular icons for React.
* **Jest:** JavaScript testing framework for high-speed unit and integration tests.
* **React Testing Library:** Utilities for testing React components in a user-centric way.
* **GitHub Actions:** CI/CD automation for build, test, and deploy workflows.
* **Vercel:** Leading deployment and hosting platform for Next.js applications, with seamless GitHub integration.

## 🛠️ Getting Started (Local Development)

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

Ensure you have Node.js (version 20 or higher recommended) and npm (or Yarn) installed on your system.

* [Node.js](https://nodejs.org/)
* [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)

### Installation

```bash
git clone [https://github.com/victorts1991/react-next-shop-ts.git](https://github.com/victorts1991/react-next-shop-ts.git)
```
```bash
cd react-next-shop-ts

npm install
# or
yarn install
```

### Running the Development Server

To start the application in development mode:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the running application.

### Running Automated Tests

To run all tests configured with Jest:

```bash
npm test
# or
yarn test
```

To run tests in "watch" mode (observe file changes and automatically re-run tests):

```bash
npm run test:watch
# or
yarn test:watch
```

## 🚀 Robust Deployment & CI/CD

This project is configured with a complete **Continuous Integration/Continuous Deployment (CI/CD)** pipeline using **GitHub Actions** and **Vercel**, ensuring the code is automatically tested and deployed.

### GitHub Actions Pipeline

The `.github/workflows/ci-cd.yml` file defines the CI/CD pipeline, orchestrating the following flow:

1.  **Automated Tests:**
    * **Trigger:** Executed on every push to the `main` branch.
    * **Action:** Installs dependencies, sets up the Node.js environment, and runs all Jest tests.
    * **Behavior:** If tests fail, the pipeline is interrupted, preventing the deployment of broken code.

2.  **Production Deployment (for `main`):**
    * **Trigger:** If tests pass on a direct push or merge to the `main` branch.
    * **Action:** The project is automatically deployed to the Vercel production environment.

### Vercel Deployment Configuration

For the deployment pipeline to function, you must configure your Vercel project and GitHub secrets:

1.  **Import the Project to Vercel:**
    * Perform the initial deployment of your `react-next-shop-ts` repository to Vercel via the [Vercel dashboard](https://vercel.com/new). This will establish the Vercel project and generate the necessary IDs.
2.  **Get Vercel IDs and Token:**
    * In your **Vercel Dashboard**, navigate to your project's settings (`Settings > General`) to obtain the **`Project ID`** and **`Organization ID`**.
    * For the **`VERCEL_TOKEN`**, go to your Vercel account settings (`Settings > Tokens`) and create a new API token.
3.  **Configure GitHub Secrets:**
    * In your GitHub repository, go to **`Settings`** > **`Secrets and variables`** > **`Actions`**.
    * Add the following repository secrets, using the values obtained from Vercel:
        * `VERCEL_TOKEN`
        * `VERCEL_ORG_ID`
        * `VERCEL_PROJECT_ID`
4.  **Disable Vercel Automatic Deployments (Recommended):**
    * To prevent duplicate deployments (one by Vercel's native Git integration and another by GitHub Actions), go to the **Git** settings of your project in Vercel and **disable automatic deployment for the `main` branch**.
