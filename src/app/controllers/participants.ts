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
import HealthIndicators from "../models/HealthIndicators";

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
            association: Participant.HealthIndicators,
            model: HealthIndicators,
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
      console.log('udpdate')
      await ContactInfo.update(participantData.ContactInfo, {
        where: { userId: participantId },
        transaction,
      });
    }

    if (participantData.AccreditationInfo) {
      await AccreditationInfo.update(participantData.AccreditationInfo, {
        where: { userId: participantId },
        transaction,
      });
    }

    if (participantData.ChildrenCheckInfo) {
      await ChildrenCheckInfo.update(participantData.ChildrenCheckInfo, {
        where: { userId: participantId },
        transaction,
      });
    }

    if (participantData.OccupationEducation) {
      await OccupationEducation.update(participantData.OccupationEducation, {
        where: { userId: participantId },
        transaction,
      });
    }

    if (participantData.EmergencyContact) {
      await EmergencyContact.update(participantData.EmergencyContact, {
        where: { userId: participantId },
        transaction,
      });
    }

    if (participantData.MedicalInfo) {
      await MedicalInfo.update(participantData.MedicalInfo, {
        where: { userId: participantId },
        transaction,
      });
    }

    if (participantData.SportsInfo) {
      await SportsInfo.update(participantData.SportsInfo, {
        where: { userId: participantId },
        transaction,
      });
    }

    if (participantData.UmpireInfo) {
      await UmpireInfo.update(participantData.UmpireInfo, {
        where: { userId: participantId },
        transaction,
      });
    }

    if(participantData.HealthIndicators) {
      await HealthIndicators.update(participantData.HealthIndicators, {
        where: { userId: participantId },
        transaction,
      });
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
