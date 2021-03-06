export const addGroup = () => {
  return {
    type: 'addGroup',
  };
}

export const addMemberToGroup = (groupIdx, name) => {
  return {
    type: 'addMemberToGroup',
    groupIdx,
    name,
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

export const startFetchGroups = () => {
  return {
    type: 'startFetchGroups',
  };
}

export const successFetchGroups = (groups) => {
  return {
    type: 'successFetchGroups',
    groups,
  };
}

export const fetchGroups = () => (dispatch, getState) => {
  dispatch(startFetchGroups());
  return fetch('/api/groups')
    .then(response => response.json())
    .then((groups) => {
      dispatch(successFetchGroups(groups));
    }).catch((error) => {
      // TODO
    });
}

export const startSaveGroups = () => {
  return {
    type: 'startSaveGroups',
  };
}

export const successSaveGroups = () => {
  return {
    type: 'successSaveGroups',
  };
}

export const saveGroups = (groups) => (dispatch, getState) => {
  dispatch(startSaveGroups());
  return fetch('/api/groups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(groups),
  })
    .then(response => response.json())
    .then(responseStauts => {
      dispatch(successSaveGroups())
    });
}

export const moveMember = (name, fromIdx, toIdx) => (dispatch, getState) => {
  dispatch(removeMemberFromGroup(fromIdx, {name: name, groupIdx: fromIdx}));
  dispatch(addMemberToGroup(toIdx, name));
  return {
    type: 'moveMember',
  };
}

export const groupPickingOpen = (groupIdx, member) => {
  return {
    type: 'groupPickingOpen',
    groupIdx,
    member,
  };
}

export const groupPickingClose = () => {
  return {
    type: 'groupPickingClose',
  };
}
