const serve = require('serve');

const server = serve('build', {
  port: process.env.PORT || 3000,
});

console.log(`Server running on port ${server.port}`);
