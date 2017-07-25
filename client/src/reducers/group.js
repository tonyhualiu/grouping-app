import 'whatwg-fetch';

const DEFAULT_STATE = {
  groups: [{members: [], addMemberName: ''}],
  isFetchingGroups: false,
  isSavingGroups: false,
  isGroupsMutated: false,
};

const updateAddMemberName = (state, payload) => {
  const newGroups = state.groups.map((group, index) => {
    if (index !== payload.groupIdx) {
      return group;
    }
    else {
      return {...group, addMemberName: payload.name};
  }});
  return {...state, groups: newGroups};

}

const isDuplicatedNameGlobally = (groups, groupIdx, name) => {
  return groups.some((group) => {
    return group.members.some((member) => {
      return name === member.name;});
  });
}

const addMemberToGroup = (state, payload) => {
  if (isDuplicatedNameGlobally(state.groups, payload.groupIdx, payload.name)) {
    return state;
  }
  const newGroups = state.groups.map((group, index) => {
    if (index !== payload.groupIdx) {
      return group;
    }
    else {
      if (payload.name === '') { // do not add empty name as member
        return group
      }
      let updatedGroup = {...group};
      updatedGroup.members = [...group.members, {name:
        payload.name, groupIdx: index}];
      updatedGroup.addMemberName = '';
      return updatedGroup;
  }});
  return {...state, groups: newGroups, isGroupsMutated: true};
}

const removeMemberFromGroup = (state, payload) => {
  const newGroups = state.groups.map((group, index) => {
    if (index !== payload.groupIdx) {
      return group;
    }
    else {
      let updatedGroup = {...group};
      updatedGroup.members = group.members.filter((member) => {
        return member.name !== payload.member.name});
      return updatedGroup;
  }});
  return {...state, groups: newGroups, isGroupsMutated: true};
}

const removeGroup = (state, payload) => {
  if (payload.groupIdx === 0) {
    return state;
  }
  const unassignedMembers = [...state.groups[payload.groupIdx].members];
  let newGroups = [...state.groups.slice(0, payload.groupIdx),
    ...state.groups.slice(payload.groupIdx + 1)]
  newGroups[0].members = [...newGroups[0].members, ...unassignedMembers];
  newGroups.forEach((group, groupIdx) => {
    group.members.forEach((member, memberIdx) => {
      member.groupIdx = groupIdx;
    })
  });
  return {...state, groups: newGroups, isGroupsMutated: true};
}

const startFetchGroups = (state, payload) => {
  return { ...state, isFetchingGroups: true };
}

const successFetchGroups = (state, payload) => {
  return { ...state, groups: payload.groups, isFetchingGroups: false };
}

const startSaveGroups = (state, payload) => {
  return { ...state, isSavingGroups: true };
}

const successSaveGroups = (state, payload) => {
  return { ...state, isSavingGroups: false, isGroupsMutated: false };
}

export default(state = DEFAULT_STATE, payload) => {
  switch(payload.type) {
    case 'addGroup':
      return {...state, groups: [...state.groups, {members: [], addMemberName: ''}]};
    case 'addMemberToGroup':
      return addMemberToGroup(state, payload);
    case 'removeMemberFromGroup':
      return removeMemberFromGroup(state, payload);
    case 'removeGroup':
      return removeGroup(state,payload);
    case 'updateAddMemberName':
      return updateAddMemberName(state, payload);
    case 'startFetchGroups':
      return startFetchGroups(state, payload);
    case 'successFetchGroups':
      return successFetchGroups(state, payload);
    case 'startSaveGroups':
      return startSaveGroups(state, payload);
    case 'successSaveGroups':
      return successSaveGroups(state, payload);
    default:
      return state;
  }
};
