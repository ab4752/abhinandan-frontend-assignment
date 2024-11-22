const fetchData = async () => {
  const response = await fetch('frontend-assignment.json'); // Path relative to the public folder
  const data = await response.json();
  return data;
};

export default fetchData;
