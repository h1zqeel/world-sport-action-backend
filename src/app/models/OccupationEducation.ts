const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class OccupationEducation extends Model {
	public id!: number;
	public userId!: number;
	public occupation!: string;
	public school!: string;
	public schoolGrade!: string;
	public yearsPlayed!: number;
	public SSP!: boolean;
}

OccupationEducation.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		occupation: {
			type: DataTypes.STRING,
			allowNull: true
		},
		school: {
			type: DataTypes.STRING,
			allowNull: true
		},
		schoolGrade: {
			type: DataTypes.STRING,
			allowNull: true
		},
		yearsPlayed: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		SSP: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'OccupationEducation',
		tableName: 'occupation_education',
	}
);

export default OccupationEducation;