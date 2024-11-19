# Insiders

This is a React application that displays insider trading information loaded from "Finansinspektionen.
When new information is loaded a push notification is being sent (only https)

## Features
- Fetches insider trading data from an API
- Displays data in a table
- Sends notifications when insider list changes

## Technologies/packages Used
- Vite
- TSX
- React
- TypeScript
- Redux
- SCSS
- Koa
- Cheerio

## Getting Started
Clone repo and install
```
npm i
```
<br>
Start the backend server with the command

```
npm run server
```
<br>
Start the frontend with the command

```
npm run dev
```
The server also routes the index file, meaning you will also be able to access the site with this url
```
http://localhost:3000/
```


### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
