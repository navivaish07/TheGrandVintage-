# GrandVintage

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.17.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Deployment

### Frontend on Netlify

1. Push the repo to GitHub.
2. In Netlify, import the GitHub repository.
3. Set the build command to `npm run build`.
4. Set the publish directory to `dist/grand-vintage/browser`.
5. Update `frontend/src/environments/environment.prod.ts` with your backend URL:
   ```ts
   export const environment = {
     production: true,
     apiUrl: 'https://YOUR_BACKEND_DOMAIN/api'
   };
   ```

### Backend and database

- Deploy the backend to Render (recommended) or another Node.js host such as Railway, Fly.io, or Heroku.

Render quick steps:

1. Push your repository to GitHub (if not already pushed).
2. Go to https://render.com and create an account.
3. Click "New" → "Web Service" → "Connect a repository" and pick your GitHub repo.
4. For Environment, choose `Docker` (Render will use the `backend/Dockerfile` we added), or choose `Node` and set the Start Command to `npm run server`.
5. Add environment variables in the Render dashboard for the service:
  - `MONGO_URI` = `mongodb+srv://vaishh:<db_password>@grand-vintage.fdeihnz.mongodb.net/grand-vintage?retryWrites=true&w=majority&appName=Grand-Vintage`
  - `JWT_SECRET` = a secure string
  - `PORT` = `4000` (optional)
6. Deploy and wait — Render will give you a service URL like `https://your-service.onrender.com`.

After deploy, set `frontend/src/environments/environment.prod.ts` `apiUrl` to `https://your-service.onrender.com/api`.

### Environment variables

Local backend settings can be kept in `.env` (ignored by Git):

```env
PORT=4000
MONGO_URI=mongodb+srv://vaishh:<db_password>@grand-vintage.fdeihnz.mongodb.net/grand-vintage?retryWrites=true&w=majority&appName=Grand-Vintage
JWT_SECRET=your_jwt_secret_here
NODE_ENV=development
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
