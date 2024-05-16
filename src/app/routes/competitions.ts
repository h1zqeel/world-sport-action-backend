import { Router } from 'express';
import { createCompetition, updateCompetition, deleteCompetition, getCompetitions, getCompetition } from '../controllers/competitions';
import { createCompetitionVenue, updateCompetitionVenue, deleteCompetitionVenue, getCompetitionVenues } from '../controllers/competitionVenues';
import { getCompetitionRegistrations, getFullParticipantRegistrationDetails, registerParticipantToCompetition } from '../controllers/competitionRegistrations';
const router = Router();

router.get('/', getCompetitions);
router.get('/:id', getCompetition);
router.post('/', createCompetition);
router.put('/:id', updateCompetition);
router.delete('/:id', deleteCompetition);

router.get('/:id/competitionVenues', getCompetitionVenues);
router.post('/:id/competitionVenues', createCompetitionVenue);
router.put('/:id/competitionVenues/:venueId', updateCompetitionVenue);
router.delete('/:id/competitionVenues/:venueId', deleteCompetitionVenue);

router.get('/:id/participants', getCompetitionRegistrations);
router.get('/:id/participants/:participantId', getFullParticipantRegistrationDetails);
router.post('/:id/participants/:participantId', registerParticipantToCompetition);

export default router;