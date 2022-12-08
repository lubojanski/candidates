import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useCallback, useEffect, useState } from "react";
import { addComment } from "../api";

const Answer = ({ video, questions, application }) => {
  const [comment, setComment] = useState(video.comments);
  const [showSaveButton, setShowSaveButton] = useState(false);

  const handleChange = (e) => {
    setComment(e.target.value);
  };

  const saveComment = /*   */ async () => {
    const res = await addComment({
      applicationId: application.id,
      questionId: video.questionId,
      comment,
    });
    const hasErrorMessage = !!res?.message;
    if (hasErrorMessage) {
      alert(res.message);
    } else {
      // show some indication that comment was saved
      setShowSaveButton(false);
    }
  }; //, [application.id, video.questionId, comment]);

  return (
    <Accordion disableGutters elevation={0} data-cy-testid="application">
      <AccordionSummary
        sx={{ padding: "20px" }}
        expandIcon={<ExpandMoreIcon />}
      >
        <Typography>
          {
            questions.find((question) => question.id === video.questionId)
              .question
          }
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ padding: "20px" }}>
        <video
          data-cy-testid="video"
          style={{ width: "100%", maxHeight: "400px" }}
          type="video/mp4"
          controls
        >
          <source src={video.src} />
        </video>
        <TextField
          inputProps={{
            "data-cy-testid": "comment-field",
          }}
          onInputCapture={() => setShowSaveButton(true)}
          sx={{ margin: "20px 0" }}
          label="Comment"
          multiline
          rows={4}
          fullWidth
          onChange={handleChange}
          value={comment}
        />
        {showSaveButton && (
          <Button
            data-cy-testid="comment-btn"
            type="submit"
            onClick={saveComment}
          >
            Save
          </Button>
        )}
      </AccordionDetails>
    </Accordion>
  );
};
export default Answer;
