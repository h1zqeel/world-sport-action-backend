const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class AccreditationInfo extends Model {
	public id!: number;
	public userId!: number;
	public isUmpirePrerequisiteTrainingComplete!: boolean;
	public accreditationUmpireLevel!: string;
	public accreditationUmpireExpiryDate!: Date;
	public associationLevel!: string;
	public accreditationCoachLevel!: string;
	public accreditationCoachExpiryDate!: Date;
}

AccreditationInfo.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		isUmpirePrerequisiteTrainingComplete: {
			type: DataTypes.BOOLEAN,
			allowNull: false
		},
		accreditationUmpireLevel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		accreditationUmpireExpiryDate: {
			type: DataTypes.DATE,
			allowNull: true
		},
		associationLevel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		accreditationCoachLevel: {
			type: DataTypes.STRING,
			allowNull: true
		},
		accreditationCoachExpiryDate: {
			type: DataTypes.DATE,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'AccreditationInfo',
		tableName: 'accreditation_info',
	}
);

AccreditationInfo.sync({force: true});

export default AccreditationInfo;