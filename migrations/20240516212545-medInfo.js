/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('medical_info', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			existingMedicalCondition: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			regularMedication: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			hasDisability: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			injury: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			allergy: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			ambulanceCover: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('medical_info');
	},
};
