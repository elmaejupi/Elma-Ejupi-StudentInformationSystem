<script setup>
</script>

<template>
  <div class="help-container">
    <h1>Help & User Guide</h1>

    <section>
      <h2>Managing Students</h2>
      <ul>
        <li><strong>Add Student:</strong> Click <em>“Register New Student”</em> to add a new record.</li>
        <li><strong>Edit Student:</strong> Click the <em>Edit</em> button in the table.</li>
        <li><strong>Delete Student:</strong> Deletes the student and moves them to the Archive.</li>
      </ul>
    </section>

    <section>
      <h2>Search</h2>
      <p>
        Use the search bar to filter students by <strong>ID, Name, Date of Birth,</strong>
        or <strong>Municipality</strong>.
      </p>
    </section>

    <section>
      <h2>Sorting</h2>
      <p>
        Click on a column header (ID, Name, DoB, Municipality) to sort.
        Clicking again reverses the order.
      </p>
    </section>

    <section>
      <h2>Archive</h2>
      <ul>
        <li>Deleted students are stored in the <strong>Archive</strong>.</li>
        <li>Archived students are saved locally and not permanently removed.</li>
        <li>Only administrators should manage archived data.</li>
      </ul>
    </section>

    <section>
      <h2>Data Storage</h2>
      <p>
        All data is stored in the browser using <strong>localStorage</strong>.
      </p>
    </section>

    <section>
      <h2>Need More Help?</h2>
      <p>
        If something is not working as expected, try refreshing the page or
        checking your browser’s local storage.
      </p>
    </section>
  </div>
</template>

<style scoped>
.help-container {
  max-width: 900px;
  margin: 40px auto;
  padding: 30px;
  background-color: #e6f2ff;
  border-radius: 10px;
  font-family: Arial, sans-serif;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 30px;
}

section {
  margin-bottom: 25px;
}

h2 {
  color: #1861cf;
  margin-bottom: 10px;
}

ul {
  padding-left: 20px;
}

li {
  margin-bottom: 8px;
}

p {
  line-height: 1.6;
}
</style>
