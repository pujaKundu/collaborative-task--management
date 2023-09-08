export const getMemberNames = (members, users) => {
  const flatMembers = members.flat();
  const memberNames = flatMembers.map((memberId) => {
    const user = users.find((user) => user?.id === memberId);
    return user ? user?.username : "Unknown User";
  });
  return memberNames.join(", ");
};

export const getTaskNames = (taskIds, tasks) => {
  const flatTaskIds = taskIds.flat();
  const taskNames = flatTaskIds.map((taskId) => {
    const task = tasks.find((task) => task.id === taskId);
    return task ? task?.title : "Unknown Task";
  });
  return taskNames.join(", ");
};
