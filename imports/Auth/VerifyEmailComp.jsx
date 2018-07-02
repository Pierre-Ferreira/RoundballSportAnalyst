import React from 'react';

const VerifyEmailComp = (props) => {
  // const currentUser = Meteor.user();
  // let userFirstName = '';
  // let userLastName = '';
  // if (currentUser && currentUser.profile && currentUser.profile.firstName) {
  //   userFirstName = currentUser.profile.firstName;
  // }
  // if (currentUser && currentUser.profile && currentUser.profile.lastName) {
  //   userLastName = currentUser.profile.lastName;
  // }
  // console.log('currentUser:',currentUser);
  return (
    <h1 className="text-center">
      {/* Welcome {userFirstName} {userLastName} */}
      Your email has been verfied. Please login.
    </h1>
  );
};

// WelcomeComp.propTypes = {
//
// };

export default VerifyEmailComp;
