<script setup>
import { ref, computed } from 'vue'
import StudentList from '@/components/StudentList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { getDeletedStudents, saveDeletedStudents, saveStudents } from '@/services/StudentServices'

const deletedStudents = ref(getDeletedStudents())
const search = ref('')
const currentPage = ref(1)
const itemsPerPage = 10
const sortKey = ref('')
const sortOrder = ref('asc')

const viewStudent = (student) => {
  alert(`
ID: ${student.id}
Name: ${student.name}
DOB: ${student.dob}
Municipality: ${student.municipality}
`)
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
    list = list.filter(s =>
      s.name.toLowerCase().includes(term) ||
      s.id.toString().includes(term) ||
      s.dob.toLowerCase().includes(term) ||
      s.municipality.toLowerCase().includes(term)
    )
  }

  if (sortKey.value) {
    list.sort((a, b) => {
      const result =
        a[sortKey.value] > b[sortKey.value] ? 1 :
        a[sortKey.value] < b[sortKey.value] ? -1 : 0

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
    @restore="restoreStudent"
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
</style>
