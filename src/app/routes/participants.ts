import { Router } from 'express';
import { createParticipantLanguage, updateParticipantLanguage, deleteParticipantLanguage, getParticipantsLanguages } from '../controllers/participantLanguages';
import { createParticipantOtherSport, updateParticipantOtherSport, deleteParticipantOtherSport, getParticipentOtherSports } from '../controllers/participantOtherSports';
import { createParticipantVolunteer, updateParticipantVolunteer, deleteParticipantVolunteer, getParticipantVolunteers } from '../controllers/participantVolunteers';
import { createParticipant, updateParticipant, deleteParticipant, getParticipants, getParticipant } from '../controllers/participants';
import { createParticipantPreferredPlay, deleteParticipantOPreferredPlay, getParticipentPreferredPlays, updateParticipantPreferredPlay } from '../controllers/participantPreferredPlay';
const router = Router();

router.get('/', getParticipants);
router.get('/:id', getParticipant);
router.post("/", createParticipant);
router.put("/:id", updateParticipant);
router.delete("/:id", deleteParticipant);

router.get('/:id/languages', getParticipantsLanguages);
router.post('/:id/languages', createParticipantLanguage);
router.put('/:id/languages/:languageId', updateParticipantLanguage);
router.delete('/:id/languages/:languageId', deleteParticipantLanguage);

router.get('/:id/volunteers', getParticipantVolunteers);
router.post('/:id/volunteers', createParticipantVolunteer);
router.put('/:id/volunteers/:volunteerId', updateParticipantVolunteer);
router.delete('/:id/volunteers/:volunteerId', deleteParticipantVolunteer);

router.get('/:id/otherSports', getParticipentOtherSports);
router.post('/:id/otherSports', createParticipantOtherSport);
router.put('/:id/otherSports/:otherSportId', updateParticipantOtherSport);
router.delete('/:id/otherSports/:otherSportId', deleteParticipantOtherSport);

router.get('/:id/preferredPlays', getParticipentPreferredPlays);
router.post('/:id/preferredPlays', createParticipantPreferredPlay);
router.put('/:id/preferredPlays/:otherSportId', updateParticipantPreferredPlay);
router.delete('/:id/preferredPlays/:otherSportId', deleteParticipantOPreferredPlay);

export default router;