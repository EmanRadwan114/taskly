// ^ ------------------------ get user name initials ------------------------
export const getNameInitials = (name: string) => {
  return name?.split(' ').length > 1
    ? name
        ?.split(' ')
        .slice(0, 2)
        .map((w) => w[0])
        .join('')
    : name?.split('').slice(0, 2).join('');
};

// ^ ------------------------ formate date ------------------------
export const formateDateString = (date: string, type: string = 'en-GB') => {
  return new Date(date).toLocaleDateString(type, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

// ^ ------------------------ get pagination buttons ------------------------
export function getPaginationButtons(
  pagesList: number[],
  currentPage: number,
  totalPages: number
): (number | '...')[] {
  const pageIndex = pagesList.findIndex((el) => el === currentPage);
  if (pageIndex === -1) return [];

  const isNearStart = currentPage <= 2;
  const isNearEnd = currentPage >= totalPages - 1;
  const isSlightlyNearStart = pageIndex === 2 || pageIndex === 3;
  const isSlightlyNearEnd =
    pageIndex === totalPages - 3 || pageIndex === totalPages - 4;

  if (totalPages <= 4) {
    return pagesList.slice(0, totalPages);
  }

  if (isNearStart) {
    return [...pagesList.slice(0, 3), '...', totalPages];
  }

  if (isNearEnd) {
    return [1, '...', ...pagesList.slice(totalPages - 3, totalPages)];
  }

  if (isSlightlyNearStart && totalPages - currentPage <= 2) {
    return [...pagesList.slice(0, pageIndex + 2), totalPages];
  }

  if (isSlightlyNearStart && totalPages - currentPage > 2) {
    return [...pagesList.slice(0, pageIndex + 2), '...', totalPages];
  }

  if (isSlightlyNearEnd) {
    return [1, '...', ...pagesList.slice(pageIndex - 1, totalPages)];
  }

  // middle btns
  return [
    1,
    '...',
    ...pagesList.slice(pageIndex - 1, pageIndex + 2),
    '...',
    totalPages,
  ];
}
