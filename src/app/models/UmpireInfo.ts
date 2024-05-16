const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class UmpireInfo extends Model {
	public id!: number;
	public userId!: number;
	public isNewToUmpiring!: boolean;
}

UmpireInfo.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		isNewToUmpiring: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'UmpireInfo',
		tableName: 'umpire_info',
	}
);

export default UmpireInfo;