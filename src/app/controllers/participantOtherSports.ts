import Participant from "../models/Participant";
import { Request, Response } from "express";
import OtherSport from "../models/OtherSport";

const getParticipentOtherSports = async (req: Request, res: Response) => {
  try {
    const otherSports = await OtherSport.findAll({
      where: {
        userId: req.params.id,
      },
    });

    return res.status(200).json(otherSports);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

const createParticipantOtherSport = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const otherSportData = req.body;

  if (!otherSportData || !otherSportData.name) {
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

    const otherSport = await OtherSport.create({
      userId: participantId,
      name: otherSportData.name,
    });

    return res.status(201).json(otherSport);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const updateParticipantOtherSport = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const otherSportId = req.params.otherSportId;
  const otherSportData = req.body;

  if (!otherSportData || !otherSportData.name) {
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

    const otherSport = await OtherSport.findOne({
      where: {
        id: otherSportId,
      },
    });

    if (!otherSport) {
      return res.status(404).json("Other Sport not found");
    }

    await otherSport.update(otherSportData);

    return res.status(200).json(otherSport);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const deleteParticipantOtherSport = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const otherSportId = req.params.otherSportId;

  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    const otherSport = await OtherSport.findOne({
      where: {
        id: otherSportId,
      },
    });

    if (!otherSport) {
      return res.status(404).json("Other Sport not found");
    }

    await otherSport.destroy();

    return res.status(204).json();
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

export { getParticipentOtherSports, createParticipantOtherSport, updateParticipantOtherSport, deleteParticipantOtherSport};