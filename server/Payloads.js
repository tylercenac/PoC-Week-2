class Payload {
  candidate_info;
  breakout_rooms;

  constructor(candidate, breakout_room) {
    this.candidate_info = candidate;
    this.breakout_rooms = breakout_room;
  }
}

class PostPayload {
  candidate;
  create_w3id;

  constructor(candidate, breakout_room, create_w3id) {
    this.candidate = candidate;
    this.create_w3id = create_w3id;
  }
}

class PutPayload {
  id;
  candidate_info;
  interview_status_code;
  modify_w3id;

  constructor(id, candidate, interview_status_code, modify_w3id) {
    this.id = id;
    this.candidate_info = candidate;
    this.interview_status_code = interview_status_code;
    this.modify_w3id = modify_w3id;
  }
}

module.exports = {
  Payload,
  PostPayload,
  PutPayload: PutPayload
};
