import dayjs from 'dayjs';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import styled from 'styled-components';

import Layout from '@/components/layouts/Layout';
import constants from '@/config/constants';

dayjs.extend(LocalizedFormat);

const ScheduleLayout = styled('div')`
  display: flex;
  flex-direction: column;
  section {
    flex: 1;
  }
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  ${constants.devices.laptop} {
    flex-direction: row;
  }
`;

const DayEvents: React.FC<{ events: typeof constants.events; title: string }> = ({
  title,
  events
}) => {
  return (
    <section>
      <h2>{title}</h2>
      <ul>
        {events.map((event) => (
          <li key={event.time}>
            {dayjs(event.time).format('LT')} - {event.event}
          </li>
        ))}
      </ul>
    </section>
  );
};

const getDayEvents = (day: string) =>
  constants.events.filter((event) => dayjs(event.time).isSame(dayjs(day), 'date'));

export const Schedule = (): JSX.Element => {
  return (
    <Layout>
      <h1>Schedule</h1>
      <ScheduleLayout>
        <DayEvents title="Day 1 - 17th Jan" events={getDayEvents('2020-01-17')} />
        <DayEvents title="Day 2 - 18th Jan" events={getDayEvents('2020-01-18')} />
      </ScheduleLayout>
    </Layout>
  );
};

export default Schedule;
