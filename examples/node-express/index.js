let axios = require('axios');
let express = require('express');

let builderApiKey = 'bb209db71e62412dbe0114bdae18fd15';
let app = express();

app.get('/', (req, res) => {
  res.send(template(`<h2>Welcome to the home page!</h2><p>This page comes from our code.</p>`));
});
app.get('/about', (req, res) => {
  res.send(
    template(`<h2>Welcome to the about page!</h2><p>This page comes from our code too.</p>`)
  );
});

// Put this route last, so you will catch anything not matched by your code
app.get('*', async (req, res) => {
  let page = await axios
    .get(
      `https://qa.builder.io/api/v1/html/page?url=${encodeURIComponent(
        req.url
      )}&apiKey=${builderApiKey}`
    )
    .catch(handleError);

  if (page && page.data) {
    res.send(template(page.data.data.html));
  } else {
    res.send(
      template(`
        <h2>No content found :(</h2>
        <p>Do you have a Builder page for this URL? Is it published?</p>
      `)
    );
  }
});

app.listen(3000, () => {
  console.log('Listening on port 3000...');
});

function handleError(err) {
  if (err.response.status === 404) {
    // Catch 404s - no page was found for this URL, that's fine
  } else {
    console.warn(err);
  }
  return null;
}

// Basic function to render content within a standard header and footer
// You can use any templating system you choose
let template = body => `
  <!DOCTYPE html>
  <html>
    <head>
      <style>
        body { font-family: sans-serif; }
        header { display: flex; padding: 10px; }
        .links { margin: auto; }
        main { padding: 10px; }
        .logo { font-size: 18px; letter-spacing: 2px; }
        .link { margin-right: 15px; }
      </style>
    </head>
    <body>
      <header>
        <div class="logo">MY SITE</div>
        <div class="links">
          <a class="link" href="/">Home</a>
          <a class="link" href="/about">About</a>
          <a class="link" href="/page-1">Page 1</a>
          <a class="link" href="/page-2">Page 2</a>
        </div>
      </header>
      <main>${body}</main>
      <footer>
      </footer>
    </body>
  </html>
`;
