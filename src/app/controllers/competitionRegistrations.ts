import { Request, Response } from "express";
import Competition from "../models/Competition";
import Participant from "../models/Participant";
import CompetitionParticipant from "../models/CompetitionParticipant";
import CompetitionVenues from "../models/CompetitionVenues";
import AccreditationInfo from "../models/AccreditationInfo";
import ChildrenCheckInfo from "../models/ChildrenCheckInfo";
import ContactInfo from "../models/ContactInfo";
import EmergencyContact from "../models/EmergencyContact";
import HealthIndicators from "../models/HealthIndicators";
import MedicalInfo from "../models/MedicalInfo";
import OccupationEducation from "../models/OccupationEducation";
import SportsInfo from "../models/SportsInfo";
import UmpireInfo from "../models/UmpireInfo";
import Language from "../models/Language";
import _ from "lodash";
import PreferredPlay from "../models/PreferredPlay";
import OtherSport from "../models/OtherSport";
import Volunteer from "../models/Volunteer";
import { getFormattedDate } from "../../helpers";

const registerParticipantToCompetition = async (
  req: Request,
  res: Response,
) => {
  const competitionId = req.params.id;
  const participantId = req.params.participantId;
  const registrationData = req.body;

  if (
    !registrationData.nonRegisteredParticipantId ||
    !registrationData.role ||
    !registrationData.team
  ) {
    return res.status(400).json("Missing Required Params");
  }

  try {
    const competition = await Competition.findOne({
      where: {
        id: competitionId,
      },
    });

    if (!competition) {
      return res.status(404).json("Competition not found");
    }

    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    const registration = await CompetitionParticipant.create({
      registeredParticipantId: parseInt(participantId),
      competitionId: parseInt(competitionId),
      nonRegisteredParticipantId: registrationData.nonRegisteredParticipantId,
      role: registrationData.role,
      team: registrationData.team,
    });

    return res.status(201).json(registration);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const getCompetitionRegistrations = async (req: Request, res: Response) => {
  const competitionId = req.params.id;

  try {
    const competition = await Competition.findOne({
      where: {
        id: competitionId,
      },
    });

    if (!competition) {
      return res.status(404).json("Competition not found");
    }

    let registrations = await CompetitionParticipant.findAll({
      where: {
        competitionId,
      },
    });

    const participantIds = registrations.map(
      (registeration: CompetitionParticipant) => {
        return registeration.registeredParticipantId;
      },
    );

    const participants = await Participant.findAll({
      where: {
        id: participantIds,
      },
    });

    return res.status(200).json(participants);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const getFullParticipantRegistrationDetails = async (req: Request, res: Response) => {
	const competitionId = req.params.id;
	const participantId = req.params.participantId;
		const competition = await Competition.findOne({
			where: {
				id: competitionId
			}
		});

		if (!competition) {
			return res.status(404).json("Competition not found");
		}

		const participant = await Participant.findOne({
			where: {
				id: participantId
			},
			include: [
				{
				  association: Participant.ContactInfo,
				  model: ContactInfo
				},
				{
				  association: Participant.AccreditationInfo,
				  model: AccreditationInfo,
				},
				{
				  association: Participant.ChildrenCheckInfo,
				  model: ChildrenCheckInfo,
				},
				{
				  association: Participant.OccupationEducation,
				  model: OccupationEducation,
				},
				{
				  association: Participant.EmergencyContact,
				  model: EmergencyContact,
				},
				{
				  association: Participant.MedicalInfo,
				  model: MedicalInfo,
				},
				{
				  association: Participant.SportsInfo,
				  model: SportsInfo,
				},
				{
				  association: Participant.UmpireInfo,
				  model: UmpireInfo,
				},
				{
				  association: Participant.HealthIndicators,
				  model: HealthIndicators,
				},
				{
					association: Participant.Language,
					model: Language
				},
				{
					association: Participant.PreferredPlay,
					model: PreferredPlay
				},
				{
					association: Participant.OtherSport,
					model: OtherSport
				},
				{
					association: Participant.Volunteers,
					model: Volunteer
				}
			  ],
		});

		if (!participant) {
			return res.status(404).json("Participant not found");
		}

		const participantRegistration = await CompetitionParticipant.findOne({
			where: {
				competitionId,
				registeredParticipantId: participantId
			}
		});

		if(!participantRegistration) {
			return res.status(404).json("Participant not registered to competition");
		}

		const competitionVenues = await CompetitionVenues.findAll({
			attributes: ['name'],
			where: {
				competitionId
			}
		});

		res.status(200).json({
			competitionName: competition.competitionName,
			competitionStartDate: getFormattedDate(competition.competitionStartDate),
			competitionEndDate: getFormattedDate(competition.competitionEndDate),
			competitionDivision: competition.competitionDivision,
			membershipProduct: competition.membershipProduct,
			membershipDivision: competition.membershipDivision,
			preferredPosition1: participantRegistration.preferredPosition1,
			preferredPosition2: participantRegistration.preferredPosition2,
			organisation: participantRegistration.organisation,
			role: participantRegistration.role,
			team: participantRegistration.team,
			competitionVenue: competitionVenues,
			registeredParticipantId: participantRegistration.registeredParticipantId,
			nonRegisteredParticipantId: participantRegistration.nonRegisteredParticipantId,
			userId: participant.id,
			firstName: participant.firstName,
			middleName: participant.middleName,
			lastName: participant.lastName,
			gender: participant.gender,
			languages: participant.Languages,
			culture: participant.culture,
			occupation: participant.OccupationEducation ? participant.OccupationEducation.occupation : null,
			externalUserId: participant.externalUserId,
			dateOfBirth: getFormattedDate(participant.dateOfBirth),
			email: participant.ContactInfo.email,
			mobileNumber: participant.ContactInfo ? participant.ContactInfo.mobileNumber : null,
			postalCode: participant.ContactInfo ? participant.ContactInfo.postalCode: null,
			street1: participant.ContactInfo ? participant.ContactInfo.street1 : null,
			suburb: participant.ContactInfo ? participant.ContactInfo.suburb : null,
			state: participant.ContactInfo ? participant.ContactInfo.state : null,
			country: participant.ContactInfo ? participant.ContactInfo.country : null,
			isUmpirePrerequisiteTrainingComplete: participant.AccreditationInfo ? participant.AccreditationInfo.isUmpirePrerequisiteTrainingComplete : null,
			accreditationUmpireLevel: participant.AccreditationInfo ? participant.AccreditationInfo.accreditationUmpireLevel : null,
			accreditationUmpireExpiryDate: participant.AccreditationInfo ? getFormattedDate(participant.AccreditationInfo.accreditationUmpireExpiryDate) : null,
			associationLevel: participant.AccreditationInfo ? participant.AccreditationInfo.associationLevel : null,
			accreditationCoachLevel: participant.AccreditationInfo ? participant.AccreditationInfo.accreditationCoachLevel : null,
			accreditationCoachExpiryDate: participant.AccreditationInfo ? getFormattedDate(participant.AccreditationInfo.accreditationCoachExpiryDate) : null,
			childrenCheckNumber: participant.ChildrenCheckInfo ? participant.ChildrenCheckInfo.childrenCheckNumber : null,
			childrenCheckExpiryDate: participant.ChildrenCheckInfo ? getFormattedDate(participant.ChildrenCheckInfo.childrenCheckExpiryDate) : null,
			emergencyFirstName: participant.EmergencyContact ? participant.EmergencyContact.emergencyFirstName : null,
			emergencyLastName: participant.EmergencyContact ? participant.EmergencyContact.emergencyLastName : null,
			emergencyContactNumber: participant.EmergencyContact ? participant.EmergencyContact.emergencyContactNumber : null,
			marketingOptIn: participant.marketingOptIn,
			mergedUserId: participant.mergedUserId,
			isHIdden: participant.isHidden,
			photographyConsent: participant.photographyConsent,
			identifyAs: participant.idetifyAs,
			countryOfBirth: participant.countryOfBirth,
			umpireInfo: Participant.UmpireInfo,
			heardyAboutCompetition: participant.SportsInfo ? participant.SportsInfo.heardyAboutCompetition : null,
			heardByOther: participant.SportsInfo ? participant.SportsInfo.heardByOther : null,
			favouriteTeam: participant.SportsInfo ? participant.SportsInfo.favouriteTeam : null,
			yearsPlayed: participant.SportsInfo ? participant.SportsInfo.yearsPlayed : null,
			otherSports: participant.OtherSports,
			volunteer: participant.Volunteers,
			school: participant.OccupationEducation ? participant.OccupationEducation.school : null,
			schoolGrade: participant.OccupationEducation ? participant.OccupationEducation.schoolGrade : null,
			SSP: participant.OccupationEducation ? participant.OccupationEducation.SSP : null,
			preferredPlay: participant.PreferredPlay ? participant.PreferredPlay.map((play: PreferredPlay) => play.day) : null,
			existingMedicalCondition: participant.MedicalInfo ? participant.MedicalInfo.existingMedicalCondition : null,
			regularMedication: participant.MedicalInfo ? participant.MedicalInfo.regularMedication : null,
			hasDisability: participant.MedicalInfo ? participant.MedicalInfo.hasDisability : null,
			disabilityCareNumber: participant.MedicalInfo ? participant.MedicalInfo.disabilityCareNumber : null,
			disabilityType: participant.MedicalInfo ? participant.MedicalInfo.disabilityType : null,
			injury: participant.MedicalInfo ? participant.MedicalInfo.injury : null,
			ambulanceCover: participant.MedicalInfo ? participant.MedicalInfo.ambulanceCover : null,
			healthIndicators: participant.HealthIndicators,
			walkingSportInfo: participant.SportsInfo ? participant.SportsInfo.walkingSportInfo : null,
			doNotSendEmail: participant.doNotSendEmail
		});
}

export { registerParticipantToCompetition, getCompetitionRegistrations, getFullParticipantRegistrationDetails };
