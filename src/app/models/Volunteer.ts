const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class Volunteer extends Model {
	public id!: number;
	public userId!: number;
	public isActive!: boolean;
	public description!: string;
}

Volunteer.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		isActive: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'Volunteer',
		tableName: 'volunteers',
	}
);

export default Volunteer;