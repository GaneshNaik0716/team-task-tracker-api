const STATUS_TRANSITIONS = {
  TODO: [
    "IN_PROGRESS",
    "BLOCKED",
  ],

  IN_PROGRESS: [
    "IN_REVIEW",
    "BLOCKED",
  ],

  IN_REVIEW: [
    "DONE",
    "BLOCKED",
  ],

  DONE: [],

  BLOCKED: [
    "TODO",
    "IN_PROGRESS",
    "IN_REVIEW",
  ],
};

const canTransition = (
  currentStatus,
  newStatus
) => {
  return (
    STATUS_TRANSITIONS[
      currentStatus
    ]?.includes(newStatus) || false
  );
};

module.exports = {
  STATUS_TRANSITIONS,
  canTransition,
};