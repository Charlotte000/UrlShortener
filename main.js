const express = require('express');

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const app = express();
const settings = require('./settings');
const PORT = process.env.PORT || 8000;

const exphbs = require('express-handlebars')

// HandleBars
app.engine('handlebars', exphbs({ defaultLayout: "main"}));
app.set('view engine', 'handlebars');
app.use(express.static("static"));

// Body Parser
app.use(express.json());
app.use(express.urlencoded({ extended: false}));

// Routes
app.get("/admin", (req, res) => {
	db.find().toArray((err, docs) => {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		res.json(docs);
	});
});

app.get("/", (req, res) => {
	res.render('index')
});

app.get("/:id", (req, res) => {
	db.findOne({ url_short: req.params.id }, (err, doc) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else if (doc)
			res.redirect(doc.url_long);
		else 
			res.render('notFound');
	});
});

app.post("/", (req, res) => {
	db.find().toArray((err, docs) => {
		let url_long = req.body.urlValue;
		if (!(url_long.startsWith("https://") || url_long.startsWith("http://"))) {
			url_long = "http://" + url_long;
		}

		let url_short = (docs.length).toString(36);

		let newUrl = {
		'url_long': url_long,
		'url_short': url_short
		}

		db.insertOne(newUrl, (err, result) => {
			if (err) {
				console.log(err);
				return res.sendStatus(500);
			}
			res.render('created', {url: `https://sh-ort.herokuapp.com/${url_short}`})
		});

	});
	
});

app.get("/:id/check", (req, res) => {
	db.findOne({ url_short: req.params.id }, (err, doc) => {
		if (err) {
			console.log(err);
			res.sendStatus(500);
		} else if (doc)
			res.send(doc.url_long);
		else 
			res.render('notFound');
	});
});

app.get("*", (req, res) => {
	res.send("Bad URL");
});

MongoClient.connect(settings.url, { useNewUrlParser: true }, (err, client) => {
	if (err) return console.log(err);

	db = client.db(settings.dbName).collection("urls");

	app.listen(PORT, () => console.log(`Starting server at ${PORT}`));
});