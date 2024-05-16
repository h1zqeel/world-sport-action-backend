// CompetitionVenues
// PK id INT
// FK competiitionId INT
// name STRING

const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class CompetitionVenues extends Model {
	public id!: number;
	public competitionId!: number;
	public name!: string;
}

CompetitionVenues.init(
	{
		competitionId: {
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
		modelName: 'CompetitionVenues',
		tableName: 'competition_venues',
	}
);

export default CompetitionVenues;