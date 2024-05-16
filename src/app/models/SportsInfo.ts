const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class SportsInfo extends Model {
	public id!: number;
	public userId!: number;
	public favouriteTeam!: string;
	public heardyAboutCompetition!: string;
	public heardAboutOther!: string;
	public walkingSportInfo!: string;
}

SportsInfo.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		favouriteTeam: {
			type: DataTypes.STRING,
			allowNull: true
		},
		heardyAboutCompetition: {
			type: DataTypes.STRING,
			allowNull: true
		},
		heardAboutOther: {
			type: DataTypes.STRING,
			allowNull: true
		},
		walkingSportInfo: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'SportsInfo',
		tableName: 'sports_info',
	}
);

SportsInfo.sync();

export default SportsInfo;
