export function calculateOffset(
  totalCount: number,
  limitParam: number,
  pageParam: number,
): number {
  if (limitParam * (pageParam + 1) > totalCount) {
    pageParam = calculatePage(totalCount, limitParam);
    return limitParam * pageParam;
  } else {
    return limitParam * pageParam;
  }
}

function calculatePage(totalCount: number, limitParam: number): number {
  return totalCount % limitParam === 0
    ? Math.floor(totalCount / limitParam) - 1
    : Math.floor(totalCount / limitParam);
}
