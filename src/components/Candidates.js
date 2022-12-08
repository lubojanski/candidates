import { Button, Card, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import Link from "next/link";
import { useContext } from "react";
import { CandidateContext } from "../../pages";

const Candidates = ({ candidates }) => {
  const candidateContext = useContext(CandidateContext);

  return (
    <Paper data-cy-testid="candidates">
      <Typography
        variant="h5"
        component="h1"
        sx={{ padding: "20px 0 30px 20px" }}
      >
        Candidates:
      </Typography>
      <Box
        sx={(theme) => ({
          [theme.breakpoints.down("md")]: {
            overflowY: "auto",
            maxHeight: "250px",
            paddingBottom: "20px",
          },
        })}
      >
        {candidates.map((candidate) => (
          <Button
            fullWidth
            data-cy-testid="candidate"
            key={candidate.id}
            sx={{
              padding: "20px",
              cursor: "pointer",
              transition: "300ms background-color",
              userSelect: "none",
              background:
                candidateContext.candidate?.id === candidate.id
                  ? "#fff7df"
                  : "inherit",
            }}
            onClick={() => candidateContext.setCandidate(candidate)}
          >
            <Typography>{candidate.name}</Typography>
          </Button>
        ))}
      </Box>
    </Paper>
  );
};

export default Candidates;
