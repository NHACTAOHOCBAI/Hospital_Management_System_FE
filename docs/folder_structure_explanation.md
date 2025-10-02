# Folder Structure of Hospital Management System Frontend

This document provides a detailed explanation of the folder structure in the `Hospital_Management_System_FE` codebase for quick reference.

## Root Directory

-   **components.json**: Configuration or data related to components.
-   **eslint.config.js**: Configuration file for ESLint, a tool for identifying and fixing problems in JavaScript code.
-   **index.html**: The main HTML file for the application.
-   **package.json**: Contains metadata about the project and its dependencies.
-   **README.md**: Documentation file providing an overview of the project.
-   **tsconfig.app.json**, **tsconfig.json**, **tsconfig.node.json**: TypeScript configuration files for different environments.
-   **vite.config.ts**: Configuration file for Vite, a build tool and development server.

## design/

Contains design-related files.

-   **color-pallette.json**: JSON file for color palette definitions.

## docs/

Documentation files.

-   **authentication-implementation.md**: Documentation on authentication implementation.
-   **login-page.md**: Documentation related to the login page.

## public/

Static assets for the application.

-   **vite.svg**: An SVG file, likely used as a logo or icon.

## src/

The main source code directory.

-   **index.css**: Main CSS file for styling.
-   **main.tsx**: Entry point for the React application.
-   **vite-env.d.ts**: TypeScript declaration file for Vite.

### components/

Contains reusable UI components.

-   **crud_table/**: Components related to CRUD operations.
    -   `crud-table.tsx`: Main CRUD table component.
-   **table/**: Components related to table functionalities.
    -   Various table-related components (e.g., `custom-table.tsx`, `data-table-column-header.tsx`, etc.).
-   **ui/**: General UI components (e.g., `button.tsx`, `input.tsx`, `tooltip.tsx`, etc.).

### configs/

Configuration files, such as `axios-config.ts` for Axios.

### constants/

Contains enumerations and constants used throughout the application.

### hooks/

Custom React hooks.

-   **queries/**: Hooks for data fetching (e.g., `useUser.ts`).

### interfaces/

TypeScript interfaces for type definitions.

### layouts/

Layout components for different application views.

-   **admin_layout/**: Components specific to the admin layout.

### lib/

Utility functions (e.g., `utils.ts`).

### pages/

Page components for different routes.

-   **admin/**: Admin-related pages (e.g., `dashboard`, `user`).
-   **auth/**: Authentication-related pages (e.g., `login.tsx`).

### router/

Routing configuration (e.g., `router.tsx`).

### services/

Service files for API calls (e.g., `user.service.ts`).

### styles/

CSS files for styling (e.g., `hms-theme.css`).

## Conclusion

This structure promotes modularity and separation of concerns, making it easier to manage and scale the application.
