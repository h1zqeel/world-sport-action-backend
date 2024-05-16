/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('emergency_contact', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			emergencyFirstName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			emergencyLastName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			emergencyContactName: {
				type: Sequelize.STRING,
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
		await queryInterface.dropTable('emergency_contact');
	},
};
