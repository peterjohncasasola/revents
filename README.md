# Revents - Event Management Application

A modern event management application built with React, TypeScript, Redux Toolkit, and Firebase.

## Features

- 📅 Create and manage events
- 👥 User authentication
- 🔄 Real-time updates
- 📱 Responsive design
- 🎨 Modern UI with Semantic UI React

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v7 or higher)
- Git

## Installation

1. Clone the repository:
```bash
git clone https://github.com/peterjohncasasola/revents.git
cd revents
```

2. Install dependencies:
```bash
npm install
```

3. Create a Firebase project:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication and Firestore
   - Get your Firebase configuration

4. Create environment variables:
   Create a `.env` file in the root directory with the following variables:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## Development

To start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Building for Production

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## Project Structure

```
src/
├── app/                    # Application core setup
│   ├── hooks/             # Custom hooks
│   ├── layout/            # Layout components
│   ├── router/            # Routing configuration
│   └── store/             # Redux store setup
├── common/                 # Shared components
│   ├── form/              # Form components
│   └── modals/            # Modal components
├── features/              # Feature modules
│   ├── auth/              # Authentication
│   └── events/            # Event management
├── config/                # Configuration files
└── types/                 # TypeScript type definitions
```

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit
- Firebase (Authentication & Firestore)
- Semantic UI React
- React Router 6
- React Hook Form
- Vite

## Features Implementation

### Authentication
- Email/Password authentication
- Social authentication (planned)
- Protected routes

### Event Management
- Create, read, update, delete events
- Real-time updates
- Event cancellation
- Event attendance

### Form Handling
- Form validation using React Hook Form
- Error handling
- Async form submission

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Environment Configuration

### Development
- Uses Vite's development server
- Hot Module Replacement (HMR)
- Source maps enabled

### Production
- Optimized build
- Code splitting
- Asset optimization

## Troubleshooting

### Common Issues

1. **Vite dependency optimization errors**
   ```bash
   rm -rf node_modules/.vite
   npm install
   ```

2. **Firebase configuration issues**
   - Verify environment variables
   - Check Firebase Console settings
   - Ensure correct initialization

3. **TypeScript errors**
   ```bash
   npm run type-check
   ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Peter John Casasola - [@peterjohncasasola](https://github.com/peterjohncasasola)

Project Link: [https://github.com/peterjohncasasola/revents](https://github.com/peterjohncasasola/revents)

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      ...tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      ...tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      ...tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
