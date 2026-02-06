<script setup>
import { ref, computed, onMounted } from 'vue'
import StudentList from '../components/StudentList.vue'
import SearchBar from '@/components/SearchBar.vue'
import StudentForm from '@/components/StudentForm.vue'
import { getStudents, saveStudents, getDeletedStudents, saveDeletedStudents } from '../services/StudentServices'

const students = ref([])
const deletedStudents = ref([])
const search = ref('')
const showForm = ref(false)
const showDeleteConfirm = ref(false)
const studentToDelete = ref(null)
const selectedStudent = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10
const sortKey = ref('')
const sortOrder = ref(1)

onMounted(() => {
  students.value = getStudents()
  deletedStudents.value = getDeletedStudents()

  if (students.value.length === 0) {
    students.value = Array.from({ length: 25 }, (_, i) => ({
      id: i + 1,
      name: `Student ${i + 1}`,
      dob: `200${i % 10}-01-01`,
      municipality: ['NYC', 'LA', 'Chicago'][i % 3]
    }))
    saveStudents(students.value)
  }
})

const openAdd = () => { selectedStudent.value = null; showForm.value = true }
const openEdit = (student) => { selectedStudent.value = { ...student }; showForm.value = true }

const saveStudent = (student) => {
  if (!student.id) {
    student.id = students.value.length ? students.value[students.value.length-1].id+1 : 1
    students.value.push(student)
  } else {
    students.value[students.value.findIndex(s => s.id === student.id)] = student
  }
  saveStudents(students.value)
  showForm.value = false
}

const deleteStudent = (id) => {
  const student = students.value.find(s => s.id === id)
  if (!student) return

  deletedStudents.value.push(student)
  students.value = students.value.filter(s => s.id !== id)

  saveStudents(students.value)
  saveDeletedStudents(deletedStudents.value)
}

const confirmDelete = (student) => {
  console.log('Student to delete:', student)
  studentToDelete.value = student 
  showDeleteConfirm.value = true  
}


const deleteStudentConfirmed = () => {
  if (!studentToDelete.value) return

  deletedStudents.value.push(studentToDelete.value)
  students.value = students.value.filter(s => s.id !== studentToDelete.value.id)

  saveStudents(students.value)
  saveDeletedStudents(deletedStudents.value)

  showDeleteConfirm.value = false
  studentToDelete.value = null
}

const filteredStudents = computed(() => {
  if (!search.value) return students.value
  const term = search.value.toLowerCase()
  return students.value.filter(s =>
    String(s.id).includes(term) ||
    s.name.toLowerCase().includes(term) ||
    s.dob.toLowerCase().includes(term) ||
    s.municipality.toLowerCase().includes(term)
  )
})

const sortedStudents = computed(() => {
  let result = [...filteredStudents.value]
  if (sortKey.value) {
    result.sort((a,b) => {
      if(a[sortKey.value] < b[sortKey.value]) return -1 * sortOrder.value
      if(a[sortKey.value] > b[sortKey.value]) return 1 * sortOrder.value
      return 0
    })
  }
  return result
})

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return sortedStudents.value.slice(start, start + itemsPerPage)
})
const totalPages = computed(() => Math.ceil(filteredStudents.value.length / itemsPerPage))
const goToPage = (page) => { if(page >=1 && page <= totalPages.value) currentPage.value = page }

const sortBy = (key) => {
  if(sortKey.value === key) sortOrder.value *= -1
  else { sortKey.value = key; sortOrder.value = 1 }
  currentPage.value = 1
}
</script>


<template>
  <div class="students-title">
    <h1>Student Information System</h1>
    <SearchBar v-model:search="search" />
  </div>
  

  <div class="table-header">
    <button @click="openAdd">Register New Student</button>
  </div>

  <StudentList
  :students="paginatedStudents"
  mode="active"
  @edit="openEdit"
  @delete="confirmDelete"
  @sort="sortBy"
  :sortKey="sortKey"
  :sortOrder="sortOrder"
/>


  <div class="pagination" v-if="totalPages>1">
    <button @click="goToPage(currentPage-1)" :disabled="currentPage===1">Prev</button>
    <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="{ active: currentPage===page }">{{ page }}</button>
    <button @click="goToPage(currentPage+1)" :disabled="currentPage===totalPages">Next</button>
  </div>

  <StudentForm v-if="showForm" :student="selectedStudent" @save="saveStudent" @close="showForm=false"/>
  
  <div v-if="showDeleteConfirm" class="overlay">
  <div class="popup">
    <h2>Confirm Delete</h2>
    <p>Are you sure you want to delete <strong>{{ studentToDelete.name }}</strong>?</p>
    <button @click="deleteStudentConfirmed">Yes</button>
    <button @click="showDeleteConfirm = false">No</button>
  </div>
</div>
</template>



<style scoped>
.pagination {
  margin: 20px auto;
  text-align: center;
}
.pagination button {
  margin: 0 5px;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
  transition: 0.3s;
}
.pagination button:disabled {
  background-color: #8f9aa5;
  cursor: not-allowed;
}
.pagination button.active {
  background-color: #8093a5;
}

.table-header {
  display: flex;
  justify-content: flex-end;
  margin-right: 120px;
  margin-bottom: -20px;
}

.table-header button {
  padding: 8px 16px;
  border: none;
  border-radius: 5px;
  background-color: #3399ff;
  color: white;
  cursor: pointer;
  transition: 0.3s;
}

.table-header button:hover {
  opacity: 0.8;
}
.students-title{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 320px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
}

.popup button {
  margin: 10px 5px 0;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.popup button:first-of-type {
  background-color: #3399ff;
  color: white;
}

.popup button:last-of-type {
  background-color: #ccc;
}

.popup button:last-of-type:hover {
  background-color: #3399ff;
  color: white;
}

</style>
