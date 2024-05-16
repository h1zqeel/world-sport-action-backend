const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class OtherSport extends Model {
	public id!: number;
	public userId!: number;
	public name!: string;
}

OtherSport.init(
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
		modelName: 'OtherSport',
		tableName: 'other_sports',
	}
);


OtherSport.sync();

export default OtherSport;