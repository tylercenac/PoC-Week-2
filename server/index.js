const express = require('express');
const app = express();
const util = require('util');
const fs = require('fs');
const axios = require('axios');
app.use(express.json());
const cors = require('cors');
app.use(cors());

// Define client
const { Client } = require('pg');
const Payloads = require('./Payloads');

/*
const client = new Client({
  user: 'postgres',
  password: 'dbPassword',
  host: 'db',
  port: 5432,
  database: 'postgresDb'
});
*/
const client = new Client({
  user: 'jmswythj',
  password: 'Ff42ZxsjrscyaEcYMralajaPOgE7GhHs',
  host: 'ruby.db.elephantsql.com',
  port: 5432,
  database: 'jmswythj'
});

client.connect();

/*
async function wait() {
  await new Promise((res) => setTimeout(res, 10000));
  await client.connect();
}

wait();
*/

const port = process.env.PORT || 5000;
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/', (req, res) => {
  res.send('Succesfully launched node.js backend from docker!');
});

let candidatesUri = './data/sample_collection_candidate_info.json';
let breakoutRoomsUri = './data/sample_collection_breakout_room_info.json';
let projectsUri = './data/sample_collection_projects.json';

// DATA ROUTES

app.get('/api/v1/getbreakoutrooms', async function (req, res) {
  //reading sample breakout rooms json
  const json = fs.readFileSync(util.format('./%s', breakoutRoomsUri));
  const output = JSON.parse(json);

  res.send(output);
});

app.get('/api/v1/getcandidates', async function (req, res) {
  //reading sample candidatesjson
  const json = fs.readFileSync(util.format('./%s', candidatesUri));
  const output = JSON.parse(json);

  res.send(output);
});

app.get('/api/v1/getprojects', async function (req, res) {
  //reading sample projects json
  const json = fs.readFileSync(util.format('./%s', projectsUri));
  const output = JSON.parse(json);

  res.send(output);
});

// DATABASE ROUTES

// POST/CREATE

app.post('/assignments', async (req, res) => {
  const breakoutRooms = await axios.get(
    `http://localhost:5000/api/v1/getbreakoutrooms`
  );

  const { candidate, create_w3id } = req.body;

  try {
    if (candidate.jrss.includes('Java')) {
      await client.query(
        'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
        [candidate, breakoutRooms.data[0], 'autogenerated@ibm.com']
      );
    }
    if (
      candidate.jrss.includes('Microsoft') ||
      candidate.jrss.includes('Workday')
    ) {
      await client.query(
        'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
        [candidate, breakoutRooms.data[1], 'autogenerated@ibm.com']
      );
    }
    if (candidate.jrss.includes('Oracle') || candidate.jrss.includes('SAP')) {
      await client.query(
        'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
        [candidate, breakoutRooms.data[2], 'autogenerated@ibm.com']
      );
    }
    if (candidate.jrss.includes('.NET')) {
      await client.query(
        'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
        [candidate, breakoutRooms.data[3], 'autogenerated@ibm.com']
      );
    }
    if (
      candidate.jrss.includes('Agile') ||
      candidate.jrss.includes('Project Management')
    ) {
      await client.query(
        'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
        [candidate, breakoutRooms.data[4], 'autogenerated@ibm.com']
      );
    }
    if (
      candidate.jrss.includes('UI Development') ||
      candidate.jrss.includes('React') ||
      candidate.jrss.includes('Angular')
    ) {
      await client.query(
        'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
        [candidate, breakoutRooms.data[5], 'autogenerated@ibm.com']
      );
    }
    if (
      candidate.jrss.includes('Business') ||
      candidate.jrss.includes('System Analysis')
    ) {
      await client.query(
        'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
        [candidate, breakoutRooms.data[6], 'autogenerated@ibm.com']
      );
    }

    res.json('Succesfully added candidate');
  } catch (err) {
    console.log(err);
  }
});

// POST/CREATE ALL
app.post('/assignments/all', async (req, res) => {
  const breakoutRooms = await axios.get(
    `http://localhost:5000/api/v1/getbreakoutrooms`
  );

  const candidates = await axios.get(
    `http://localhost:5000/api/v1/getcandidates`
  );

  try {
    candidates.data.map(async (candidate) => {
      if (candidate.jrss.includes('Java')) {
        await client.query(
          'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
          [candidate, breakoutRooms.data[0], 'autogenerated@ibm.com']
        );
      }
      if (
        candidate.jrss.includes('Microsoft') ||
        candidate.jrss.includes('Workday')
      ) {
        await client.query(
          'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
          [candidate, breakoutRooms.data[1], 'autogenerated@ibm.com']
        );
      }
      if (candidate.jrss.includes('Oracle') || candidate.jrss.includes('SAP')) {
        await client.query(
          'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
          [candidate, breakoutRooms.data[2], 'autogenerated@ibm.com']
        );
      }
      if (candidate.jrss.includes('.NET')) {
        await client.query(
          'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
          [candidate, breakoutRooms.data[3], 'autogenerated@ibm.com']
        );
      }
      if (
        candidate.jrss.includes('Agile') ||
        candidate.jrss.includes('Project Management')
      ) {
        await client.query(
          'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
          [candidate, breakoutRooms.data[4], 'autogenerated@ibm.com']
        );
      }
      if (
        candidate.jrss.includes('UI Development') ||
        candidate.jrss.includes('React') ||
        candidate.jrss.includes('Angular')
      ) {
        await client.query(
          'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
          [candidate, breakoutRooms.data[5], 'autogenerated@ibm.com']
        );
      }
      if (
        candidate.jrss.includes('Business') ||
        candidate.jrss.includes('System Analysis')
      ) {
        await client.query(
          'insert into candidate_interviews_assignments(candidate_info, breakout_room_info, create_w3id) values ($1, $2, $3)',
          [candidate, breakoutRooms.data[6], 'autogenerated@ibm.com']
        );
      }
    });
    res.send('Successfully added all candidates to database!');
  } catch (error) {
    console.log(error);
  }
});

// GET/READ all rows
app.get('/assignments', async (req, res) => {
  try {
    const values = await client.query(
      'select * from candidate_interviews_assignments'
    );
    res.json(values.rows);
  } catch (err) {
    console.log(err);
  }
});

// GET/READ all candidates and list of breakout rooms
app.get('/assignments/nodup', async (req, res) => {
  try {
    const values = await client.query(
      'select * from candidate_interviews_assignments'
    );

    let set = new Set();
    values.rows.map((row) => {
      set.add(row.candidate_info.name);
    });

    let payloadArray = [];

    for (let candidate of set) {
      const brs = await client.query(
        "select * from candidate_interviews_assignments where candidate_info ->> 'name' = $1 ", // RETURN ALL ROWS OF GIVEN CANDIDATE
        [candidate]
      );

      let brNames = [];
      for (let row of brs.rows) {
        brNames.push(row.breakout_room_info.name);
      }

      let payload = new Payloads.Payload(candidate, brNames);
      payloadArray.push(payload);
    }

    res.send(payloadArray);
  } catch (err) {
    console.log(err);
  }
});

// GET/READ by ID
app.get('/assignments/:id', async (req, res) => {
  try {
    const values = await client.query(
      'select * from candidate_interviews_assignments where id = $1',
      [req.params.id]
    );

    res.json(values.rows);
  } catch (err) {
    console.log(err);
  }
});

// GET/READ by BreakoutRoom
app.get('/assignments_br/:case', async (req, res) => {
  let br = 'Failure';
  let hash = {
    1: 'Breakout Room 1 - Java/Cloud',
    2: 'Breakout Room 2 - Microsoft/Workday',
    3: 'Breakout Room 3 - Oracle/SAP',
    4: 'Breakout Room 4 - .NET/Cloud',
    5: 'Breakout Room 5 - Agile/Project Management',
    6: 'Breakout Room 6 - UI Development/React/Angular',
    7: 'Breakout Room 7 - Business/System Analysis'
  };

  br = hash[parseInt(req.params.case)];
  try {
    const values = await client.query(
      "select * from candidate_interviews_assignments where breakout_room_info ->> 'name' = $1 ", // RETURN ALL DATA OF ALL CANDIDATES IN JAVA BREAKOUT ROOM QUEUE
      //"select candidate_info ->> 'name' as name from candidate_interviews_assignments where breakout_room_info ->> 'name' = 'Breakout Room 1 - Java/Cloud' "                     // RETURN ONLY NAME OF ALL CANDIDATES IN JAVA BREAKOUT ROOM QUEUE
      [br]
    );

    //console.table(values.rows);
    res.json(values);
  } catch (err) {
    console.log(err);
  }
});

// PUT/UPDATE Candidate Info by ID
app.put('/assignments/:id', async (req, res) => {
  const { candidate_info, interview_status_code, modify_w3id } = req.body;
  console.log(candidate_info);
  try {
    //console.log('Connected succesfully');
    const addValues = await client.query(
      'update candidate_interviews_assignments set candidate_info = $2, interview_status_code = $3, modify_w3id = $4, modified_dt = current_timestamp where id = $1',
      [req.params.id, candidate_info, interview_status_code, modify_w3id]
    );

    res.json(addValues.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// PUT/UPDATE Breakout Room Info by ID
app.put('/assignments/br/:id', async (req, res) => {
  const { candidate_info, modify_w3id } = req.body;
  console.log(candidate_info);
  try {
    //console.log('Connected succesfully');
    const addValues = await client.query(
      'update candidate_interviews_assignments set breakout_room_info = $2, modify_w3id = $3, modified_dt = current_timestamp where id = $1',
      [req.params.id, candidate_info, modify_w3id]
    );

    res.json(addValues.rows[0]);
  } catch (err) {
    console.log(err);
  }
});

// DELETE
app.delete('/assignments', async (req, res) => {
  try {
    await client.query('delete from candidate_interviews_assignments');

    res.json('Sucessfully deleted all rows');
  } catch (err) {
    console.log(err);
  }
});

// DELETE BY ID
app.delete('/assignments/:id', async (req, res) => {
  try {
    await client.query(
      'delete from candidate_interviews_assignments where id = $1',
      [req.params.id]
    );

    res.json(`Sucessfully deleted row ${req.params.id}`);
  } catch (err) {
    console.log(err);
  }
});