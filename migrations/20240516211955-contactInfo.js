/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('contact_info', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'participants', // Assuming 'participants' is the table for Participant model
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			email: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			mobileNumber: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			postalCode: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			street1: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			suburb: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			state: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			country: {
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
		await queryInterface.dropTable('contact_info');
	},
};
