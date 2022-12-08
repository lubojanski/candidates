import { Paper, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { CandidateContext } from "../../pages";
import { getApplication } from "../api";
import { Play } from "@next/font/google";
import Answer from "./Answer";

const Details = ({ questions }) => {
  const { candidate } = useContext(CandidateContext);
  const [application, setApplication] = useState(null);

  useEffect(() => {
    async function _getApplication() {
      const app = await getApplication(candidate.applicationId);
      setApplication(app);
    }
    if (candidate?.applicationId) {
      _getApplication();
    } else {
      setApplication(null);
    }
  }, [candidate]);

  if (!application && !candidate) {
    return (
      <Paper
        data-cy-testid="details"
        sx={{
          height: "100%",
          minHeight: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>Select candidate to preview details.</Typography>
      </Paper>
    );
  }

  if (!application) {
    return (
      <Paper
        data-cy-testid="details"
        sx={{
          position: "relative",
          height: "100%",
          minHeight: "200px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            position: "absolute",
            left: 0,
            top: 0,
            padding: "20px",
          }}
        >
          {candidate?.name}
        </Typography>
        <Typography>Candidate didn&apos;t submit application yet.</Typography>
      </Paper>
    );
  }

  return (
    <Paper
      data-cy-testid="details"
      sx={{
        height: "100%",
      }}
    >
      <Typography variant="h5" sx={{ padding: "20px" }}>
        {candidate?.name}
      </Typography>
      <Typography variant="h6" sx={{ padding: "20px 0 0 20px" }}>
        Application :
      </Typography>
      {application.videos?.map((video) => (
        <Answer
          key={application.id + video.questionId}
          video={video}
          questions={questions}
          application={application}
        />
      ))}
    </Paper>
  );
};

export default Details;
