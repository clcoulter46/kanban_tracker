# About this project:
This is an attempt to build a kanban tracker, to get an idea of how other trackers are built and how to avoid the features I find frustrating in other trackers. 
Some basic functionality: 
    - can add new tasks by adding the 'Add New Task' Button 
    - can search tasks by keyword, assignee, and tags 
    - can update each task status with a dropdown bar
    - can see each task title/id automatically, as well as assignee, creation time, priority, and tags
    - can expand task description by clicking the '[- - -]' button. 
    - can edit task by clicking edit button
    - can delete tags by hitting delete and confirm buttons. [confirmation banner on page planned]

Some planned functionality:
    - '+' button to add task to each column
    - 'x' to clear search bar
    - task drag and drop to change status
    - may change how collapseable section is formatted/what information is collapsed
    - hover text to explain functionalities 
    - changing text box backgrounds to add more contrast
    - dropdown menu that includes past assignees
    - reformatting tags section to have it autosave in correct format, and remove chance of user error
    - change how current tags are displayed in edit task view
    - confirmation banner to appear on page when tasks are deleted or edited correctly/error banner for error handling
    - need to figure out how to display sprint handling/backlogs
    - should save a 'completed at' (time) field for completed tasks

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


