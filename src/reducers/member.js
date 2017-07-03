export default(state = [], payload) => {
  switch(payload.type) {
    case 'addMember':
      return [...state, payload.member];
    default:
      return state;
  }
};
