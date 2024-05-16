/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('sports_info', {
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
			favouriteTeam: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			heardyAboutCompetition: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			heardAboutOther: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			walkingSportInfo: {
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
		await queryInterface.dropTable('sports_info');
	},
};
