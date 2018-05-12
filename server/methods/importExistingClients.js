import { Meteor } from 'meteor/meteor';
const atob = require('atob');
const parse = require('csv-parse');
import { Accounts } from 'meteor/accounts-base';
import moment from 'moment/moment';

Meteor.methods({
  importExistingClients(data) {
    console.log("SERVER DATA:", data);
    const newDATA = data.replace('data:text/csv;base64,', '');
    console.log("SERVER DATA2:", newDATA);
    const csv = atob(newDATA);
    const bound = Meteor.bindEnvironment((callback) => { callback(); });
    parse(csv, (parseError, output) => {
      bound(() => {
        if (parseError) {
          throw new Meteor.Error('Parsing ERROR', `Error: ${parseError}`);
        } else {
          const newUsersArr = [];
          const deniedUsersArr = [];
          output.forEach((entry, i) => {
            let profile = '';
            const email = entry[2].trim();
            let password = `${entry[5]}${entry[6]}`;
            password = password.toLowerCase().replace(/\s/g, '');
            const clcMemberNoCnt = 1501 + i;
            const joinedDate = new Date(2018, 3, 26, 12, 0, 0);
            profile = {
              name: entry[4].trim(),
              surname: entry[5].trim(),
              cellNo: entry[6].trim(),
              active: true,
              clcMemberNo: `CLC${clcMemberNoCnt}`,
              username: '',
              introducersUserId: '',
              walletAddress: entry[7].trim(),
              tempPassword: password,
              joinedDate,
            };
            console.log('email:', email);
            console.log('password:', password);
            console.log('profile:', profile);
            const user = Accounts.findUserByEmail(email);
            console.log(':::::::::::::::::::::::::::USER:::::::::::', user)
            try {
              let userDetail = {};
              const newUserId = Accounts.createUser({ email, password, profile });
              console.log('USER CREATED:', newUserId);
              userDetail = {
                newUserId,
                email
              };
              newUsersArr.push(userDetail);
            } catch (createUserError) {
              console.log('USER CREATE ERROR:', createUserError.message);
              userDetail = {
                name: profile.name,
                surname: profile.surname,
                email,
                ERROR: createUserError.message,
              };
              deniedUsersArr.push(userDetail);
            }
            // Check which type of investment they have.

          });
          console.log('newUsersArr COUNT:', newUsersArr.length);
          console.log('newUsersArr:', newUsersArr);
          console.log('deniedUsersArr COUNT:', deniedUsersArr.length);
          console.log('deniedUsersArr:', deniedUsersArr);
          return 'COOL!';
        }
      });
    });
  },
});
