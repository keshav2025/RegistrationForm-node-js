const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Sample Form</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { font-family: Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; background-color: #f4f4f9; }
            .form-container { width: 100%; max-width: 400px; padding: 20px; background-color: #fff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border-radius: 8px; }
            .form-container h2 { margin-bottom: 15px; color: #333; text-align: center; }
            label { font-weight: bold; margin-bottom: 5px; display: block; color: #555; }
            input[type="text"], input[type="email"], input[type="password"], select { width: 100%; padding: 10px; margin-bottom: 15px; border: 1px solid #ccc; border-radius: 4px; font-size: 16px; color: #333; }
            .radio-group { margin-bottom: 15px; }
            .radio-group label { font-weight: normal; margin-right: 10px; }
            button[type="submit"] { width: 100%; padding: 10px; background-color: #28a745; border: none; border-radius: 4px; color: white; font-size: 16px; cursor: pointer; transition: background-color 0.3s; }
            button[type="submit"]:hover { background-color: #218838; }
        </style>
    </head>
    <body>
    <div class="form-container">
        <h2>Registration Form</h2>
        <form action="/RegistrationSuccessful!" method="post">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" required>
            <label for="email">Email</label>
            <input type="email" id="email" name="email" required>
            <label for="password">Password</label>
            <input type="password" id="password" name="password" required>
            <label>Gender</label>
            <div class="radio-group">
                <input type="radio" id="male" name="gender" value="male">
                <label for="male">Male</label>
                <input type="radio" id="female" name="gender" value="female">
                <label for="female">Female</label>
            </div>
            <label for="country">Country</label>
            <select id="country" name="country">
                <option value="usa">USA</option>
                <option value="canada">Canada</option>
                <option value="uk">UK</option>
                <option value="australia">Australia</option>
            </select>
            <button type="submit">Submit</button>
        </form>
    </div>
    </body>
    </html>`);
    res.end();
  } else if (req.url === '/RegistrationSuccessful!' && req.method === 'POST') {
   
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
     
      const formData = querystring.parse(body);

      const dataToSave = `Name: ${formData.name}\nEmail: ${formData.email}\nPassword: ${formData.password}\nGender: ${formData.gender}\nCountry: ${formData.country}\n\n`;
      fs.appendFile('data.txt', dataToSave, (err) => {
        if (err) {
          console.error('Error saving data:', err);
          res.writeHead(500, { 'Content-Type': 'text/html' });
          res.end('<h1>Server Error</h1>');
          return;
        }
        console.log('Data saved to data.txt');

       
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(`<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Registration Confirmation</title>
            <style>
                * { box-sizing: border-box; margin: 0; padding: 0; }
                body { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; }
                .confirmation-container { max-width: 400px; padding: 20px; background-color: #fff; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1); border-radius: 8px; text-align: center; }
                .confirmation-container h1 { color: #28a745; font-size: 24px; margin-bottom: 10px; }
                .confirmation-container p { font-size: 16px; margin-bottom: 20px; line-height: 1.5; }
                .confirmation-container a { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 16px; transition: background-color 0.3s; }
                .confirmation-container a:hover { background-color: #0056b3; }
            </style>
        </head>
        <body>
        <div class="confirmation-container">
            <h1>Registration Successful!</h1>
            <p>Thank you for registering with us. Your account has been successfully created, and you can now log in to access your profile.</p>
            <a href="/RegistrationSuccessful!">Go to Home page</a>
        </div>
        </body>
        </html>`);
        res.end();
      });
    });
  }else {
   
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>404 Not Found</title>
        <style>
            * { box-sizing: border-box; margin: 0; padding: 0; }
            body { display: flex; align-items: center; justify-content: center; min-height: 100vh; font-family: Arial, sans-serif; background-color: #f4f4f9; color: #333; }
            .error-container { max-width: 600px; padding: 40px; text-align: center; }
            .error-container h1 { font-size: 72px; color: #ff6b6b; margin-bottom: 10px; }
            .error-container h2 { font-size: 24px; margin-bottom: 20px; color: #333; }
            .error-container p { font-size: 18px; margin-bottom: 20px; color: #666; }
            .error-container a { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #fff; text-decoration: none; border-radius: 4px; font-size: 16px; transition: background-color 0.3s; }
            .error-container a:hover { background-color: #0056b3; }
            .error-container img { width: 100%; max-width: 250px; margin-bottom: 20px; }
        </style>
    </head>
    <body>
        <div class="error-container">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p>Oops! The page you are looking for does not exist. It might have been moved or deleted.</p>
            <a href="/">Go Back to Home</a>
        </div>
    </body>
    </html>`);
  }
  
});

const PORT = 5001;
server.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
