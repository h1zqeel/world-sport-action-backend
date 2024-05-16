/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('competitions', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			competitionName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			competitionStartDate: {
				type: Sequelize.DATE,
				allowNull: false,
			},
			competitionEndDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			competitionDivision: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			membershipProduct: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			membershipDivision: {
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
		await queryInterface.dropTable('competitions');
	},
};
