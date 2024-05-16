import express from "express";
import sequelize from "./db/sequelize";
import bodyParser from 'body-parser';
import router from "./app/routes";
import cors from 'cors';

const app = express();
const PORT = 4000;

declare global {
	namespace globalThis {
		var sequelize: any;
	}
}
const corsOptions = {
  AccessControlAllowOrigin: '*',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
}
app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

sequelize.authenticate().then(() => {
  global.sequelize = sequelize;
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

app.use('/', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
