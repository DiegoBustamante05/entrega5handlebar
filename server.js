const express = require('express');
const app = express();
const { engine } = require('express-handlebars');
const PORT = 8080;

const Container = require('./container');
const container = new Container();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const server = app.listen(PORT, () => {
  console.log(`Servidor http://localhost:${server.address().port}`);
});


app.use('/public', express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
app.set('views', './views');
app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials',
  })
);


app.get('/products', async (req, res) => {
  const products = await container.getAll()
  res.render('productslist', { products, productsExist: true });
});

app.get('/', (req, res) => {
  //sirve productslist.hbs en index.hbs (index.hbs es la plantilla por defecto donde arranca todo)
  res.render('form', {});
});


app.post('/', (req, res) => {
  const {
      body
  } = req;
  try {
  container.save(body);
  res.send('Product uploaded');
  } catch {
  res.send('Product not saved');
  }
});