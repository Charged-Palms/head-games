//-----------------------------INITIAL STATE--------------------------------

const initialState = {
  userId: null,
  profilePic: "",
  email: "",
  firstName: "",
  lastName: "",
  password: "",
  gender: null,
  age: null,
  zipcode: null,
  bio: "",
  status: "",
  topicId: null,
  questions: []
};

//-----------------------------ACTION CONSTANTS------------------------------

const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const UPDATE_BIO = "UPDATE_BIO";
const SET_QUESTIONS = 'SET_QUESTIONS';

//-----------------------------ACTION BUILDERS-------------------------------

export function setUser(user) {
  return {
    type: SET_USER,
    payload: user
  };
}

export function logoutUser() {
  return {
    type: LOGOUT_USER
  };
}

export function updateBio(bio) {
  return {
    type: UPDATE_BIO,
    payload: bio
  };
}

export function setQuestions(questions) {
  return {
    type: SET_QUESTIONS,
    payload: questions
  }
}

//-----------------------------REDUCER---------------------------------------

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOGOUT_USER:
      return initialState;
    case SET_USER:
      return { ...state, ...payload };
    case UPDATE_BIO:
      return { ...state, ...payload };
    case SET_QUESTIONS:
      return {...state, questions: payload}
    default:
      return state;
  }
};
