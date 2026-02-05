<script setup>
import { ref, computed, onMounted } from 'vue'
import StudentList from '../components/StudentList.vue'
import SearchBar from '@/components/SearchBar.vue'
import StudentForm from '@/components/StudentForm.vue'
import { saveStudents , saveDeletedStudents} from '../services/StudentServices'

const students = ref([])
const search = ref('')
const showForm = ref(false)
const selectedStudent = ref(null)
const currentPage = ref(1)
const itemsPerPage = 10
const sortKey = ref('')
const sortOrder = ref(1)
const deletedStudents = ref([])

onMounted(() => {
  students.value = Array.from({ length: 25 }, (_, i) => ({
    id: i + 1,
    name: `Student ${i + 1}`,
    dob: `200${i % 10}-01-01`,
    municipality: ['NYC', 'LA', 'Chicago'][i % 3]
  }))
})

const openAdd = () => { selectedStudent.value = null; showForm.value = true }
const openEdit = (student) => { selectedStudent.value = { ...student }; showForm.value = true }
const saveStudent = (student) => {
  if (!student.id) student.id = students.value.length ? students.value[students.value.length-1].id+1 : 1, students.value.push(student)
  else students.value[students.value.findIndex(s => s.id === student.id)] = student
  saveStudents(students.value)
  showForm.value = false
}
// const deleteStudent = (id) => { 
//     students.value = students.value.filter(s => s.id !== id); saveStudents(students.value) 

// }


const deleteStudent = (id) => {
  const student = students.value.find(s => s.id === id)

  if (student) {
    deletedStudents.value.push(student)
    students.value = students.value.filter(s => s.id !== id)

    saveStudents(students.value)
    saveDeletedStudents(deletedStudents.value)
  }
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
  @delete="deleteStudent"
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
</style>
