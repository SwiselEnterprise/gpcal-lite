let gpArr =  [];

const matchGradeScoreUni = (grade) => {
  let score;
  switch (grade) {
    case "A":
      score = 5;
      break;
    case "B":
      score = 4;
      break;
    case "C":
      score = 3;
      break;
    case "D":
      score = 2;
      break;
    case "E":
      score = 1;
      break;
    case "F":
      score = 0;
      break;
  }
  return score;
}

const matchGradeScorePoly = (grade) => {
  let score;
  switch (grade) {
    case "A":
      score = 4;
      break;
    case "AB":
      score = 3.5;
      break;
    case "B":
      score = 3.25;
      break;
    case "BC":
      score = 3;
      break;
    case "C":
      score = 2.75;
      break;
    case "CD":
      score = 2.5;
      break;
    case "D":
      score = 2.25;
      break;
    case "P":
      score = 2;
      break;
    case "F3":
      score = 1.5;
      break;
    case "F2":
      score = 1;
      break;
    case "F0":
      score = 0;
      break;
  }
  return score;
}

const loadSavedGp = () => {
  const gpaJSON = localStorage.getItem('gpArr');
  try {
    return gpaJSON ? JSON.parse(gpaJSON) : []
  } catch (e) {
    return []
  } 
}

// Save the gpa to localStorage
const saveGpStore = () => {
  localStorage.setItem('gpArr', JSON.stringify(gpArr))
  
}

export const removeGpa = (gpaId) => {
  let gpId = gpArr.findIndex(gpa => gpa.id === gpaId)
  gpArr.splice(gpId, 1);
  saveGpStore();
} 

export const updateGpa = (updateObj) => {
  let gpIndex = gpArr.findIndex(gpa => updateObj.id === gpa.id);

  if (updateObj.hasOwnProperty('results')) {
    gpArr.splice(gpIndex, 1, updateObj);
    saveGpStore();
  }else{
    let storeGpa = gpArr.splice(gpIndex, 1);
    storeGpa[0].name = updateObj.name;
    gpArr.splice(gpIndex, 0, storeGpa[0]);
    saveGpStore();
  }
}

export const getGpa = () => gpArr; 

export const add2gpArr = (gpObj) => {
  gpArr.push({
    id: uuidv4(),
    name: gpObj.name,
    mode: gpObj.mode,
    gpa: gpObj.gpa,
    results: gpObj.results
  });
  saveGpStore();
}

export const productCredUnitGrade = (credUnit, grade, mode) => {
  if (mode === "university") {
    return matchGradeScoreUni(grade) * credUnit;
  } else if(mode === "polytechnic"){
    return matchGradeScorePoly(grade) * credUnit;
  }
  
} 

gpArr = loadSavedGp();