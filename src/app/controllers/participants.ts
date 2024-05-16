import Participant from "../models/Participant";
import AccreditationInfo from "../models/AccreditationInfo";
import ChildrenCheckInfo from "../models/ChildrenCheckInfo";
import EmergencyContact from "../models/EmergencyContact";
import MedicalInfo from "../models/MedicalInfo";
import OccupationEducation from "../models/OccupationEducation";
import { Request, Response } from "express";
import SportsInfo from "../models/SportsInfo";
import UmpireInfo from "../models/UmpireInfo";
import ContactInfo from "../models/ContactInfo";
import HealthIndicator from "../models/HealthIndicator";

const getParticipants = async (req: Request, res: Response) => {
  try {
    const participants = await Participant.findAll({
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
          association: Participant.HealthIndicator,
          model: HealthIndicator,
        }
      ],
    });

    return res.status(200).json(participants);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

const getParticipant = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
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
          association: Participant.HealthIndicator,
          model: HealthIndicator,
        }
      ],
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    return res.status(200).json(participant);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

const createParticipant = async (req: Request, res: Response) => {
  try {
    const participantData = req.body;

    if (!participantData || !participantData.firstName || !participantData.lastName || !participantData.ContactInfo || !participantData.ContactInfo.email) {
      return res.status(400).json("Missing Required Params: First Name, Last Name, ContactInfo(Email)");
    }

    const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    if (!emailRegex.test(participantData.ContactInfo.email)) {
      return res.status(400).json("Invalid Email");
    }

    const participant = await Participant.create(
      participantData,
      {
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
            association: Participant.HealthIndicator,
            model: HealthIndicator,
          }
        ],
      },
    );

    return res.status(201).json(participant);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const updateParticipant = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const participantData = req.body;

  const emailRegex = new RegExp(/\S+@\S+\.\S+/);
    if (!emailRegex.test(participantData.ContactInfo.email)) {
      return res.status(400).json("Invalid Email");
    }

  const transaction = await sequelize.transaction();
  try {
    const participant = await Participant.findOne(
      {
        where: {
          id: participantId,
        },
      },
      { transaction },
    );

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    await participant.update(participantData, { transaction });

    if(participantData.ContactInfo) {
      const contactInfo = await ContactInfo.findOne({
        where: { userId: participantId },
        transaction,
      });
      if(contactInfo) {
        await contactInfo.update(participantData.ContactInfo, { transaction });
      } else {
        await ContactInfo.create({
          ...participantData.ContactInfo,
          userId: participantId
        }, { transaction });
      }
    }

    if (participantData.AccreditationInfo) {
      const accreditationInfo = await AccreditationInfo.findOne({
        where: { userId: participantId },
        transaction,
      });
      if(accreditationInfo) {
        await accreditationInfo.update(participantData.AccreditationInfo, { transaction });
      } else {
        await AccreditationInfo.create({
          ...participantData.AccreditationInfo,
          userId: participantId
        }, { transaction });
      }
    }

    if (participantData.ChildrenCheckInfo) {
      const childrenCheckInfo = await ChildrenCheckInfo.findOne({
        where: { userId: participantId },
        transaction,
      });
      if(childrenCheckInfo) {
        await childrenCheckInfo.update(participantData.ChildrenCheckInfo, { transaction });
      } else {
        await ChildrenCheckInfo.create({
          ...participantData.ChildrenCheckInfo,
          userId: participantId
        }, { transaction });
      }
    }

    if (participantData.OccupationEducation) {
      const occupationEducation = await OccupationEducation.findOne({
        where: { userId: participantId },
        transaction,
      });
      if(occupationEducation) {
        await occupationEducation.update(participantData.OccupationEducation, { transaction });
      } else {
        await OccupationEducation.create({
          ...participantData.OccupationEducation,
          userId: participantId
        }, { transaction });
      }
    }

    if (participantData.EmergencyContact) {
      const emergencyContact = await EmergencyContact.findOne({
        where: { userId: participantId },
        transaction,
      });
      if(emergencyContact) {
        await emergencyContact.update(participantData.EmergencyContact, { transaction });
      } else {
        await EmergencyContact.create({
          ...participantData.EmergencyContact,
          userId: participantId
        }, { transaction });
      }
    }

    if (participantData.MedicalInfo) {
      const medicalInfo = await MedicalInfo.findOne({
        where: { userId: participantId },
        transaction,
      });

      if(medicalInfo) {
        await medicalInfo.update(participantData.MedicalInfo, { transaction });
      } else {
        await MedicalInfo.create({
          ...participantData.MedicalInfo,
          userId: participantId
        }, { transaction });
      }
    }

    if (participantData.SportsInfo) {
      const sportsInfo = await SportsInfo.findOne({
        where: { userId: participantId },
        transaction,
      });
      if(sportsInfo) {
        await sportsInfo.update(participantData.SportsInfo, { transaction });
      } else {
        await SportsInfo.create({
          ...participantData.SportsInfo,
          userId: participantId
        }, { transaction });
      }
    }

    if (participantData.UmpireInfo) {
      const umpireInfo = await UmpireInfo.findOne({
        where: { userId: participantId },
        transaction,
      });

      if(umpireInfo) {
        await umpireInfo.update(participantData.UmpireInfo, { transaction });
      } else {
        await UmpireInfo.create({
          ...participantData.UmpireInfo,
          userId: participantId
        }, { transaction });
      }
    }

    if(participantData.HealthIndicator) {
      const healthIndicator = await HealthIndicator.findOne({
        where: { userId: participantId },
        transaction,
      });

      if(healthIndicator) {
        await healthIndicator.update(participantData.HealthIndicator, { transaction });
      } else {
        await HealthIndicator.create({
          ...participantData.HealthIndicator,
          userId: participantId
        }, { transaction });
      }
    }

    await transaction.commit();

    return res.status(200).json(participant);
  } catch (error: any) {
    await transaction.rollback();
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const deleteParticipant = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  try {
    const participant = await Participant.findOne(
      {
        where: {
          id: participantId,
        },
      }
    );

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    await participant.destroy();

    return res.status(200).json("Participant Deleted");
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

export { getParticipants, getParticipant, createParticipant, updateParticipant, deleteParticipant };
