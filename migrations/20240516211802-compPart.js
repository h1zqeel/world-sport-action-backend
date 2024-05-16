/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('competition_participants', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			registeredParticipantId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			nonRegisteredParticipantId: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			role: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			team: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			preferredPosition1: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			preferredPosition2: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			organisation: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			competitionId: {
				type: Sequelize.INTEGER,
				allowNull: false,
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
		await queryInterface.dropTable('competition_participants');
	},
};
