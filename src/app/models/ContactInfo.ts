const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class ContactInfo extends Model {
	public id!: number;
	public userId!: number;
	public email!: string;
	public mobileNumber!: string;
	public postalCode!: string;
	public street1!: string;
	public suburb!: string;
	public state!: string;
	public country!: string;
}

ContactInfo.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false
		},
		mobileNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		postalCode: {
			type: DataTypes.STRING,
			allowNull: true
		},
		street1: {
			type: DataTypes.STRING,
			allowNull: true
		},
		suburb: {
			type: DataTypes.STRING,
			allowNull: true
		},
		state: {
			type: DataTypes.STRING,
			allowNull: true
		},
		country: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'ContactInfo',
		tableName: 'contact_info',
	}
);

ContactInfo.sync({force: true});

export default ContactInfo;