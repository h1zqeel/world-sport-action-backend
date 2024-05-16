/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('health_indicators', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			chestPain: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			heartTrouble: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			bloodPressure: {
				type: Sequelize.FLOAT,
				allowNull: true,
			},
			faintOrSpells: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			lowerBackProblem: {
				type: Sequelize.BOOLEAN,
				allowNull: true,
			},
			physicalActivity: {
				type: Sequelize.FLOAT,
				allowNull: false,
			},
			jointOrBoneProblem: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			pregnant: {
				type: Sequelize.BOOLEAN,
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
		await queryInterface.dropTable('health_indicators');
	},
};
