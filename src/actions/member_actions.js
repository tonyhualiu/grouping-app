const UNASSIGNED_GROUP_IDX = 0;

export const addMember = (name) => {
  return {
    type: 'addMember',
    member: {
      name,
      groupIdx: UNASSIGNED_GROUP_IDX,
    },
  };
}
