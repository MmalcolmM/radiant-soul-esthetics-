const bcrypt = require('bcryptjs');

const enteredPassword = 'password'; // The password you're trying to log in with
const storedHashedPassword = '$2a$10$hXwo/zylSXWwN0pRSlCak.ypOP0olpqssFtX6KY56ePZ9FN000gTK'; // The hashed password from the database

bcrypt.compare(enteredPassword, storedHashedPassword).then(isValid => {
  console.log('Password isValid:', isValid); // This should log true if the passwords match
});
