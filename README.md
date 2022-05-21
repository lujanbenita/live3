# ALVA 3.0

1. `npm install` to install all package dependencies.
2. `npm run dev` to start the development server.

## Eslint & Prettier & Husky Format

There are defined the standard Airbnb Eslint rules.
Requires the VSC extensions Prettier - Code Formatter (Official) & Eslint (Official)

## Folder Structure

```
Components (Folder)
.
└── login (Name of the group of components (Folder))
    ├── styles
    │   └── login.scss
    └── LoginComponent.js
```

Name of the group of components (Folder)

- NameOfTheContainerContainer.js (If there is a hig order component to manage logic + Pascal case + followed by the string "Container")
- NameOfTheComponentComponent.js (Pascal Case + followed by the string "Component" in the case of the main component of the folder)
- SubComponentName.js (Pascal Case)

---

## Next js standard Guide

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
