import type { NextPage } from 'next'
import styled from "styled-components";
import data from "../../data/data.json";

import Layout from "../../layouts/Layout";
import Cup from "../../components/Cup";

export const Wrapper = styled.section`
  position: relative;
  padding-bottom: 1.6rem;
  background: ${props => props.theme.colors.gray[1]};
  overflow: hidden;
`;


const CupPage: NextPage = ({ cup }: any) => {
  return (
  <Layout
    title={`Sipped some coffe at ${cup.name}, ${cup.city} ${cup.country}`}
    context="cup"
  >
    <Wrapper>
      <Cup cup={cup} size="large" />
    </Wrapper>
  </Layout>
  )
}

// CupPage.getInitialProps = async ({ query }) => {
//   return {
//     cup: data.filter(function(coffee) {
//       return coffee.slug === query.slug;
//     })[0]
//   };
// };

// This function gets called at build time
export async function getStaticPaths() {
  // Get the paths we want to pre-render based on posts
  const paths = data.map((cup) => ({
    params: { slug: cup.slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

export async function getStaticProps({params}: any) {

  // By returning { props: { post } }, the Blog component
  // will receive the specific `post` as a prop at build time
  return {
    props: {
      cup: data.filter(function (coffee) {
        return coffee.slug === params.slug;
      })[0]
    }
  };
}

export default CupPage
