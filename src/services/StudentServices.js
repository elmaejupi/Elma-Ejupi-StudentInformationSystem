const KEY = 'students'
const DELETED_KEY = 'deletedStudents'

export const getStudents = () =>
  JSON.parse(localStorage.getItem(KEY)) || []

export const saveStudents = (students) =>
  localStorage.setItem(KEY, JSON.stringify(students))

export const getDeletedStudents = () =>
  JSON.parse(localStorage.getItem(DELETED_KEY)) || []

export const saveDeletedStudents = (deletedStudents) =>
  localStorage.setItem(DELETED_KEY, JSON.stringify(deletedStudents))
