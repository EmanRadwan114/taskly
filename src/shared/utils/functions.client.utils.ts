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
