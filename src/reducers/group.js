const DEFAULT_STATE = [{members: [], addMemberName: ''}];

const updateAddMemberName = (state, payload) => {
  return state.map((group, index) => {
    if (index !== payload.groupIdx) {
      return group;
    }
    else {
      let updatedGroup = {...group};
      updatedGroup.addMemberName = payload.name;
      return updatedGroup;
  }});
}

const addMemberToGroup = (state, payload) => {
  console.log(payload);
  console.log(state);
  return state.map((group, index) => {
    if (index !== payload.groupIdx) {
      return group;
    }
    else {
      if (group.addMemberName === '') { // do not add empty name as member
        return group
      }
      let updatedGroup = {...group};
      updatedGroup.members = [...group.members, {name:
        group.addMemberName, groupIdx: index}];
      updatedGroup.addMemberName = '';
      return updatedGroup;
  }});
}

export default(state = DEFAULT_STATE, payload) => {
  switch(payload.type) {
    //case 'addGroup':
    //  return [...state, payload.group];
    case 'addMemberToGroup':
      return addMemberToGroup(state, payload);
    //case 'removeMemberFromGroup':
    //  return state;
    //case 'removeGroup':
    //  return state;
    case 'updateAddMemberName':
      return updateAddMemberName(state, payload);
    default:
      return state;
  }
};
