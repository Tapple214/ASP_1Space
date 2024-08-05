## Running the Application

To run the application in development mode, follow these steps:

### 1. Start the Server (http://localhost:3001)

1. Open a terminal window.

2. Navigate to the server directory:
   `cd server`
3. Install the server dependencies:
   `npm install`

4. To create the database:

   (For Mac or Linux ) Run
   `npm run build-db`

   (For Windows) Run
   `npm run build-db-win`

   You can also run:
   `npm run clean-db` to delete the database on Mac or Linux before rebuilding it for a fresh start
   `npm run clean-db-win` to delete the database on Windows before rebuilding it for a fresh start

5. Start the server:
   `npm run dev`

### 2. Start the Client (http://localhost:3000)

1. Open a second terminal window (do not close the first terminal).

2. Navigate to the client directory:
   `cd client`

3. Install the client dependencies:
   `npm install`

4. Start the client:
   `npm run dev`

### TO CHECK

Test the app by browsing to the following routes, these would list contents their respective tables:

- http://localhost:3000
- http://localhost:3000/list-authors

### Important Notes

- **Ensure that the server is running before starting the client.** The client development will not function properly if the server is not running.
- "TODO:" will be a standard comment used throughout the development of the app for things to be build/added
