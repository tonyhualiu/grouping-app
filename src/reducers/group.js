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

const isDuplicatedNameGlobally = (state, groupIdx) => {
  const nameToCheck = state[groupIdx].addMemberName;
  return state.some((group) => {
    return group.members.some((member) => {
      return nameToCheck === member.name;});
  });
}

const addMemberToGroup = (state, payload) => {
  if (isDuplicatedNameGlobally(state, payload.groupIdx)) {
    return state;
  }
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

const removeMemberFromGroup = (state, payload) => {
  return state.map((group, index) => {
    if (index !== payload.groupIdx) {
      return group;
    }
    else {
      let updatedGroup = {...group};
      updatedGroup.members = group.members.filter((member) => {
        return member.name !== payload.member.name});
      return updatedGroup;
  }});
}

const removeGroup = (state, payload) => {
  if (payload.groupIdx === 0) {
    return state;
  }
  const unassignedMembers = [...state[payload.groupIdx].members];
  let newState = [...state.slice(0, payload.groupIdx),
    ...state.slice(payload.groupIdx + 1)]
  newState[0].members = [...newState[0].members, ...unassignedMembers];
  newState.forEach((group, groupIdx) => {
    group.members.forEach((member, memberIdx) => {
      member.groupIdx = groupIdx;
    })
  });
  return newState;
}

export default(state = DEFAULT_STATE, payload) => {
  switch(payload.type) {
    case 'addGroup':
      return [...state, {members: []}];
    case 'addMemberToGroup':
      return addMemberToGroup(state, payload);
    case 'removeMemberFromGroup':
      return removeMemberFromGroup(state, payload);
    case 'removeGroup':
      return removeGroup(state,payload);
    case 'updateAddMemberName':
      return updateAddMemberName(state, payload);
    default:
      return state;
  }
};
