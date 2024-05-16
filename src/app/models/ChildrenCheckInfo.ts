const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';

class ChildrenCheckInfo extends Model {
	public id!: number;
	public userId!: number;
	public childrenCheckNumber!: string;
	public childrenCheckExpiryDate!: Date;
}

ChildrenCheckInfo.init(
	{
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false
		},
		childrenCheckNumber: {
			type: DataTypes.STRING,
			allowNull: true
		},
		childrenCheckExpiryDate: {
			type: DataTypes.DATE,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'ChildrenCheckInfo',
		tableName: 'children_check_info',
	}
);

ChildrenCheckInfo.sync({force: true});

export default ChildrenCheckInfo;