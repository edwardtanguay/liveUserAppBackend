import express from 'express';
import { MongoClient } from 'mongodb';

const app = express();
const port = 3022;
const mongoConnectionString = 'mongodb://localhost:27017';
const client = new MongoClient(mongoConnectionString);

const getData = async (done) => {
	await client.connect();
	const db = client.db('api002');
	done(db);
}

app.get('/', (req, res) => {
	getData(async (db) => {
		const users = await db.collection('users100').find()
			.project({
				name: 1,
				username: 1,
				email: 1
			})	
			.toArray();
		res.json(users);
	});
});


app.delete('/deleteuser/:id', (req, res) => {
	const id = req.params.id;
	res.send(id);
});

app.listen(port, () => {
	console.log(`listening on port ${port}...`);
})