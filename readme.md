# Group Project IS403

## Account Page Protection

The account page is now password protected. Users must be authenticated to access this page. If a user tries to access the account page without being logged in, they will be redirected to the login page.

## Database Configuration

To enable user authentication, connect a database that follows the Knex configuration. Ensure that your `users` table includes the following columns:
- `username`: The username of the user.
- `password`: The password of the user.

Once the database is connected and the `users` table is set up, the application will be able to log users in and protect the account page.
