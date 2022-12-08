const options = {
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  method: "GET",
};

export const getCandidates = async () => {
  const candidatesRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_PROXY_URL}/candidates`,
    options
  );
  return candidatesRes.json();
};
export const getQuestions = async () => {
  const questionsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_PROXY_URL}/questions`,
    options
  );
  return questionsRes.json();
};

export const getApplication = async (applicationId) => {
  if (applicationId) {
    const applicationRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROXY_URL}/applications/${applicationId}`,
      options
    );
    return applicationRes.json();
  }
  return null;
};
// Race condition possible if multiple users were to save the same comment at one time
export const addComment = async ({ applicationId, questionId, comment }) => {
  try {
    const applicationToUpdateRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROXY_URL}/applications/${applicationId}`,
      options
    );
    const applicationToUpdate = await applicationToUpdateRes.json();

    const videoIndex = applicationToUpdate.videos.findIndex(
      (video) => video.questionId === questionId
    );

    applicationToUpdate.videos[videoIndex] = {
      ...applicationToUpdate.videos[videoIndex],
      comments: comment, // this should be an array of strings but I don't want to change db schema
    };

    const updateRes = await fetch(
      `${process.env.NEXT_PUBLIC_API_PROXY_URL}/applications/${applicationId}`,
      {
        ...options,
        method: "PATCH",
        body: JSON.stringify(applicationToUpdate),
      }
    );

    return updateRes.json();
  } catch (e) {
    // send message to frontend to display error
    return { message: "Failed to save comment" };
  }
};
