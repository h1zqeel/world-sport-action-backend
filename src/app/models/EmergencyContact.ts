const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class EmergencyContact extends Model {
	public id!: number;
	public userId!: number;
	public emergencyFirstName!: string;
	public emergencyLastName!: string;
	public emergencyContactName!: string;
}

EmergencyContact.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		emergencyFirstName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		emergencyLastName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		emergencyContactName: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'EmergencyContact',
		tableName: 'emergency_contact',
	}
);

export default EmergencyContact;