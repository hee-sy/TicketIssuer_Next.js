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

---

# 🎫Ticket Management System

A web application for managing customer tickets and counters. It includes two main views: **Customer View** and **Counter Manager View**.

---

## Features

- **Ticket Number Reset**: The ticket number generated will be reset to 1 every 24h.
- **Data Persistence Limit**: User can only see the data (numbers, queue, counter status) on their local device as there is no any database implementation.

### **1. Customer View**

- **Take a Number**: Customers can take a ticket, which generates a new ticket number.
- **Now Serving**: Displays the latest ticket number being served.
- **Last Number**: Shows the latest ticket number issued.
- **Counters Overview**: Displays the status of each counter (online/offline) and the ticket number they are currently serving.

### **2. Counter Manager View**

- **Waiting Queue**: Displays the list of tickets waiting to be served.
- **Drag and Drop**: Allows the manager to drag the front ticket number from the queue and drop it onto a ready counter to assign it.
- **Toggle Counter Status**: Managers can toggle counters between **online** and **offline**.
- **Clear Queue**: Provides an option to clear the entire waiting queue.

## Technologies Used

- **Frontend**: Next.js (with TypeScript)
- **Styling**: Tailwind CSS (or your chosen library)
- **State Management**: React State API
- **Persistence**: `localStorage` for saving ticket and counter data across page refreshes

## Usage

### Customer View

1. Click the "Take a Number" button to generate a new ticket.
2. View the Now Serving and Last Number displays for real-time updates.
3. Check the status of counters and the ticket numbers they are serving.

### Counter Manager View

1. View the **Waiting Queue** to see all issued tickets.
2. Drag the front ticket number from the queue and drop it onto a ready counter to assign it.
3. Toggle counters **online/offline** as needed.
4. Use the **Clear Queue** button to reset the waiting queue.

## Persistence

The application uses `localStorage` to save the state of the queue, counters, and last ticket number.

Data persists across page refreshes and browser sessions.

## Contributing

Contributions are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

## Acknowledgments

- Built with React and TypeScript.
- Drag-and-drop functionality implemented using the HTML5 Drag and Drop API.
- Persistence achieved using `localStorage`.

## Contact

For questions or feedback, please reach out to Henry at heesy2024+github@gmail.com.

---
