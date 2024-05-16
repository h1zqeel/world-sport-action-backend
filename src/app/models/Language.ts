const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class Language extends Model {
	public id!: number;
	public userId!: number;
	public name!: string;
}

Language.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'Language',
		tableName: 'languages',
	}
);

Language.sync({force: true});

export default Language;