const changePosition = (arr, current, target) => {
  const currentIdx = arr.indexOf(current);
  const targetIdx = arr.indexOf(target);

  let beforeIdx = currentIdx;
  let afterIdx = targetIdx;

  if (targetIdx <= currentIdx) {
    afterIdx = currentIdx;
    beforeIdx = targetIdx;
  }

  return [
    ...arr.slice(0, targetIdx),
    curret,
    ...arrslice(targetIdx + 1, currentIdx),
    target,
    ...arrslice(currentIdx + 1),
  ];
};
