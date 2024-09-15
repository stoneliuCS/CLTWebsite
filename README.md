## CLTWebsite

## Setup
- This project uses Next.js, a Fullstack React Framework, you can learn more here: https://nextjs.org/
- Dependencies are to be installed via npm, the node package manager: https://www.npmjs.com/ 
- NextUI is used as the primary component library: https://nextui.org/ 
- Tailwind CSS is used as the main styling library: https://tailwindcss.com/ 
- MongoDB is the database, read more here : https://www.mongodb.com/
- AWS S3 Bucket to store images : https://aws.amazon.com/s3/

## Getting started with development:
- Navigate to the frontend project directory, 
- cd app
- npm install (Install dependencies)
- npm run dev (For development)

## Project Layout For Developers
- Under the /src directory you will see:
    - /app
        - /api 
        - ... (Other Pages)
    - /components
        - ... (Reusable Components)
    - /constant
        - ... (Constants)
    - /types
        - ... (Types)
    - /utils 
        - ... (Global Utility Functions)
    - middleware.ts (Executed every /api call)

## Deployment and CI/CD
- Since the main branch is the current production branch, I am the only one allowed to push to production.
- This application uses Vercel, a streamline way to push Next.js projects to production, read more here: https://vercel.com/


