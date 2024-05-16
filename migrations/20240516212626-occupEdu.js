/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('occupation_education', {
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
			occupation: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			school: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			schoolGrade: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			yearsPlayed: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			SSP: {
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
		await queryInterface.dropTable('occupation_education');
	},
};
