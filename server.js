const express = require('express');
const app = express();

app.listen(3000, () => {
	console.log('server start');
});

app.use((req, res) => {
	res.send({msg:'Hello node'});
});


