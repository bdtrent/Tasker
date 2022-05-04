const { sequelize } = require("../models");
const db = require("../models");

exports.getTaskForMonth = async (req, res) => {
	if (!('year' in req.query && 'month' in req.query)) {
		res.status(400);
		res.send('Invalid usage');
		return;
	}

	let [results, meta] = await sequelize.query('SELECT name, description, due_date FROM tasks WHERE YEAR(due_date)=? AND MONTH(due_date)=?', {
		replacements: [Number(req.query.year), Number(req.query.month)]
	});
	res.send(results);
}