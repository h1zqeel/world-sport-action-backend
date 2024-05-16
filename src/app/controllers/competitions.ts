import { Request, Response } from 'express';
import Competition from '../models/Competition';

const getCompetitions = async (req: Request, res: Response) => {
	try {
		const competitions = await Competition.findAll();
		return res.status(200).json(competitions);
	} catch (error) {
		return res.status(500).json(error);
	}
}

const getCompetition = async (req: Request, res: Response) => {
	const competitionId = req.params.id;

	if (!competitionId) {
		return res.status(400).json('Missing Required Params');
	}

	try {
		const competition = await Competition.findOne({ where: { id: competitionId } });
		return res.status(200).json(competition);
	} catch (error) {
		return res.status(500).json(error);
	}
}

const createCompetition = async (req: Request, res: Response) => {
	const competitionData = req.body;

	if(!competitionData || !competitionData.competitionName || !competitionData.competitionStartDate) {
		return res.status(400).json('Missing Required Params');
	}

	try {
		const competition = await Competition.create(competitionData);
		return res.status(201).json(competition);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const updateCompetition = async (req: Request, res: Response) => {
	const competitionData = req.body;
	const competitionId = req.params.id;

	if (!competitionData || !competitionData.competitionName || !competitionData.competitionStartDate || !competitionId) {
		return res.status(400).json('Missing Required Params');
	}

	try {
		const competition = await Competition.update(competitionData, { where: { id: competitionId } });
		return res.status(200).json(competition);
	} catch (error) {
		return res.status(500).json(error);
	}
};

const deleteCompetition = async (req: Request, res: Response) => {
	const competitionId = req.params.id;

	if (!competitionId) {
		return res.status(400).json('Missing Required Params');
	}

	try {
		const competition = await Competition.destroy({ where: { id: competitionId } });
		return res.status(200).json(competition);
	} catch (error) {
		return res.status(500).json(error);
	}
};

export { getCompetitions, getCompetition, createCompetition, updateCompetition, deleteCompetition };

