import { Request, Response } from "express";
import CompetitionVenues from "../models/CompetitionVenues";
import Competition from "../models/Competition";

const getCompetitionVenues = async (req: Request, res: Response) => {
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

    const competitionVenues = await CompetitionVenues.findAll({
      where: {
        competitionId,
      },
    });

    return res.status(200).json(competitionVenues);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
}

const createCompetitionVenue = async (req: Request, res: Response) => {
  const competitionId = req.params.id;
  const venueData = req.body;

  if (!venueData || !venueData.name) {
    return res
      .status(400)
      .json("Missing Required Params: Name");
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

    const competitionVenue = await CompetitionVenues.create({
      competitionId,
      name: venueData.name,
    });

    return res.status(201).json(competitionVenue);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const updateCompetitionVenue = async (req: Request, res: Response) => {
  const competitionId = req.params.id;
  const venueId = req.params.venueId;
  const venueData = req.body;

  if (!venueData || !venueData.name) {
    return res
      .status(400)
      .json("Missing Required Params: Name");
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

    const competitionVenue = await CompetitionVenues.findOne({
      where: {
        id: venueId,
      },
    });

    if (!competitionVenue) {
      return res.status(404).json("Venue not found");
    }

    const updatedCompetitionVenue = await CompetitionVenues.update({
      name: venueData.name,
    }, {
      where: {
        id: venueId,
      },
    });

    return res.status(200).json(updatedCompetitionVenue);
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

const deleteCompetitionVenue = async (req: Request, res: Response) => {
  const competitionId = req.params.id;
  const venueId = req.params.venueId;

  try {
    const competition = await Competition.findOne({
      where: {
        id: competitionId,
      },
    });

    if (!competition) {
      return res.status(404).json("Competition not found");
    }

    const competitionVenue = await CompetitionVenues.findOne({
      where: {
        id: venueId,
      },
    });

    if (!competitionVenue) {
      return res.status(404).json("Venue not found");
    }

    await CompetitionVenues.destroy({
      where: {
        id: venueId,
      },
    });

    return res.status(200).json("Venue Deleted Successfully");
  } catch (error: any) {
    return res.status(500).json("Something Went Wrong" + error.message);
  }
};

export { getCompetitionVenues, createCompetitionVenue, updateCompetitionVenue, deleteCompetitionVenue}

