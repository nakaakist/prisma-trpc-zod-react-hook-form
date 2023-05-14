# Simple full-stack app using Prisma, tRPC, Zod, React Hook Form

## About

This is an example implementation of a simple document posting app.

Following is the list of features:

- User can create/update/delete posts
- Each post contains a text and a list of topics.
- Post has two types, short and long. Each type has different validation rules on the length of the text.
- No authentication is implemented.

## Run locally

Prerequisites: Node.js (>= v18), pnpm, Docker

1. Install dependencies

```bash
pnpm install
```

2. Copy `.env.sample` files in `packages/server` and `packages/client` to `.env`.

3. Make sure that you have Docker running, and then run the following command in `packages/server`

```bash
pnpm dev
```

4. Run the following command in `packages/server` to setup DB

```bash
pnpm setup:db
```

5. Run the following command in `packages/client` to start frontend, then open `http://localhost:5173`

```bash
pnpm dev
```

## Notes on the implementation

The following codes are shared between the server and the client:

- Zod schemas: used to validate API requests on the server and form inputs on the client.
- tRPC route types: used to define API routes on the server and to set up tRPC on the client.

To achieve this, the client employs TypeScript’s [project reference](https://www.typescriptlang.org/docs/handbook/project-references.html).
