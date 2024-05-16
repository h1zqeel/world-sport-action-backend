const { Model, DataTypes } = require('sequelize');
import sequelize from '../../db/sequelize';
import AccreditationInfo from './AccreditationInfo';
import ChildrenCheckInfo from './ChildrenCheckInfo';
import ContactInfo from './ContactInfo';
import EmergencyContact from './EmergencyContact';
import HealthIndicator from './HealthIndicator';
import MedicalInfo from './MedicalInfo';
import OccupationEducation from './OccupationEducation';
import SportsInfo from './SportsInfo';
import UmpireInfo from './UmpireInfo';
import Language from './Language';
import OtherSport from './OtherSport';
import Volunteer from './Volunteer';
import PreferredPlay from './PreferredPlay';
import CompetitionParticipant from './CompetitionParticipant';

class Participant extends Model {
	public id!: number;
	public firstName!: string;
	public middleName!: string;
	public lastName!: string;
	public gender!: string;
	public culture!: string;
	public dateOfBirth!: Date;
	public idetifyAs!: string;
	public countryOfBirth!: string;
	public mergedUserId!: number;
	public isHidden!: boolean;
	public photographyConsent!: boolean;
	public marketingOptIn!: boolean;
	public doNotSendEmail!: boolean;
	public externalUserId!: string;
}

Participant.init(
	{
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		middleName: {
			type: DataTypes.STRING,
			allowNull: true
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		gender: {
			type: DataTypes.STRING,
			allowNull: true
		},
		culture: {
			type: DataTypes.STRING,
			allowNull: true
		},
		dateOfBirth: {
			type: DataTypes.DATE,
			allowNull: true
		},
		idetifyAs: {
			type: DataTypes.STRING,
			allowNull: true
		},
		countryOfBirth: {
			type: DataTypes.STRING,
			allowNull: true
		},
		mergedUserId: {
			type: DataTypes.INTEGER,
			allowNull: true
		},
		isHidden: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		photographyConsent: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		marketingOptIn: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		doNotSendEmail: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		externalUserId: {
			type: DataTypes.STRING,
			allowNull: true
		}
	},
	{
		sequelize,
		modelName: 'Participant',
		tableName: 'participants',
	}
);

Participant.sync().then(()=>{
	Participant.hasOne(AccreditationInfo, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(ChildrenCheckInfo, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(ContactInfo, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(EmergencyContact, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(HealthIndicator, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(MedicalInfo, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(OccupationEducation, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(SportsInfo, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasOne(UmpireInfo, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasMany(Language, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasMany(OtherSport, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasMany(PreferredPlay, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	});

	Participant.hasMany(Volunteer, {
		foreignKey: 'userId',
		onDelete: 'CASCADE'
	})

	Participant.hasMany(CompetitionParticipant, {
		foreignKey: 'registeredParticipantId',
		onDelete: 'CASCADE'
	});
});

export default Participant;