const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';
import CompetitionParticipant from './CompetitionParticipant';
import CompetitionVenues from './CompetitionVenues';

class Competition extends Model {
	public id!: number;
	public competitionName!: string;
	public competitionStartDate!: Date;
	public competitionEndDate!: Date;
	public competitionDivision!: string;
	public membershipProduct!: string;
	public membershipDivision!: string;
}

Competition.init(
	{
		competitionName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		competitionStartDate: {
			type: DataTypes.DATE,
			allowNull: false
		},
		competitionEndDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		competitionDivision: {
			type: DataTypes.STRING,
			allowNull: true
		},
		membershipProduct: {
			type: DataTypes.STRING,
			allowNull: true
		},
		membershipDivision: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'Competition',
		tableName: 'competitions',
	}
);

Competition.hasMany(CompetitionVenues, {
	foreignKey: 'competitionId',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
});

Competition.hasMany(CompetitionParticipant, {
	foreignKey: 'competitionId',
	onDelete: 'CASCADE',
	onUpdate: 'CASCADE'
});

Competition.sync();

export default Competition;