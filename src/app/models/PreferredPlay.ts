const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class PreferredPlay extends Model {
	public id!: number;
	public userId!: number;
	public day!: string;
}

PreferredPlay.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		day: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'PreferredPlay',
		tableName: 'preferred_play',
	}
);

export default PreferredPlay;