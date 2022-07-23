import Section from 'components/common/section/Section';
import { HeadingTitlesTags } from 'components/common/section/Section.styled';
import ReportForm from 'components/reportForm/ReportForm';

const ReportPage = () => {
  return (
    <Section title="Report page" titleLevel={HeadingTitlesTags.h2}>
      <ReportForm />
    </Section>
  );
};

export default ReportPage;
