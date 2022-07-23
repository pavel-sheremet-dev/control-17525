import { GlobalStyle } from 'styles/GlobalStyles';
import { ThemeProvider } from 'styled-components';

import getTheme from 'styles/themes';
// import Section from "components/common/section/Section";
import Header from 'components/header/Header';
import Layout from 'components/layout/Layout';
import { ThemeContext } from 'context/themeContext';
// import Section from 'components/common/section/Section';
// import { HeadingTitlesTags } from 'components/common/section/Section.styled';
import MainComponent from 'components/main/Main';
// import ReportForm from 'components/reportForm/ReportForm';
import { IThemeContext } from 'context/themeContext';

const App = () => {
  return (
    <Layout>
      <ThemeContext.Consumer>
        {({ theme }: IThemeContext) => (
          <ThemeProvider theme={getTheme(theme)}>
            <GlobalStyle />
            <Header />
            {/* <ReportForm /> */}
            <MainComponent />
          </ThemeProvider>
        )}
      </ThemeContext.Consumer>
    </Layout>
  );
};

export default App;
