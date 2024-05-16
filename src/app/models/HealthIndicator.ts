const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class HealthIndicator extends Model {
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

HealthIndicator.init(
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
		modelName: 'HealthIndicator',
		tableName: 'health_indicators',
	}
);

HealthIndicator.sync({force: true});

export default HealthIndicator;