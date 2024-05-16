import Participant from "../models/Participant";
import { Request, Response } from "express";
import Language from "../models/Language";

const getParticipantsLanguages = async (req: Request, res: Response) => {
  const participantId = req.params.id;

  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
      include: Language,
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }
    return res.status(200).json(participant.Languages);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const createParticipantLanguage = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const languageData = req.body;

  if (!languageData || !languageData.name) {
    return res
      .status(400)
      .json("Missing Required Params: Language, Proficiency");
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

    const language = await Language.create({
      userId: participantId,
      name: languageData.name,
    });

    return res.status(201).json(language);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const updateParticipantLanguage = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const languageId = req.params.languageId;
  const languageData = req.body;

  if (!languageData || !languageData.name) {
    return res
      .status(400)
      .json("Missing Required Params: Language, Proficiency");
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

    const language = await Language.findOne({
      where: {
        id: languageId,
        userId: participantId,
      },
    });

    if (!language) {
      return res.status(404).json("Language not found");
    }

    await language.update(languageData);

    return res.status(200).json(language);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const deleteParticipantLanguage = async (req: Request, res: Response) => {
  const participantId = req.params.id;
  const languageId = req.params.languageId;

  try {
    const participant = await Participant.findOne({
      where: {
        id: participantId,
      },
    });

    if (!participant) {
      return res.status(404).json("Participant not found");
    }

    const language = await Language.findOne({
      where: {
        id: languageId,
        userId: participantId,
      },
    });

    if (!language) {
      return res.status(404).json("Language not found");
    }

    await language.destroy();

    return res.status(200).json("Language Deleted");
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

export { getParticipantsLanguages, createParticipantLanguage, updateParticipantLanguage, deleteParticipantLanguage };