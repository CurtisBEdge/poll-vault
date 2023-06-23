
export const pollOptionsBoundaries = (optionsArray) => {
  return (optionsArray.length  >=2) && (optionsArray.length  <=4)
}

export const pollTextValidation = (optionName) => {
  return (optionName !== "") || (optionName !== undefined) || (optionName !== null)
}

export const pollURLValidation = (optionUrl) => {
  try {
    new URL(optionUrl);
  }
  catch (e) {
    return false;
  }
  return true;
}

export const isFuture = (pollTimestamp) => {
  const dateNow = Date.now()
  return (pollTimestamp >= (dateNow + 60000))
}

export const filterPoll = (poll, username) => {
  if (poll.options.some((option) => option.voters.includes(username))) {
    return poll.toObject()
  }
  return {
    ...poll.toObject(),
    options: poll.options.map(({ name, url, _id }) => ({
      name,
      _id,
      url,
      voters: [],
    }))
  }
}