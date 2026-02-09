<script setup>
import { ref, computed } from 'vue'
import StudentList from '@/components/StudentList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { getDeletedStudents, saveDeletedStudents, saveStudents } from '@/services/StudentServices'
import StudentForm from '@/components/StudentForm.vue'

const deletedStudents = ref(getDeletedStudents())
const selectedStudent = ref(null)
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const sortKey = ref('')
const sortOrder = ref('asc')

const showForm = ref(false)  
const showRestoreConfirm = ref(false)
const studentToRestore = ref(null)            

const viewStudent = (student) => {
  selectedStudent.value = { ...student }
  showForm.value = true
}


const restoreStudent = (id) => {
  const student = deletedStudents.value.find(s => s.id === id)
  if (!student) return

  const students = JSON.parse(localStorage.getItem('students')) || []
  students.push(student)

  deletedStudents.value = deletedStudents.value.filter(s => s.id !== id)

  saveStudents(students)
  saveDeletedStudents(deletedStudents.value)
}

const confirmRestore = (student) => {
  studentToRestore.value = student
  showRestoreConfirm.value = true
}

const restoreStudentConfirmed = () => {
  if (!studentToRestore.value) return

  const studentsList = JSON.parse(localStorage.getItem('students')) || []
  studentsList.push(studentToRestore.value)

  deletedStudents.value = deletedStudents.value.filter(s => s.id !== studentToRestore.value.id)

  saveStudents(studentsList)
  saveDeletedStudents(deletedStudents.value)

  showRestoreConfirm.value = false
  studentToRestore.value = null
}

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortOrder.value = 'asc'
  }
}

const filteredStudents = computed(() => {
  let list = [...deletedStudents.value]

  if (search.value) {
    const term = search.value.toLowerCase()
    list = list.filter(s => {
      return (
        s.name?.toLowerCase().includes(term) ||
        s.id?.toString().includes(term) ||
        s.dob?.toLowerCase().includes(term) ||
        s.municipality?.toLowerCase().includes(term)
      )
    })
  }

  if (sortKey.value) {
    list.sort((a, b) => {
      let valA = a[sortKey.value]
      let valB = b[sortKey.value]

      if (typeof valA === 'string') valA = valA.toLowerCase()
      if (typeof valB === 'string') valB = valB.toLowerCase()

      const result = valA > valB ? 1 : valA < valB ? -1 : 0
      return sortOrder.value === 'asc' ? result : -result
    })
  }

  return list
})


const totalPages = computed(() => Math.ceil(filteredStudents.value.length / itemsPerPage))

const paginatedStudents = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  const end = start + itemsPerPage
  return filteredStudents.value.slice(start, end)
})

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}
</script>

<template>
  <div class="title">
    <h1>Archive</h1>
  </div>

  <SearchBar v-model:search="search" />

  <StudentList
    :students="paginatedStudents"
    mode="archive"
    @view="viewStudent"
    @restore="confirmRestore"
    @sort="sortBy"
    :sortKey="sortKey"
    :sortOrder="sortOrder"
  />

  <div class="pagination" v-if="totalPages > 1">
    <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1">Prev</button>
    <button
      v-for="page in totalPages"
      :key="page"
      @click="goToPage(page)"
      :class="{ active: currentPage === page }"
    >
      {{ page }}
    </button>
    <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages">Next</button>
  </div>

  <!-- popup for view -->
<div v-if="showForm" class="overlay">
  <div class="popup">
    <h2>Student Details</h2>
    <p><strong>ID:</strong> {{ selectedStudent.id }}</p>
    <p><strong>Name:</strong> {{ selectedStudent.name }}</p>
    <p><strong>DOB:</strong> {{ selectedStudent.dob }}</p>
    <p><strong>Municipality:</strong> {{ selectedStudent.municipality }}</p>
    <button @click="showForm = false">Close</button>
  </div>
</div>

<div v-if="showRestoreConfirm" class="overlay">
  <div class="popup">
    <h2>Confirm Restore</h2>
    <p>Are you sure you want to restore <strong>{{ studentToRestore.name }}</strong>?</p>
    <button @click="restoreStudentConfirmed">Yes</button>
    <button @click="showRestoreConfirm = false">No</button>
  </div>
</div>


</template>

<style scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
  background-color: #b3d9ff;
  cursor: not-allowed;
}
.pagination button.active {
  background-color: #3399ff;
}


.overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
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
  width: 300px;
  text-align: center;
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
 .popup button:last-of-type:hover{
    background-color: #3399ff;
 }

</style>
