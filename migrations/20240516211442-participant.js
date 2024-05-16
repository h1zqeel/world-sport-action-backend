/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
'use strict';

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.createTable('participants', {
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			firstName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			middleName: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			lastName: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			gender: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			culture: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			dateOfBirth: {
				type: Sequelize.DATE,
				allowNull: true,
			},
			idetifyAs: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			countryOfBirth: {
				type: Sequelize.STRING,
				allowNull: true,
			},
			mergedUserId: {
				type: Sequelize.INTEGER,
				allowNull: true,
			},
			isHidden: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			photographyConsent: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			marketingOptIn: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			doNotSendEmail: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: false,
			},
			externalUserId: {
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
		await queryInterface.dropTable('participants');
	},
};
