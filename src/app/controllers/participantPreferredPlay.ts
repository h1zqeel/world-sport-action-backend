import Participant from "../models/Participant";
import { Request, Response } from "express";
import PreferredPlay from "../models/PreferredPlay";

const getParticipentPreferredPlays = async (req: Request, res: Response) => {
  try {
    const preferredPlay = await PreferredPlay.findAll({
      where: {
        userId: req.params.id,
      },
    });

    return res.status(200).json(preferredPlay);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

const createParticipantPreferredPlay = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const preferredPlayData = req.body;

  if (!preferredPlayData || !preferredPlayData.day) {
    return res
      .status(400)
      .json("Missing Required Params: Day");
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

    const preferredPlay = await PreferredPlay.create({
      userId: participantId,
      day: preferredPlayData.day,
    });

    return res.status(201).json(preferredPlay);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const updateParticipantPreferredPlay = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const preferredPlayId = req.params.preferredPlayId;
  const preferredPlayData = req.body;

  if (!preferredPlayData || !preferredPlayData.day) {
    return res
      .status(400)
      .json("Missing Required Params: Day");
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

    const preferredPlay = await PreferredPlay.findOne({
      where: {
        id: preferredPlayId,
      },
    });

    if (!preferredPlay) {
      return res.status(404).json("PreferredPlay not found");
    }

    await preferredPlay.update(preferredPlayData);

    return res.status(200).json(preferredPlay);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const deleteParticipantOPreferredPlay = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const preferredPlayId = req.params.preferredPlayId;

  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    const preferredPlay = await PreferredPlay.findOne({
      where: {
        id: preferredPlayId,
      },
    });

    if (!preferredPlay) {
      return res.status(404).json("PreferredPlay not found");
    }

    await preferredPlay.destroy();

    return res.status(204).json();
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

export { getParticipentPreferredPlays, createParticipantPreferredPlay, updateParticipantPreferredPlay, deleteParticipantOPreferredPlay};