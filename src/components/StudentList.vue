<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  students: {
    type: Array,
    default: () => []
  },
  mode: {
    type: String,
    default: 'active'
  },
  sortKey: String,
  sortOrder: Number
})

const emit = defineEmits(['edit', 'delete', 'view', 'restore', 'sort'])

const sortKey = ref('')
const sortOrder = ref(1)

const sortedStudents = computed(() => {
  let result = [...props.students]

  if (sortKey.value) {
    result.sort((a, b) => {
      if (a[sortKey.value] < b[sortKey.value]) return -1 * sortOrder.value
      if (a[sortKey.value] > b[sortKey.value]) return 1 * sortOrder.value
      return 0
    })
  }

  return result
})

const sortBy = (key) => {
  if (sortKey.value === key) {
    sortOrder.value *= -1
  } else {
    sortKey.value = key
    sortOrder.value = 1
  }
}
</script>

<template>
  <table id="table">
    <thead>
      <tr>
        <th @click="sortBy('id')" class="sortable">
          ID <span class="arrow" :class="{ active: sortKey==='id', desc: sortKey==='id' && sortOrder===-1 }">▲</span>
        </th>
        <th @click="sortBy('name')" class="sortable">
          Name <span class="arrow" :class="{ active: sortKey==='name', desc: sortKey==='name' && sortOrder===-1 }">▲</span>
        </th>
        <th @click="sortBy('dob')" class="sortable">
          DoB <span class="arrow" :class="{ active: sortKey==='dob', desc: sortKey==='dob' && sortOrder===-1 }">▲</span>
        </th>
        <th @click="sortBy('municipality')" class="sortable">
          Municipality <span class="arrow" :class="{ active: sortKey==='municipality', desc: sortKey==='municipality' && sortOrder===-1 }">▲</span>
        </th>
        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="s in sortedStudents" :key="s.id">
        <td>{{ s.id }}</td>
        <td>{{ s.name }}</td>
        <td>{{ s.dob }}</td>
        <td>{{ s.municipality }}</td>
        
        <template v-if="mode === 'active'">
            <button @click="$emit('edit', s)">Edit</button>
            <button @click="$emit('delete', s)">Delete</button>
        </template>

        <template v-else>
            <button @click="$emit('view', s)">View</button>
            <button @click="$emit('restore', s)">Restore</button>
        </template>
            </tr>
    </tbody>
  </table>
</template>

<style scoped>
#table {
  margin: 50px auto;
  width: 80%;
  border-collapse: collapse;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  background-color: #e6f2ff;
  text-align: center;
  border: 2px solid black;
}

#table thead {
  background-color: #99ccff;
  color: black;
  font-weight: bold;
}

#table th,
#table td {
  padding: 12px 15px;
  border: 1px solid black;
}

#table th.sortable {
  cursor: pointer;
  position: relative;
  user-select: none;
}

.arrow {
  display: inline-block;
  margin-left: 5px;
  font-size: 0.7rem;
  color: #999;
  transition: transform 0.2s, color 0.2s;
}

.arrow.active {
  color: #3399ff;
}

.arrow.desc {
  transform: rotate(180deg);
}

#table tbody tr:hover {
  background-color: #cce6ff;
}

#table tbody tr:nth-child(even) {
  background-color: #d9f0ff;
}

button {
  padding: 6px 12px;
  margin: 0 3px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: 0.3s ease;
}

button:first-of-type {
  background-color: #3399ff;
  color: white;
}

button:last-of-type {
  background-color: #1861cf;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>
