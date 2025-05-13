export const DiningData = [
  {label: 'Coffee', value: 'Coffee'},
  {label: 'Brunch', value: 'Brunch'},
  {label: 'Dinner', value: 'Dinner'},
];

export const BookindDate = Array.from({length: 3}, (_, i) => {
  const date = new Date();
  date.setDate(date.getDate() + i + 1);

  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  const label = `${date.toLocaleDateString('en-US', options)}`;
  const value = label;

  const baseHour = 10 + i;
  const hour12 = baseHour % 12 === 0 ? 12 : baseHour % 12;
  const period = baseHour >= 12 ? 'PM' : 'AM';
  const time = `${hour12}:00 ${period}`;

  return {
    label,
    value,
    time,
  };
});
