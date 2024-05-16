/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('children_check_info', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			childrenCheckNumber: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			childrenCheckExpiryDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now'),
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE,
				defaultValue: Sequelize.fn('now'),
			},
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.dropTable('children_check_info');
	},
};
