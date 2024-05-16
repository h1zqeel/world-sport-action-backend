const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class HealthIndicators extends Model {
	public id!: number;
	public userId!: number;
	public chestPain!: boolean;
	public heartTrouble!: boolean;
	public bloodPressure!: number;
	public faintOrSpells!: boolean;
	public lowerBackProblem!: boolean;
	public physicalActivity!: number;
	public jointOrBoneProblem!: boolean;
	public pregnant!: boolean;
}

HealthIndicators.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		chestPain: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		heartTrouble: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		bloodPressure: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		faintOrSpells: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		lowerBackProblem: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		physicalActivity: {
			type: DataTypes.FLOAT,
			allowNull: false
		},
		jointOrBoneProblem: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		pregnant: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		}
	},
	{
		sequelize,
		modelName: 'HealthIndicators',
		tableName: 'health_indicators',
	}
);

HealthIndicators.sync();

export default HealthIndicators;