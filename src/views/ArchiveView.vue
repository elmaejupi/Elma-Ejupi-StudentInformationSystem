<script setup>
import { ref, computed } from 'vue'
import StudentList from '@/components/StudentList.vue'
import SearchBar from '@/components/SearchBar.vue'
import { getDeletedStudents, saveDeletedStudents, saveStudents } from '@/services/StudentServices'

const deletedStudents = ref(getDeletedStudents())

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

const search = ref('')

const sortKey = ref('')
const sortOrder = ref('asc')

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
    list = list.filter(s =>
      s.name.toLowerCase().includes(search.value.toLowerCase())
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


</script>


<template>
    <div class="title">
        <h1>Archive</h1>
    </div>
  

  <SearchBar v-model:search="search" />

  <StudentList
  :students="filteredStudents"
  mode="archive"
  @view="viewStudent"
  @restore="restoreStudent"
  @sort="sortBy"
  :sortKey="sortKey"
  :sortOrder="sortOrder"
/>

</template>
<style>
.title{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>