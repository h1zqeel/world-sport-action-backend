const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';
import Competition from './Competition';
import Participant from './Participant';

class CompetitionParticipant extends Model {
	public id!: number;
	public registeredParticipantId!: number;
	public nonRegisteredParticipantId!: string;
	public role!: string;
	public team!: string;
	public preferredPosition1!: string;
	public preferredPosition2!: string;
	public organisation!: string;
	public competitionId!: number;
}

CompetitionParticipant.init(
	{
		registeredParticipantId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		nonRegisteredParticipantId: {
			type: DataTypes.STRING,
			allowNull: false
		},
		role: {
			type: DataTypes.STRING,
			allowNull: false
		},
		team: {
			type: DataTypes.STRING,
			allowNull: false
		},
		preferredPosition1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		preferredPosition2: {
			type: DataTypes.STRING,
			allowNull: true
		},
		organisation: {
			type: DataTypes.STRING,
			allowNull: true
		},
		competitionId: {
			type: DataTypes.INTEGER,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'CompetitionParticipant',
		tableName: 'competition_participants',
	}
);

export default CompetitionParticipant;
