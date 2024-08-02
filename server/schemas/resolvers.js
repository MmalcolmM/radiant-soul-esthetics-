const {User} = require('../models')

const resolvers = {
    Query: {
      
    },
    Mutation: {
      signup: async (parent, { username, password }) => {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      },
      login: async (parent, { username, password }) => {
        const user = await User.findOne({ username });
        if (!user) throw new Error('Invalid credentials');
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) throw new Error('Invalid credentials');
        return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET);
      },
      sendEmail: async (parent, { name, email, message }) => {
        const msg = {
          to: 'info@rsesthetics.com', // Your email address
          from: 'em4346@rsesthetics.com', // Your verified sender email
          replyTo: email, // User's email address
          subject: 'New Contact Form Submission',
          text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
          html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`,
        };
  
        await sgMail.send(msg);
        return 'Email sent successfully!';
      },
    },
  };

module.exports = resolvers;
