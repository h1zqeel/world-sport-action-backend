const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class MedicalInfo extends Model {
	public id!: number;
	public userId!: number;
	public existingMedicalCondition!: string;
	public regularMedication!: string;
	public hasDisability!: boolean;
	public injury!: string;
	public allergy!: string;
	public ambulanceCover!: boolean;
}

MedicalInfo.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		existingMedicalCondition: {
			type: DataTypes.STRING,
			allowNull: true
		},
		regularMedication: {
			type: DataTypes.STRING,
			allowNull: true
		},
		hasDisability: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		},
		injury: {
			type: DataTypes.STRING,
			allowNull: true
		},
		allergy: {
			type: DataTypes.STRING,
			allowNull: true
		},
		ambulanceCover: {
			type: DataTypes.BOOLEAN,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'MedicalInfo',
		tableName: 'medical_info',
	}
);

MedicalInfo.sync({force: true});

export default MedicalInfo;
