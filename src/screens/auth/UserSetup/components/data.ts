import {iconPath} from '../../../../constants/iconPath';

export const Gender = [
  {
    title: 'Male',
    icon: iconPath.male,
  },
  {
    title: 'Female',
    icon: iconPath.female,
  },
  {
    title: 'Non-binary',
    icon: iconPath.nonBinary,
  },
  {
    title: 'Prefer not to say',
    icon: iconPath.genderX,
  },
];

export const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export const months = [
  {label: 'January', value: 0},
  {label: 'February', value: 1},
  {label: 'March', value: 2},
  {label: 'April', value: 3},
  {label: 'May', value: 4},
  {label: 'June', value: 5},
  {label: 'July', value: 6},
  {label: 'August', value: 7},
  {label: 'September', value: 8},
  {label: 'October', value: 9},
  {label: 'November', value: 10},
  {label: 'December', value: 11},
];

const currentYear = new Date().getFullYear();
export const years = Array.from(
  {length: currentYear - 1970 + 1},
  (_, index) => ({
    label: `${currentYear - index}`,
    value: currentYear - index,
  }),
);

export const InterestData = [
  'Films',
  'Concerts',
  'Food',
  'Sports',
  'Art',
  'Travels',
  'Cooking',
  'Plants',
  'Coffee',
];
