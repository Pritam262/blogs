This is a [Blog website](https://127.0.0.1:3000/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First install require packages
```bash
npm install
```
Now setup your environmental variable in .env file 
```bash
MONGO_URI =<YOUR MONGODB URL>
SERVER_URL = <YOUR APPLICATION URL>

JWT_SECRETE_KEY = <YOUR JWT SECRETE KEY>
JWT_COOKIES_EXPIRE_IN = 30

```

Then create variable.ts file on src folder and paste the code 

```bash
export const SERVER_URL = <YOUR APPLICATION URL>

```

Now, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http:/127.0.0.1:3001](http://localhost:3000) with your browser to see the result.

