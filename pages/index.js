import { Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import { QueryClientProvider } from "@tanstack/react-query";
import Head from "next/head";
import Image from "next/image";
import { createContext, useContext, useState } from "react";
import { getCandidates, getQuestions } from "../src/api";
import Candidates from "../src/components/Candidates";
import Details from "../src/components/Details";

export const CandidateContext = createContext(null);

export default function Home({ candidates, questions }) {
  const [candidate, setCandidate] = useState(null);

  return (
    <div>
      <Head>
        <title>Interviews</title>
        <meta name="description" content="some SEO description" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CandidateContext.Provider value={{ candidate, setCandidate }}>
        <Container sx={{ padding: "16px" }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Candidates candidates={candidates} />
            </Grid>
            <Grid item xs={12} md={8}>
              <Details questions={questions} />
            </Grid>
          </Grid>
        </Container>
      </CandidateContext.Provider>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const candidates = await getCandidates();
  const questions = await getQuestions();

  // Pass data to the page via props
  return { props: { candidates, questions } };
}
