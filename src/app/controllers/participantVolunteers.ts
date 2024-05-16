import Participant from "../models/Participant";
import { Request, Response } from "express";
import Volunteer from "../models/Volunteer";

const getParticipantVolunteers = async (req: Request, res: Response) => {
  try {
    const volunteers = await Volunteer.findAll({
      where: {
        userId: req.params.id,
      },
    });

    return res.status(200).json(volunteers);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

const createParticipantVolunteer = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const volunteerData = req.body;

  if (!volunteerData || !volunteerData.description || volunteerData.isActive === null) {
    return res
      .status(400)
      .json("Missing Required Params: Name");
  }

  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    const volunteer = await Volunteer.create({
      userId: participantId,
      isActive: volunteerData.isActive,
      description: volunteerData.description,
    });

    return res.status(201).json(volunteer);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const updateParticipantVolunteer = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const volunteerId = req.params.volunteerId;
  const volunteerData = req.body;

  if (!volunteerData || !volunteerData.description || volunteerData.isActive === null) {
    return res
      .status(400)
      .json("Missing Required Params: Name");
  }

  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    const volunteer = await Volunteer.findOne({
      where: {
        id: volunteerId,
      },
    });

    if (!volunteer) {
      return res.status(404).json("Volunteer not found");
    }

    await volunteer.update(volunteerData);

    return res.status(200).json(volunteer);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

const deleteParticipantVolunteer = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const volunteerId = req.params.volunteerId;

  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    const volunteer = await Volunteer.findOne({
      where: {
        id: volunteerId,
      },
    });

    if (!volunteer) {
      return res.status(404).json("Volunteer not found");
    }

    await volunteer.destroy();

    return res.status(200).json("Volunteer Deleted");
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

export { getParticipantVolunteers, createParticipantVolunteer, updateParticipantVolunteer, deleteParticipantVolunteer};