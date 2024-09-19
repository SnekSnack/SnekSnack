This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.



## Quick guide to fetching data;

imports:
```
import ProtectedRoute from "@/components/ProtectedRoute";
import api from "@/api.js";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
```


### Load data on page load
```
useEffect(() => {
    getBots();
}, []);
```
### Fetching the data
```
const [bots, setBots] = useState([]);

const getBots = () => {
    <!-- use the api -->
        api
        <!-- check Backend/SnekSnackDev/api/urls to see what is available -->
        <!-- create also returns fetches -->
            .get("/api/bots/")
            <!-- get the response data -->
            .then((res) => res.data)
            <!-- update our contstants with new data -->
            .then((data) => {
                setBots(data);
                console.log(data);
            })
            <!-- returns an alert if there is an error -->
            .catch((err) => alert(err));
    };
```

### authentication
- Special permissions are handled by the backend just ask el to limit it
- use ProtectedRoute for pages that needs a login
```
        <ProtectedRoute>
            <Header userName="username" />
            <Box className="content-wrapper" sx={{ paddingTop: '80px' }}>
                I Like cookies
            </Box>
        </ProtectedRoute>
```

### Backend Info

- model details: backend/sneksnackdev/api/models
- data fetch list: backend/sneksnackdev/api/urls
- list of fetch function: backend/sneksnackdev/api/views
- list of perms: backend/sneksnackdev/api/perms
> [!WARNING]
> Please dont touch these files without permission 