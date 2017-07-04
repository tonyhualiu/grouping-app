export const addGroup = () => {
  return {
    type: 'addGroup',
  };
}

export const addMemberToGroup = (groupIdx) => {
  return {
    type: 'addMemberToGroup',
    groupIdx,
  };
}

export const removeMemberFromGroup = (groupIdx, member) => {
  return {
    type: 'removeMemberFromGroup',
    member,
    groupIdx,
  };
}

export const removeGroup = (groupIdx) => {
  return {
    type: 'removeGroup',
    groupIdx,
  };
}

export const updateAddMemberName = (name, groupIdx) => {
  return {
    type: 'updateAddMemberName',
    name,
    groupIdx,
  };
}
