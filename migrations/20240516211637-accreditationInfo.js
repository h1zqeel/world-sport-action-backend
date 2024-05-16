/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('accreditation_info', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			userId: {
				type: Sequelize.INTEGER,
				allowNull: false,
				references: {
					model: 'participants',
					key: 'id',
				},
				onDelete: 'CASCADE',
			},
			isUmpirePrerequisiteTrainingComplete: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			accreditationUmpireLevel: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			accreditationUmpireExpiryDate: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			associationLevel: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			accreditationCoachLevel: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			accreditationCoachExpiryDate: {
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
		await queryInterface.dropTable('accreditation_info');
	},
};
