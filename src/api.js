const options = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  method: "GET",
};

export const getCandidates = async () => {
  const candidatesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_PROXY_URL}/api/candidates`,
    options
  );
  return candidatesRes.json();
};
export const getQuestions = async () => {
  const questionsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/questions`,
    options
  );
  return questionsRes.json();
};

// assumming Id is unique
export const getApplication = async (applicationId) => {
  if (applicationId) {
    const applicationRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROXY_URL}/api/applications/${applicationId}`,
      options
    );
    return await applicationRes.json();
  }
  return null;
};
// Race condition possible
export const addComment = async ({ applicationId, questionId, comment }) => {
  try {
    const applicationToUpdateRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROXY_URL}/api/applications/${applicationId}`,
      options
    );
    const applicationToUpdate = await applicationToUpdateRes.json();

    const videoIndex = applicationToUpdate.videos.findIndex(
      (video) => video.questionId === questionId
    );

    applicationToUpdate.videos[videoIndex] = {
      ...applicationToUpdate.videos[videoIndex],
      comments: comment, // this should be an array of strings
    };

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROXY_URL}/api/applications/${applicationId}`,
      {
        ...options,
        method: "PATCH",
        body: JSON.stringify(applicationToUpdate),
      }
    );

    return await updateRes.json();
  } catch (e) {
    console.log("e :", e);
    // send message to frontend to display error
    return { message: "Failed to save comment" };
  }
};
